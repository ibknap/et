import { NextResponse } from "next/server";
import { Duffel } from "@duffel/api";

export async function POST(req) {
  const { info } = await req.json();
  const duffel = new Duffel({ token: process.env.DUFFEL_TEST_API_KEY });

  const getAdults = () => {
    return Array.from({ length: parseInt(info.adults) }, () => ({
      type: "adult",
    }));
  };

  const getChildren = () => {
    return info.children.map((child) => ({ age: parseInt(child.age) }));
  };

  const getSlices = () => [
    {
      origin: info.origin,
      destination: info.destination,
      departure_date: info.departure,
    },
    ...(info.isOneWay
      ? []
      : [
          {
            origin: info.destination,
            destination: info.origin,
            departure_date: info.returning,
          },
        ]),
  ];

  try {
    const offerReq = await duffel.offerRequests.create(
      {
        slices: getSlices(),
        passengers: [...getAdults(), ...getChildren()],
        cabin_class: info.cabinClass,
      },
      { return_offers: false }
    );

    const offersRes = await duffel.offers.list({
      offer_request_id: offerReq.data.id,
      limit: 50,
      sort: "total_amount",
    });

    const data = offersRes.data;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
