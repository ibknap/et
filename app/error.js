"use client";

import errorImg from "@/public/images/error.svg";
import Image from "next/image";

const GlobalError = ({ error, reset }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <Image src={errorImg} width={327} priority alt="error" />

          <button
            onClick={() => reset()}
            className="mt-5 btn btn-lg btn-dark mt-3 mx-auto d-block"
          >
            Try Again / Back to Home
          </button>
        </div>

        <div className="col-md-6 text-center">
          <div className="alert alert-secondary mt-4 p-2" role="alert">
            {error.message}
            <hr />
            <b>HASH:</b> {error.digest}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
