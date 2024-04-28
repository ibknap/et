"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HotelDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Emeralda De Hotel</h1>
          </div>

          <div className="col-md-6 mt-3"></div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
