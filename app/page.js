"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import OnBoard from "@/app/_components/onboard";
import { useEffect, useState } from "react";
import FlightSearchBox from "@/app/_components/flight/flight_search_box";
import FlightContainer from "@/app/_components/flight/flight_container";
import HotelContainer from "@/app/_components/hotel/hotel_container";
import { useRouter } from "next/navigation";
import PlaceContainer from "@/app/_components/place/place_container";

const Home = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

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

      {show && <OnBoard showState={true} onHide={() => setShow(false)} />}

      <FlightSearchBox />
      <FlightContainer />
      <PlaceContainer />
      <HotelContainer />

      <Footer />
      <BottomNavbar />
    </>
  );
};

export default Home;
