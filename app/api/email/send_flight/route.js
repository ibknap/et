import { NextResponse } from "next/server";

export async function POST(req) {
  const { ticket } = await req.json();

  const getHtml = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
            rel="stylesheet"
          />
   
          <title>ET Email</title>
          <style>
            h1,
            h2,
            p,
            img {
              margin: 0;
              padding: 0;
            }
            body {
              font-family: "Inter", sans-serif;
              background-color: #ffffff;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
            }
            td {
              padding: 0;
            }
          </style>
        </head>
        <body style="background-color: #ffffff; padding-bottom: 30px">
          <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="100%"
            style="max-width: 600px; margin: 0 auto"
          >
            <tr>
              <td align="center" style="padding: 30px 0">
                <h1
                  style="
                    font-size: 32px;
                    font-weight: 600;
                    line-height: 1.2;
                    margin-top: 60px;
                    margin-bottom: 20px;
                  "
                >
                  Ad Post Is Activated
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px">
                <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 10px">
                  Hello,
                </h2>

                <p
                  style="
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 1.5;
                    margin-bottom: 30px;
                  "
                >
                  Your ad post
                  <b>${adTitle}</b> has been activated. Congratulations 🎉!
                </p>
              </td>
            </tr>
          </table>
        </body>
      </html>
   `;
  };

  try {
    const to = process.env.SMTP_SERVER_USERNAME;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER_HOST,
      port: Number(process.env.SMTP_SERVER_PORT),
      secure: false,
      auth: {
        user: to,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `ET Site <${to}>`,
      to,
      subject: "New Ticket Order",
      html: getHtml(),
    });

    const data = res.data;
    return NextResponse.json({ info }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
