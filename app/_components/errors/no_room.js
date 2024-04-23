"use client";

import NoRoomImg from "@/public/images/no_room.svg";
import Image from "next/image";
import Link from "next/link";

const NoRoom = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <p className="fw-light">
            Sorry no result at this time for your hotel and date combination.
          </p>

          <p>Please adjust your search parameters and try again.</p>

          <Image
            src={NoRoomImg}
            priority={true}
            className="mt-5"
            alt="no flight"
          />

          <Link href="/" className="mt-5 btn btn-lg btn-primary mx-auto">
            Search Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoRoom;
