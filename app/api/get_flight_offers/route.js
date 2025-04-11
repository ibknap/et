import { NextResponse } from "next/server";
import Amadeus from "amadeus";

export async function POST(req) {
  const clientId = process.env.AMADEUS_TEST_API_KEY;
  const clientSecret = process.env.AMADEUS_TEST_API_SECRET_KEY;
  const { info } = await req.json();

  const amadeus = new Amadeus({
    // hostname: "production", TODO: change to live
    clientId: clientId,
    clientSecret: clientSecret,
  });

  try {
    const res = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: info.from,
      destinationLocationCode: info.to,
      departureDate: info.departure,
      adults: info.adults,
    });

    const data = res.data;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching flight offers:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
