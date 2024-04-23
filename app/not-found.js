"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logos/logo_dark.svg";

const NotFound = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="row justify-content-center">
      <div className="col-12 text-center">
        <Image src={logo} width={150} priority alt="not found" />

        <div className="mt-5">
          <h3 className="fw-bold">Page Not Found</h3>

          <p className="text-muted">This page does not exist</p>

          <Link href="/" className="mt-5 btn btn-lg btn-primary mx-auto">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
