"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import FlightSearch from "@/app/_components/flight/flight_search";

export default function Flights() {
  return (
    <>
      <Navbar />
      <FlightSearch />
      <Footer />
      <BottomNavbar />
    </>
  );
}
