"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { Filter } from "iconsax-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "@/public/logos/logo_dark.svg";
import planeLine from "@/public/images/plane_line.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HotelResult() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Hotels</h1>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
