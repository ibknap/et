"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import Loader from "@/app/_components/loader";
import { useState } from "react";
import { Location } from "iconsax-react";

export default function HotelTicket() {
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
              <div className="bg-primary p-3 rounded-top-4">
                <div>
                  <h2 className="fw-bold text-white">Emeralda De Hotel</h2>

                  <small className="fw-light text-white">
                    <Location color="#fff" /> Rome, Italy
                  </small>
                </div>
              </div>

              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <b>Check in</b>
                    <br />
                    <small className="fw-light">Wed, 16 Aug, 2023</small>
                    <br />
                    <small className="fw-light">12:00 PM</small>
                  </div>

                  <div className="text-warning">1 Night</div>

                  <div>
                    <b>Check out</b>
                    <br />
                    <small className="fw-light">Wed, 17 Aug, 2023</small>
                    <br />
                    <small className="fw-light">12:00 PM</small>
                  </div>
                </div>

                <hr />

                <div className="text-center">1 Room · 1 Guest · 1 Night</div>

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
