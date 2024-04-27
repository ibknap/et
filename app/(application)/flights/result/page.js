"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { Filter } from "iconsax-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "@/public/logos/logo_dark.svg";
import planeLine from "@/public/images/plane_line.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FlightResult() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Flights</h1>
          </div>

          <div className="col-md-8 mt-3">
            <div className="d-flex">
              <button
                onClick={() => setShowFilter(true)}
                className="btn btn-lg btn-primary me-3 w-auto"
              >
                <Filter color="#fff" />
                Filter
              </button>

              <button
                onClick={() => {}}
                className="border border-dark transparent rounded-4 px-4"
              >
                {selectedFilter === 1
                  ? "Price: High To Low"
                  : selectedFilter === 2
                  ? "Price: Low To High"
                  : "Price: Random"}
              </button>
            </div>

            <div className="row px-md-5 mt-5">
              {[1, 2, 3, 4, 5, 6].map((e) => (
                <div
                  key={e}
                  onClick={() => {
                    router.push(`/flights/result/${e}`);
                  }}
                  className="col-12 mb-5 pe-active"
                >
                  <div className="d-flex border rounded-3 p-3">
                    <Image
                      src={logo}
                      width={125}
                      priority
                      alt="airline"
                      className="img-responsive me-3"
                    />

                    <div className="d-flex justify-content-between flex-column w-100">
                      <div>
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">06:00</h5>
                          <Image
                            src={planeLine}
                            priority
                            alt="plane line"
                            className="img-responsive w-100"
                          />
                          <h5 className="fw-bold">13:20</h5>
                        </div>

                        <div className="d-flex justify-content-between">
                          <h6 className="fw-light text-muted">SYD</h6>

                          <h6 className="fw-light text-muted">LCY</h6>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">6h 20</h5>

                          <h5 className="fw-bold text-warning">$499.99</h5>
                        </div>

                        <div className="d-flex justify-content-between">
                          <h6 className="fw-light text-muted">Estimation</h6>

                          <h6 className="fw-light text-muted">Ticket Price</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />

      <Modal
        contentClassName="border-0"
        scrollable
        centered
        show={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <Modal.Body className="p-0 p-3 m-0">
          <div className="container p-0">
            <div className="row">
              <div className="col-12">
                <h4>Flight Filter</h4>
                <hr />
              </div>

              <div className="col-12">
                <button
                  onClick={() => {
                    setSelectedFilter(1);
                    setShowFilter(false);
                  }}
                  className={`btn btn-lg btn-primary w-100 mb-3 ${
                    selectedFilter === 1 ? "border border-warning border-3" : ""
                  }`}
                >
                  High-To-Low
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter(2);
                    setShowFilter(false);
                  }}
                  className={`btn btn-lg btn-primary w-100 mb-3 ${
                    selectedFilter === 2 ? "border border-warning border-3" : ""
                  }`}
                >
                  Low-To-High
                </button>

                <button
                  onClick={() => {
                    setSelectedFilter(3);
                    setShowFilter(false);
                  }}
                  className={`btn btn-lg btn-primary w-100 ${
                    selectedFilter === 3 ? "border border-warning border-3" : ""
                  }`}
                >
                  Random
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
