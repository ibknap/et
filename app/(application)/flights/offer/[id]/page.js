"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useParams } from "next/navigation";
import FlightOffer from "@/app/_components/flight/offer";

export default function FlightDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <FlightOffer id={id} />
      <Footer />
      <BottomNavbar />
    </>
  );
}
