"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import Image from "next/image";
import planeLine from "@/public/images/plane_line_dark.svg";
import Loader from "@/app/_components/loader";
import { useState } from "react";

export default function FlightTicket() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Ticket Details</h1>
          </div>

          <div className="col-md-6 mt-3">
            <div
              className="shadow rounded-4"
              style={{ background: "#EAF1F850" }}
            >
              <div className="d-flex justify-content-between bg-primary p-3 rounded-top-4">
                <div>
                  <h5 className="fw-bold">SYD</h5>

                  <small className="fw-light text-white">
                    Sydney, Australia
                  </small>
                </div>

                <Image
                  src={planeLine}
                  priority
                  alt="plane line"
                  className="img-responsive w-100"
                />

                <div>
                  <h5 className="fw-bold">LCY</h5>
                  <small className="fw-light text-white">
                    London, United Kingdom
                  </small>
                </div>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <small className="fw-light">Flight Date</small>
                    <br />
                    <b>18 April, 2024</b>
                  </div>

                  <div>
                    <small className="fw-light">Airline</small>
                    <br />
                    <b>American Airlines</b>
                  </div>

                  <div>
                    <small className="fw-light">Gate</small>
                    <br />
                    <b>8C</b>
                  </div>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div>
                    <small className="fw-light">Boarding</small>
                    <br />
                    <b>12:00 PM</b>
                  </div>

                  <div>
                    <small className="fw-light">Class</small>
                    <br />
                    <b>Economy</b>
                  </div>

                  <div>
                    <small className="fw-light">Seat</small>
                    <br />
                    <b>14D</b>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    <small className="fw-light">Flight No</small>
                    <br />
                    <b>W3408</b>
                  </div>

                  <div>
                    <small className="fw-light">Baggage</small>
                    <br />
                    <b>20Kg</b>
                  </div>

                  <div />
                </div>

                <hr />

                <img
                  src={`https://barcode.orcascan.com/?type=code128&data=Hello%20World`}
                  width="100%"
                  height={60}
                  alt="code"
                  className="img-responsive"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="d-flex justify-content-between">
                Name
                <h6 className="fw-bold">John Doe</h6>
              </div>

              <div className="d-flex justify-content-between mt-3">
                Order No
                <h6 className="fw-bold">#48FWU2</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                Ticket Price
                <h4 className="fw-bold text-warning">$626.03</h4>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLoading(true);
              }}
              disabled={isLoading}
              className="btn btn-lg btn-primary mt-5 w-100"
            >
              {isLoading ? <Loader /> : "Download Ticket"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
