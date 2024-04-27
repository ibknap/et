"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import logo from "@/public/logos/logo_dark.svg";
import Image from "next/image";
import planeLine from "@/public/images/plane_line_down.svg";
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
              className="shadow p-3 rounded-3"
              style={{ background: "#EAF1F850" }}
            >
              <hr />

              <img
                src={`https://barcode.orcascan.com/?type=code128&data=Hello%20World`}
                width="100%"
                height={60}
                alt="code"
                className="img-responsive"
              />
            </div>

            <div className="mt-5">
              <div className="d-flex justify-content-between">
                Name
                <h6 className="fw-bold">John Doe</h6>
              </div>
              <div className="d-flex justify-content-between">
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
