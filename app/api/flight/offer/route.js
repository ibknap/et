import { NextResponse } from "next/server";
import { Duffel } from "@duffel/api";

export async function POST(req) {
  const { id } = await req.json();
  const duffel = new Duffel({ token: process.env.DUFFEL_LIVE_API_KEY });

  try {
    const res = await duffel.offers.get(id);

    const data = res.data;
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
