"use client";

import Image from "next/image";
import logo from "@/public/logos/logo_dark.svg";
import change from "@/public/icons/change.svg";
import { Trash } from "iconsax-react";
import Loader from "../loader";
import { useEffect, useState } from "react";
import { toDateTime } from "@/app/_utils/to_date";
import { add20Percent, toCurrency } from "@/app/_utils/to_currency";
import Link from "next/link";

const FlightOffer = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState(null);

  useEffect(() => {
    if (id !== null) {
      async function getApi() {
        try {
          const res = await fetch("/api/flight/offer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
          const resJson = await res.json();
          const offer = resJson.data;

          console.log(offer);
        } catch (error) {
          console.error("Error getting flight offer:", error);
        }
      }

      getApi();
    }
  }, [id]);

  return (
    <div className="container my-5 px-md-5">
      <div className="row justify-content-center">
        <div className="col-sm-9">
          <h4 className="mb-4">Fare options</h4>
        </div>
      </div>
    </div>
  );
};

export default FlightOffer;
