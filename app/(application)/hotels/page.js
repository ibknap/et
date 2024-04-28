"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/loader";

export default function Flights() {
  const [isLoading, setIsLoading] = useState(false);

  const onSearchHotel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    router.push("/hotels/result");
  };

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h1 className="display-6">Book Hotel</h1>
          </div>

          <div className="col-md-6 mt-3">
            <button
              type="submit"
              form="searchForm"
              disabled={isLoading}
              className="btn btn-lg btn-primary mt-5 w-100"
            >
              {isLoading ? <Loader /> : "Search Hotels"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
