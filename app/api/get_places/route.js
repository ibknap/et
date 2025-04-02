import { NextResponse } from "next/server";
import Amadeus from "amadeus";
import { getRandomCity } from "@/app/_utils/cities";

export async function POST(req) {
  const clientId = process.env.AMADEUS_TEST_API_KEY;
  const clientSecret = process.env.AMADEUS_TEST_API_SECRET_KEY;

  const amadeus = new Amadeus({
    // hostname: "production", TODO: change to live
    clientId: clientId,
    clientSecret: clientSecret,
  });

  try {
    let data = [];

    while (data.length === 0) {
      const city = getRandomCity();

      const res = await amadeus.shopping.activities.get({
        latitude: city.latitude,
        longitude: city.longitude,
      });

      data = res.data;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching activities:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
