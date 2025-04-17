"use client";

import Image from "next/image";
import logo from "@/public/logos/logo_dark.svg";
import change from "@/public/icons/change.svg";
import {
  ArrowRight,
  Bag,
  Clock,
  CloseSquare,
  Cloud,
  ShoppingBag,
  Trash,
} from "iconsax-react";
import Loader from "../loader";
import { useEffect, useState } from "react";
import { toDateTime, toDuration, toTime } from "@/app/_utils/to_date";
import { add20Percent, toCurrency } from "@/app/_utils/to_currency";
import Link from "next/link";
import { Form } from "react-bootstrap";
import capitalize from "@/app/_utils/capitalize";

const FlightOffer = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [offer, setOffer] = useState(null);

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
          setOffer(offer);
        } catch (error) {
          console.error("Error getting flight offer:", error);
        }
      }

      getApi();
    }
  }, [id]);

  return (
    <div className="container my-5 px-md-5">
      {offer ? (
        <div className="row justify-content-center">
          <div className="col-sm-9 mb-3">
            <h4 className="mb-4">Fare options</h4>

            <div className="mb-5">
              <div className="mb-2">
                Flight from{" "}
                <b>{offer.slices[0].segments[0].origin.iata_code}</b>{" "}
                <small className="text-muted">
                  ({offer.slices[0].segments[0].origin.name})
                </small>
              </div>

              <div className="mb-2">
                To <b>{offer.slices[0].segments[0].destination.iata_code}</b>{" "}
                <small className="text-muted">
                  ({offer.slices[0].segments[0].destination.name})
                </small>
              </div>

              <div>
                On <b className="text-muted">20 Apr 2025</b>
              </div>
            </div>

            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column me-3">
                  <Image
                    src={offer.owner.logo_symbol_url}
                    width={46}
                    height={46}
                    priority
                    alt="airline"
                    className="img-responsive mb-2"
                  />
                  <small>{offer.owner.name}</small>
                </div>

                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="d-flex flex-column me-3">
                    <b>{toTime(offer.slices[0].segments[0].departing_at)}</b>
                    <span className="text-muted mt-2">
                      {offer.slices[0].segments[0].origin.iata_code}
                    </span>
                  </div>

                  <div className="d-flex flex-column align-items-center w-100">
                    <small className="text-muted">
                      {toDuration(offer.slices[0].duration)}
                    </small>

                    <div className="d-flex w-100">
                      <div className="flight-line my-2" />
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        className="flight-line-plane ms-2"
                      >
                        <path d="M8.5 22V20.5L10.5 19V13.5L2 16V14L10.5 9V3.5C10.5 3.06667 10.6417 2.70833 10.925 2.425C11.2083 2.14167 11.5667 2 12 2C12.4333 2 12.7917 2.14167 13.075 2.425C13.3583 2.70833 13.5 3.06667 13.5 3.5V9L22 14V16L13.5 13.5V19L15.5 20.5V22L12 21L8.5 22Z"></path>
                      </svg>
                    </div>

                    <small className="text-muted">Direct</small>
                  </div>

                  <div className="d-flex flex-column ms-3">
                    <b>{toTime(offer.slices[0].segments[0].arriving_at)}</b>
                    <span className="text-muted mt-2">
                      {offer.slices[0].segments[0].destination.iata_code}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4 rounded-3 pe-active border border-2 border-dark p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex flex-column">
                  <span className="text-muted">
                    {capitalize(
                      offer.slices[0].segments[0].passengers[0].cabin_class
                    ).replaceAll("_", " ")}
                  </span>
                  <p className="fw-bold">{offer.slices[0].fare_brand_name}</p>
                </div>

                <Form.Check type="radio" checked={true} onChange={() => {}} />
              </div>

              <hr />

              <ul className="list-unstyled mb-3">
                <li className="mb-3">
                  <small className="text-muted d-flex align-items-center">
                    <CloseSquare className="me-2" size={18} /> Not changeable
                  </small>
                </li>

                <li className="mb-3">
                  <small className="text-muted d-flex align-items-center">
                    <CloseSquare className="me-2" size={18} /> Not refundable
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <Clock className="me-2" size={18} variant="Bulk" /> Hold
                    price & space
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <Bag className="me-2" size={18} variant="Bulk" /> Includes
                    carry-on bags
                  </small>
                </li>

                <li>
                  <small className="d-flex align-items-center">
                    <ShoppingBag className="me-2" size={18} variant="Bulk" />{" "}
                    Includes checked bags
                  </small>
                </li>
              </ul>

              <div
                className="rounded-3 border-0 alert alert-dark m-0"
                style={{ background: "#f9f8fc" }}
              >
                Total amount
                <h5 className="mb-0 text-black">
                  {toCurrency(offer.total_amount, offer.total_currency)}
                </h5>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div
              className="rounded-3 border-0 alert alert-dark m-0"
              style={{ background: "#f9f8fc" }}
            >
              <p className="fw-bold">Summary</p>

              <hr />

              <div className="d-flex align-items-center">
                <small>Sold by</small>
                <Image
                  src={offer.owner.logo_symbol_url}
                  width={16}
                  height={16}
                  priority
                  alt="airline"
                  className="img-responsive mx-2"
                />
                <small>{offer.owner.name}</small>
              </div>

              <hr />

              <ul className="list-unstyled">
                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <CloseSquare className="me-2" size={18} variant="Bulk" />{" "}
                    Not changeable
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <CloseSquare className="me-2" size={18} variant="Bulk" />{" "}
                    Not refundable
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <Clock className="me-2" size={18} variant="Bulk" /> Hold
                    space for 0 days
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <Clock className="me-2" size={18} variant="Bulk" /> Hold
                    price for 0 days
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <Bag className="me-2" size={18} variant="Bulk" /> Includes
                    carry-on bags
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <ShoppingBag className="me-2" size={18} variant="Bulk" />{" "}
                    Includes checked bags
                  </small>
                </li>

                <li>
                  <small className="d-flex align-items-center">
                    <Cloud className="me-2" size={18} variant="Bulk" />{" "}
                    {offer.total_emissions_kg}kg CO2
                  </small>
                </li>
              </ul>

              <Link href="" className="btn btn-sm btn-dark mt-4">
                Go to checkout <ArrowRight color="white" size={16} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-12 text-muted text-center">
            <Trash size={100} />
            <br />
            <br />
            This page does not exist or is loading
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightOffer;
