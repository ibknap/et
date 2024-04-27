"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import logo from "@/public/logos/logo_dark.svg";
import Image from "next/image";
import planeLine from "@/public/images/plane_line_down.svg";
import Loader from "@/app/_components/loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FlightDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Flights</h1>
          </div>

          <div className="col-md-6 mt-3">
            <div
              className="shadow p-3 rounded-3"
              style={{ background: "#EAF1F850" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <Image
                  src={logo}
                  width={50}
                  priority
                  alt="logo"
                  className="img-responsive me-3"
                />
                <h5>American Airlines</h5>
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <Image
                  src={planeLine}
                  priority
                  alt="plane line"
                  className="img-responsive h-100"
                />

                <div className="ms-3">
                  <div className="mb-4">
                    <h5 className="fw-bold">06:00</h5>
                    <h6 className="fw-light text-muted">
                      Sydney Kingsford Smith International Airport (SYD) Sydney,
                      New South Wales, Australia.
                    </h6>
                  </div>
                  <div className="mb-4">
                    <h6 className="fw-light" style={{ color: "#6FA1D1" }}>
                      Tuesday 14, November, 2023
                    </h6>
                    <h6 className="fw-bold" style={{ color: "#6FA1D1" }}>
                      2 Adults · Economy Class · 20Kg
                    </h6>
                  </div>
                  <div>
                    <h5 className="fw-bold">13:20</h5>
                    <h6 className="fw-light text-muted">
                      London Heathrow Airport (LCY) London, United Kingdom.
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <h5 className="fw-bold mb-3">Price Details</h5>

              <div className="d-flex justify-content-between">
                Flight Fare
                <h6 className="fw-bold">$499.99</h6>
              </div>
              <div className="d-flex justify-content-between">
                Taxes & Fees
                <h6 className="fw-bold">$126.04</h6>
              </div>
              <hr />

              <div className="d-flex justify-content-between">
                Total
                <h4 className="fw-bold text-warning">$626.03</h4>
              </div>
            </div>

            <button
              onClick={() => {
                setIsLoading(true);
                router.push("/payment/flight_checkout/");
              }}
              disabled={isLoading}
              className="btn btn-lg btn-primary mt-5 w-100"
            >
              {isLoading ? <Loader /> : "Continue"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
