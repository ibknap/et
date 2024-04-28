"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/_components/loader";
import visa from "@/public/images/visa.png";
import master from "@/public/images/master.png";
import Image from "next/image";

export default function FlightCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");
  const router = useRouter();
  const param = useSearchParams();

  console.log(param);
  const onProceed = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (param.get("type") === "flight") {
      router.push("/payment/flight_ticket");
    } else {
      router.push("/payment/hotel_ticket");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Payment Options</h1>
          </div>

          <div className="col-md-6 mt-3">
            <div className="d-flex">
              <Image
                src={visa}
                width={57}
                priority
                alt="visa"
                className="img-responsive me-3"
              />

              <Image
                src={master}
                width={57}
                priority
                alt="master"
                className="img-responsive"
              />
            </div>

            <form
              onSubmit={onProceed}
              id="form"
              className="border rounded-4 mt-3 p-3"
            >
              <div className="mb-4">
                <label className="form-label" htmlFor="holder">
                  Card Holder Name
                </label>

                <input
                  type="text"
                  required
                  className="form-control cus-form-control transparent rounded-0 border-0 border-bottom"
                  id="holder"
                  placeholder="John Doe"
                  onChange={(e) => setHolder(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="number">
                  Card Number
                </label>

                <input
                  type="text"
                  required
                  inputMode="numeric"
                  className="form-control cus-form-control transparent rounded-0 border-0 border-bottom"
                  id="number"
                  maxLength={16}
                  placeholder="xxxx xxxx xxxx xxxx"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between mb-4">
                <div className="me-2">
                  <label className="form-label" htmlFor="date">
                    Expiry Date
                  </label>

                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    className="form-control cus-form-control transparent rounded-0 border-0 border-bottom"
                    id="date"
                    maxLength={4}
                    placeholder="mmyy"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="ms-2">
                  <label className="form-label" htmlFor="cvv">
                    CVV
                  </label>

                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    className="form-control cus-form-control transparent rounded-0 border-0 border-bottom"
                    id="cvv"
                    maxLength={3}
                    placeholder="xxx"
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </form>

            <button
              type="submit"
              form="form"
              disabled={isLoading}
              className="btn btn-lg btn-primary mt-5 w-100"
            >
              {isLoading ? <Loader /> : "Proceed"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
