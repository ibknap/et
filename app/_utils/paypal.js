const { toast } = require("react-toastify");

export const base = process.env.PAYPAL_TEST_URL;
const clientId = process.env.PAYPAL_TEST_CLIENT_ID;
const clientSecret = process.env.PAYPAL_TEST_CLIENT_SECRET;

export async function paypalResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    const error = await res.text();
    toast.error(error);
  }
}

export async function genPaypalAccessToken() {
  const auth = `${clientId}:${clientSecret}`;
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  const data = await paypalResponse(res);
  return data.access_token;
}
