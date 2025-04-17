"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import OnBoard from "@/app/_components/onboard";
import { useEffect, useState } from "react";
import HotelContainer from "@/app/_components/hotel/container";
import { usePathname } from "next/navigation";
import PlaceContainer from "@/app/_components/place/container";
import FlightSearch from "@/app/_components/flight/search";
import Link from "next/link";
import Image from "next/image";
import hotel from "@/public/icons/hotel_white.svg";
import plane from "@/public/icons/plane_white.svg";

const Home = () => {
  const [show, setShow] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const lsetads = localStorage.getItem("lsetads");
    const currentTime = new Date().getTime();

    if (!lsetads || currentTime - parseInt(lsetads) > 24 * 60 * 60 * 1000) {
      setShow(true);
      localStorage.setItem("lsetads", currentTime.toString());
    }
  }, []);

  return (
    <>
      <Navbar />

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
              <h1 className="text-white display-4 fw-bold">Hello!</h1>

              <p className="text-white fw-light">Where do you want to go?</p>
            </div>
          </div>
        </div>
      </section>

      <FlightSearch />
      <PlaceContainer />
      <HotelContainer />
      <Footer />
      
      <BottomNavbar />
      {show && <OnBoard showState={true} onHide={() => setShow(false)} />}
    </>
  );
};

export default Home;
