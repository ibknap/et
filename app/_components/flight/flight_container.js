"use client";

import Image from "next/image";
import logo from "@/public/logos/logo_dark.svg";
import change from "@/public/icons/change.svg";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Trash } from "iconsax-react";
import Loader from "../loader";
import { useEffect, useState } from "react";
import { toDate } from "@/app/_utils/to_date";
import { toast } from "react-toastify";

const FlightContainer = () => {
  const [emblaRef] = useEmblaCarousel();
  const [isLoadingFlights, setIsLoadingFlights] = useState(true);
  const [flights, setFlights] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (flights === null) {
      async function getApi() {
        try {
          const res = await fetch("/api/get_flight_inspiration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const resJson = await res.json();
          const data = resJson.data;

          setFlights(data);
          setIsLoadingFlights(false);
        } catch (error) {
          console.error("Error getting flight inspiration:", error);
        }
      }

      getApi();
    }
  }, [flights]);

  return (
    <main className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Flight Deals</h2>
          </div>

          {isLoadingFlights && flights === null && (
            <div className="col-md-12 mt-3 d-flex justify-content-center">
              <Loader
                style={{ width: 50, height: 50, borderTop: "3px solid #333" }}
              />
            </div>
          )}

          {!isLoadingFlights &&
            flights !== null &&
            flights !== undefined &&
            flights.length === 0 && (
              <div className="col-md-12 mt-3 text-muted text-center">
                <Trash size={100} color="black" variant="Bulk" />
                <p className="mt-4 mb-0">No flights yet</p>
              </div>
            )}

          {!isLoadingFlights &&
            flights !== null &&
            flights !== undefined &&
            flights.length > 0 && (
              <div className="col-12 mt-3">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {flights.map((flight, index) => (
                      <div key={index} className="embla__slide mb-3">
                        <div className="card p-3 shadow-sm">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Image
                                src={logo}
                                width={36}
                                height={36}
                                priority
                                alt="airline"
                                className="img-responsive me-3"
                              />
                              <span className="fw-light">Exclusive offers</span>
                            </div>

                            <span className="fw-bold">
                              ${flight.price.total}
                            </span>
                          </div>

                          <hr />

                          <div className="d-flex justify-content-between">
                            <h6 className="fw-bold">{flight.origin}</h6>
                            <Image
                              src={change}
                              priority
                              alt="change"
                              className="img-responsive"
                            />
                            <h6 className="fw-bold">{flight.destination}</h6>
                          </div>

                          <small className="fw-light">
                            {toDate(flight.departureDate)} -{" "}
                            {toDate(flight.returnDate)}
                          </small>

                          <button
                            onClick={() => {
                              toast.success(
                                "Process booking and payments when connected with External Gateway (PCI-DSS & consolidator)"
                              );
                            }}
                            className="btn btn-primary w-100 mt-3"
                          >
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default FlightContainer;
