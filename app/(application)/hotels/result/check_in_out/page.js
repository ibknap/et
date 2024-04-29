"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Add, ArrowRight, Minus } from "iconsax-react";
import Loader from "@/app/_components/loader";

export default function HotelCheckInOut() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  const router = useRouter();

  const onCheckInOut = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    router.push("/payment/checkout/?type=hotel");
  };

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Check In-Out</h1>
          </div>

          <div className="col-md-6 mt-3">
            <div className="mt-3">
              <form
                onSubmit={onCheckInOut}
                className="d-flex justify-content-between align-items-center"
                id="form"
              >
                <div className="form-floating">
                  <input
                    type="date"
                    required
                    className="form-control cus-form-control"
                    id="checkIn"
                    placeholder="Check In"
                    onChange={(e) => setCheckIn(e.target.value)}
                  />

                  <label className="form-label" htmlFor="checkIn">
                    Check In
                  </label>
                </div>

                <ArrowRight />

                <div className="form-floating">
                  <input
                    type="date"
                    required
                    className="form-control cus-form-control"
                    id="checkOut"
                    placeholder="Check Out"
                    onChange={(e) => setCheckOut(e.target.value)}
                  />

                  <label className="form-label" htmlFor="checkOut">
                    Check Out
                  </label>
                </div>
              </form>
            </div>

            <div className="mt-5">
              <h5>Guest</h5>

              <div
                className="rounded-4 p-3 d-flex justify-content-center align-items-center"
                style={{ background: "#EAF1F8" }}
              >
                <button
                  onClick={() => {
                    if (guest > 1) {
                      setGuest(guest - 1);
                    }
                  }}
                  disabled={guest <= 1}
                  className="border-0 rounded-3 bg-warning px-3 py-2 me-4"
                >
                  <Minus />
                </button>
                <h5 className="fw-bold">{guest}</h5>
                <button
                  onClick={() => {
                    setGuest(guest + 1);
                  }}
                  className="border-0 rounded-3 bg-warning px-3 py-2 ms-4"
                >
                  <Add />
                </button>
              </div>
            </div>

            <div className="mt-5">
              <h5>
                Total: <b>${29 * guest}</b>
              </h5>
            </div>

            <button
              type="submit"
              form="form"
              disabled={isLoading}
              className="btn btn-lg btn-primary mx-auto w-100 mt-5"
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
