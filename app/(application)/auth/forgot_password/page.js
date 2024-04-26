"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo_dark.svg";
import { useState } from "react";
import Loader from "@/app/_components/loader";

const ForgorPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onForgorPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <div className="col-md-6 px-4 px-md-0 text-start">
          <Link href="/">
            <Image src={logo} width={100} priority alt="logo" />
          </Link>

          <form onSubmit={onForgorPassword} className="mt-3">
            <h3 className="fw-light lh-base text-light-primary">
              Reset Your
              <br />
              ET Password
            </h3>

            <div className="form-floating mt-4 mb-5">
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
              className="btn btn-lg btn-primary mx-auto w-100"
            >
              {isLoading ? <Loader /> : "Reset"}
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

export default ForgorPassword;
