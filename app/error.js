"use client";

import errorImg from "@/public/images/error.svg";
import Image from "next/image";

const GlobalError = ({ _, reset }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <Image src={errorImg} width={327} priority alt="error" />

          <button
            onClick={() => reset()}
            className="mt-5 btn btn-lg btn-primary mx-auto"
          >
            Try Again / Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
