import { NextResponse } from "next/server";
import { base, genPaypalAccessToken } from "@/app/_utils/paypal";

export async function POST(req) {
  const { data, actions } = await req.json();

  try {
    const accessToken = await genPaypalAccessToken();
    console.log(data.orderID);

    const res = await fetch(
      `${base}/v2/checkout/orders/${data.orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const order = await res.json();
    console.log(order);
    const errorDetail = order?.details?.[0];
    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
      return actions.restart();
    } else if (errorDetail) {
      return NextResponse.json(
        { error: `${errorDetail.description} (${order.debug_id})` },
        { status: 500 }
      );
    } else {
      const transaction = order.purchase_units[0].payments.captures[0];

      console.log(
        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
      );
      console.log("Capture result", order, JSON.stringify(order, null, 2));
      return NextResponse.json({ data: order }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
