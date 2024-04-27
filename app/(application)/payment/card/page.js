"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/loader";
import visa from "@/public/images/visa.png";
import master from "@/public/images/master.png";
import Image from "next/image";

export default function FlightCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("Mr");
  const router = useRouter();

  const onProceed = async (e) => {
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
                priorite
                alt="master"
                className="img-responsive"
              />
            </div>

            <form onSubmit={onProceed}>
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

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-lg btn-primary mt-5 w-100"
              >
                {isLoading ? <Loader /> : "Proceed"}
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
