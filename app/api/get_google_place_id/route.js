import { NextResponse } from "next/server";

export async function POST(req) {
  const googleKey = process.env.GOOGLE_API_KEY;
  const { name, latLng } = await req.json();

  const baseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const params = `?location=${latLng}&query=${encodeURIComponent(
    name
  )}&radius=10&key=${googleKey}`;
  const url = baseUrl + params;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const jsonRes = await res.json();
    const placeId = jsonRes.results[0].place_id;
    return NextResponse.json({ placeId }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
