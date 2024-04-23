"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo.svg";

const NotFound = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="row">
      <div className="col-12 text-center">
        <Image src={logo} alt="not found" priority />

        <div className="mt-5">
          <h3 className="fw-bold">Page Not Found</h3>

          <p className="text-muted">This page does not exist</p>

          <Link href="/" className="btn btn-lg btn-dark mt-3">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
