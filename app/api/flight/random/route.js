import { NextResponse } from "next/server";
import { Duffel } from "@duffel/api";

export async function POST(req) {
  const duffel = new Duffel({ token: process.env.DUFFEL_LIVE_API_KEY });

  // Helpers
  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomDate = (daysAhead = 365) => {
    const today = Date.now();
    const future = new Date(today + Math.random() * daysAhead * 86400e3);
    return future.toISOString().slice(0, 10);
  };

  try {
    // fetch a pool of airport codes
    const airportsRes = await duffel.airports.list({ limit: 50 });
    const codes = airportsRes.data.map((a) => a.iata_code).filter(Boolean);

    const collectedOffers = [];
    const triedRoutes = new Set();
    const MAX_OFFERS = 4;
    const MAX_ATTEMPTS = 10;

    let attempts = 0;
    while (
      collectedOffers.length < MAX_OFFERS &&
      attempts < MAX_ATTEMPTS &&
      triedRoutes.size < codes.length * (codes.length - 1)
    ) {
      attempts++;

      // pick a random origin/destination pair
      let origin, destination, routeKey;
      do {
        origin = randomItem(codes);
        destination = randomItem(codes);
        routeKey = `${origin}-${destination}`;
      } while (destination === origin || triedRoutes.has(routeKey));
      triedRoutes.add(routeKey);

      // create the offer request without returning all offers inline
      const departureDate = randomDate(180);
      const offerReq = await duffel.offerRequests.create(
        {
          slices: [{ origin, destination, departure_date: departureDate }],
          passengers: [{ type: "adult" }],
          cabin_class: "economy",
        },
        { return_offers: false }
      );

      // fetch just 1 offer for that route
      const offersRes = await duffel.offers.list({
        offer_request_id: offerReq.data.id,
        limit: 1,
      });

      if (offersRes.data.length > 0) collectedOffers.push(offersRes.data[0]);
    }

    return NextResponse.json({ data: collectedOffers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
