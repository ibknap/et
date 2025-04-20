import { NextResponse } from "next/server";
import { base, genPaypalAccessToken } from "@/app/_utils/paypal";

export async function POST(req) {
  const { info } = await req.json();

  try {
    const accessToken = await genPaypalAccessToken();
    const res = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(info),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const order = await res.json();
    return NextResponse.json({ data: order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
