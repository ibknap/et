"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/loader";

export default function FlightCheckout() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("Mr");
  const router = useRouter();

  const onPayNow = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/payment/flight_ticket");
  };

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Checkout</h1>
          </div>

          <div className="col-md-6 mt-3">
            <div className="d-flex">
              <button
                onClick={() => setTitle("Mr")}
                className={
                  title === "Mr"
                    ? "btn btn-lg btn-primary me-3 w-auto"
                    : "border border-dark transparent rounded-4 px-4 me-3"
                }
              >
                Mr.
              </button>

              <button
                onClick={() => setTitle("Mrs")}
                className={
                  title === "Mrs"
                    ? "btn btn-lg btn-primary me-3 w-auto"
                    : "border border-dark transparent rounded-4 px-4 me-3"
                }
              >
                Mrs.
              </button>

              <button
                onClick={() => setTitle("Miss")}
                className={
                  title === "Miss"
                    ? "btn btn-lg btn-primary me-3 w-auto"
                    : "border border-dark transparent rounded-4 px-4 me-3"
                }
              >
                Miss.
              </button>
            </div>

            <form onSubmit={onPayNow}>
              <div className="form-floating my-4">
                <input
                  type="text"
                  required
                  className="form-control cus-form-control"
                  id="firstName"
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="form-label" htmlFor="firstName">
                  Last Name
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  required
                  className="form-control cus-form-control"
                  id="lastName"
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label className="form-label" htmlFor="lastName">
                  First Name
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="date"
                  required
                  className="form-control cus-form-control"
                  id="dob"
                  placeholder="Date Of Birth"
                  onChange={(e) => setDob(e.target.value)}
                />

                <label className="form-label" htmlFor="dob">
                  Date Of Birth
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="email"
                  required
                  className="form-control cus-form-control"
                  id="email"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="tel"
                  required
                  className="form-control cus-form-control"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-lg btn-primary mt-5 w-100"
              >
                {isLoading ? <Loader /> : "Pay Now"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
