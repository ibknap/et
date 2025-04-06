import { NextResponse } from "next/server";

export async function POST(req) {
  const googleKey = process.env.GOOGLE_API_KEY;
  const { placeId } = await req.json();

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googleKey}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const jsonRes = await res.json();
    const data = jsonRes.result;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching google place_id:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
