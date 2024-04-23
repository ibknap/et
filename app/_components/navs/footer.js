"use client";

import logo from "@/public/logos/logo_long.svg";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import Loader from "@/app/_components/loader";

export default function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(email);
  };

  return (
    <footer className="bg-primary py-5">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-md-6 mb-3">
            <Image src={logo} alt="logo" height={50} priority />
          </div>

          <div className="col-md-6 mb-3 d-flex justify-content-end">
            <form onSubmit={handleSubmit} className="email-sub-form">
              <input
                type="email"
                required
                disabled={isLoading}
                className="form-control cus-form-control email-sub-input"
                id="emailSub"
                placeholder="Your email address"
                onChange={(e) => setEmail(e.target.value)}
              />

              {isLoading ? (
                <Loader
                  className="text-muted email-sub-btn"
                  style={{ top: "32%", right: "16px" }}
                />
              ) : (
                <ArrowRight
                  size={18}
                  type="submit"
                  className="text-muted email-sub-btn"
                />
              )}
            </form>
          </div>
        </div>

        <hr />

        <div className="row justify-content-center">
          <div className="col-md-6 mb-3">
            <Link className="text-white text-decoration-none" href="/">
              Copyright © {new Date().getFullYear()} Exclusive Travel
            </Link>
          </div>

          <div className="col-md-6 mb-3">
            <ul className="list-unstyled d-flex justify-content-end">
              <li className="ms-3">
                <Link
                  href="/policy"
                  className="text-white text-decoration-none"
                >
                  Privacy Policy
                </Link>
              </li>

              <li className="ms-3">
                <Link href="/terms" className="text-white text-decoration-none">
                  Terms Of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
