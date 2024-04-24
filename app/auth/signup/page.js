"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo_dark.svg";
import { useState } from "react";
import Loader from "@/app/_components/loader";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(firstName, lastName, email, password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 px-4 px-md-0 text-start">
          <Link href="/">
            <Image src={logo} width={100} priority alt="logo" />
          </Link>

          <form onSubmit={onSignup} className="mt-3">
            <h3 className="fw-light lh-base text-light-primary">
              Create an account on
              <br />
              Exclusive Travel
            </h3>

            <div className="col-12">
              <div className="row">
                <div className="col-6 my-4">
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="firstName"
                      placeholder="john"
                      onChange={(e) => setFirstName(e.target.value)}
                    />

                    <label className="form-label" htmlFor="lastName">
                      Last Name
                    </label>
                  </div>

                  <div className="form-floating">
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
                </div>

                <div className="col-6 mt-4 mb-5">
                  <div className="form-floating my-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="lastName"
                      placeholder="john"
                      onChange={(e) => setLastName(e.target.value)}
                    />

                    <label className="form-label" htmlFor="lastName">
                      First Name
                    </label>
                  </div>

                  <div className="form-floating">
                    <input
                      type="password"
                      required
                      className="form-control cus-form-control"
                      id="password"
                      placeholder="XXXXXXXX"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-lg btn-primary mx-auto w-100"
            >
              {isLoading ? <Loader /> : "Sign In"}
            </button>

            <div className="mt-4 text-center">
              <p className="text-muted">OR</p>

              <Link href="/auth/signin" className="mt-3 text-accent">
                Sign in
              </Link>

              <p className="mt-4 text-muted fw-light">
                By proceeding, I acknowledge that I have read and agreed to
                Exclusive Travel&apos;s{" "}
                <Link href="/terms" className="text-accent">
                  Terms and Condition
                </Link>{" "}
                and{" "}
                <Link href="/policy" className="text-accent">
                  Privacy Statement
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
