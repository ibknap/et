import capitalize from "@/app/_utils/capitalize";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { toFlightTime } from "@/app/_utils/to_date";

export async function POST(req) {
  const { ticket } = await req.json();

  const getHtml = () => {
    const passengers = ticket.passengers
      .map(
        (passenger) => `
      <li key={index} style="margin-bottom: 20px">
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Type:</b> ${capitalize(passenger.type)} ${
          passenger.age ? `(${passenger.age} years old)` : ""
        }
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Title:</b> ${capitalize(passenger.title)}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Given Name:</b> ${capitalize(passenger.givenName)}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Family Name:</b> ${capitalize(passenger.familyName)}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Date Of Birth:</b> ${passenger.dob}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Gender:</b> ${capitalize(passenger.gender)}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Country Of Issue:</b> ${capitalize(passenger.country)}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Passport Number:</b>
          ${passenger.passportNumber}
        </p>

        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
          <b>Expiry Date:</b> ${passenger.expDate}
        </p>
      </li>
    `
      )
      .join("");

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
                    New Ticket Order
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px">
                  <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 30px">
                    By ${ticket.email},
                  </h2>

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0.5rem;">
                    ${
                      ticket.isReturn
                        ? `<span
                            style="
                            font-weight: 700;
                            background-color: #f8d7da;
                            color: #842029;
                            padding: 0.5rem;
                            border: 1px solid #f5c2c7;
                            border-radius: 50rem;
                            display: inline-block;
                          "
                          >
                            Outbound
                          </span>
                          <br />
                          <br />
                        `
                        : ""
                    }
                    Flight from
                    <b style="margin-left: 0.5rem;">
                      ${ticket.offer.slices[0].segments[0].origin.iata_code}
                    </b>
                    <small style="color: #6c757d; margin-left: 0.5rem;">
                      (${ticket.offer.slices[0].segments[0].origin.name})
                    </small>
                    , Terminal ${
                      ticket.offer.slices[0].segments[0].origin_terminal ?? ""
                    }
                  </p>

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0.5rem;">
                    To
                    <b style="margin-left: 0.5rem;"> ${
                      ticket.offer.slices[0].segments[0].destination.iata_code
                    } </b>
                    <small style="color: #6c757d; margin-left: 0.5rem;">
                      (${ticket.offer.slices[0].segments[0].destination.name})
                    </small>
                    , Terminal ${
                      ticket.offer.slices[0].segments[0].destination_terminal ??
                      ""
                    }
                  </p>

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 2rem;">
                    On
                    <b style="color: #6c757d; margin-left: 0.5rem;">
                      ${toFlightTime(
                        ticket.offer.slices[0].segments[0].departing_at
                      )}
                    </b>
                  </p>
                  
                  ${
                    ticket.isReturn
                      ? `
                      <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0.5rem;">
                        <span
                        style="
                          font-weight: 700;
                          background-color: #d1e7dd;
                          color: #0f5132;
                          padding: 0.5rem;
                          border: 1px solid #badbcc;
                          border-radius: 50rem;
                          display: inline-block;
                          "
                        >
                        Inbound
                      </span>
                      <br />
                      <br />
                      Flight from
                      <b style="margin-left: 0.5rem;">
                        ${ticket.offer.slices[1].segments[0].origin.iata_code}
                      </b>
                      <small style="color: #6c757d; margin-left: 0.5rem;">
                        (${ticket.offer.slices[1].segments[0].origin.name})
                      </small>
                      , Terminal ${
                        ticket.offer.slices[1].segments[0].origin_terminal ?? ""
                      }
                    </p>

                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 0.5rem;">
                      To
                      <b style="margin-left: 0.5rem;"> ${
                        ticket.offer.slices[1].segments[0].destination.iata_code
                      } </b>
                      <small style="color: #6c757d; margin-left: 0.5rem;">
                        (${ticket.offer.slices[1].segments[0].destination.name})
                      </small>
                      , Terminal ${
                        ticket.offer.slices[1].segments[0]
                          .destination_terminal ?? ""
                      }
                    </p>

                    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 2rem;">
                      On
                      <b style="color: #6c757d; margin-left: 0.5rem;">
                        ${toFlightTime(
                          ticket.offer.slices[1].segments[0].departing_at
                        )}
                      </b>
                    </p>
                  `
                      : ""
                  }

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
                    <b>Email Address:</b> ${ticket.email}
                  </p>

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px">
                    <b>Phone Number:</b> ${ticket.phone}
                  </p>

                  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px">
                    <b>Total Amount Paid:</b> ${ticket.total_currency}
                    ${ticket.total_amount}
                  </p>

                  <p
                    style="
                      font-size: 20px;
                      line-height: 1.5;
                      margin-bottom: 10px;
                      font-weight: bold;
                    "
                  >
                    Passengers <small>(${ticket.passengers.length})</small>
                  </p>

                  <ul>
                    ${passengers}
                  </ul>
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

    await transporter.sendMail({
      from: `ET Site <${to}>`,
      to,
      subject: "New Ticket Order",
      html: getHtml(),
    });

    return NextResponse.json({ data: "done" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
