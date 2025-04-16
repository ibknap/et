"use client";

import Image from "next/image";
import logo from "@/public/logos/logo_dark.svg";
import change from "@/public/icons/change.svg";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Trash } from "iconsax-react";
import Loader from "../loader";
import { useEffect, useState } from "react";
import { toDate, toDateTime } from "@/app/_utils/to_date";
import { toast } from "react-toastify";
import { add20Percent, toCurrency } from "@/app/_utils/to_currency";

const FlightDeals = () => {
  const [emblaRef] = useEmblaCarousel();
  const [isLoadingFlights, setIsLoadingFlights] = useState(true);
  const [flights, setFlights] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (flights === null) {
      async function getApi() {
        try {
          const res = await fetch("/api/flight/random", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          const resJson = await res.json();
          const offers = resJson.data;

          console.log(offers[0]);

          setFlights(offers);
          setIsLoadingFlights(false);
        } catch (error) {
          console.error("Error getting random flights:", error);
        }
      }

      getApi();
    }
  }, [flights]);

  return (
    <div className="col-sm-6">
      <div className="row justify-content-center">
        <h4 className="mb-4">Flight Deals</h4>

        {isLoadingFlights && flights === null && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Loader />
            <p className="mt-3">loading flight offers...</p>
          </div>
        )}

        {!isLoadingFlights &&
          flights !== null &&
          flights !== undefined &&
          flights.length === 0 && (
            <div className="text-muted text-center">
              <Trash size={50} color="black" variant="Bulk" />
              <p className="mt-3">No flights available</p>
            </div>
          )}

        {!isLoadingFlights &&
          flights !== null &&
          flights !== undefined &&
          flights.length > 0 && (
            <div className="row">
              {flights.slice(0, 4).map((flight, index) => (
                <div key={index} className="col-sm-6">
                  <div className="card p-3 shadow-sm mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Image
                          src={
                            flight.owner.name.toLowerCase().includes("duffel")
                              ? logo
                              : flight.owner.logo_symbol_url
                          }
                          width={36}
                          height={36}
                          priority
                          alt="airline"
                          className="img-responsive me-3"
                        />
                        <small className="fw-light">
                          {flight.owner.name.toLowerCase().includes("duffel")
                            ? "ET"
                            : flight.owner.name}
                        </small>
                      </div>

                      <span className="fw-bold">
                        {toCurrency(
                          add20Percent(flight.total_amount),
                          flight.total_currency
                        )}
                      </span>
                    </div>

                    <hr />

                    <div className="d-flex justify-content-between">
                      <div>
                        <h6 className="fw-bold">
                          {flight.slices[0].origin.iata_code}
                        </h6>
                        <small className="fw-light">
                          {toDateTime(
                            flight.slices[0].segments[0].departing_at
                          )}
                        </small>
                      </div>

                      <Image
                        src={change}
                        priority
                        alt="change"
                        className="img-responsive"
                      />

                      <div className="text-end">
                        <h6 className="fw-bold">
                          {flight.slices[0].destination.iata_code}
                        </h6>
                        <small className="fw-light">
                          {toDateTime(flight.slices[0].segments[0].arriving_at)}
                        </small>
                      </div>
                    </div>

                    <button
                      onClick={() => {}}
                      className="btn btn-primary w-100 mt-3"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default FlightDeals;
