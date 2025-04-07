import { NextResponse } from "next/server";

export async function POST(req) {
  const googleKey = process.env.GOOGLE_API_KEY;
  const { photoRef, firstOnly } = await req.json();

  try {
    if (firstOnly) {
      const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${photoRef}&key=${googleKey}`;

      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "image/*" },
      });

      console.log(url);

      return NextResponse.json({ url: res.url }, { status: 200 });
    } else {
      const urls = await Promise.all(
        photoRef.map(async (ref) => {
          const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${ref}&key=${googleKey}`;
          const res = await fetch(url, {
            method: "GET",
            headers: { Accept: "image/*" },
          });
          return res.url;
        })
      );

      return NextResponse.json({ urls }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching google photo(s):", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
