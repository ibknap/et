"use client";

import Image from "next/image";
import Link from "next/link";
import hotel from "@/public/icons/hotel_white.svg";
import plane from "@/public/icons/plane_white.svg";
import { usePathname } from "next/navigation";
import { SearchNormal1 } from "iconsax-react";
import FlightSearchModal from "@/app/_components/flight/flight_search_modal";
import { useState } from "react";

const FlightSearchBox = () => {
  const path = usePathname();
  const [show, setShow] = useState(false);

  return (
    <main>
      <section className="bg-primary pt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex">
                <Link
                  href="/"
                  className={`px-3 py-2 text-decoration-none rounded-pill text-white ${
                    path === "/" ? "bg-white bg-opacity-25" : ""
                  } border border-white me-4`}
                >
                  <Image src={plane} priority alt="plane" className="me-2" />
                  Flights
                </Link>

                <Link
                  href="/hotels"
                  className={`px-3 py-2 text-decoration-none rounded-pill text-white ${
                    path === "/hotels" ? "bg-white bg-opacity-25" : ""
                  } border border-white me-4`}
                >
                  <Image src={hotel} priority alt="hotel" className="me-2" />
                  Hotels
                </Link>
              </div>
            </div>

            <div className="col-12 pt-5">
              <h1 className="text-white display-4 fw-bold">Hi Jenna!</h1>

              <p className="text-white fw-light">Where do you want to go?</p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <div
                onClick={() => setShow(true)}
                className="shadow d-flex justify-content-between form-control cus-form-control border border-3 border-warning pe-active"
              >
                <span className="fw-light">Search For Flights</span>
                <SearchNormal1 />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlightSearchModal showState={show} onHide={() => setShow(false)} />
    </main>
  );
};

export default FlightSearchBox;
