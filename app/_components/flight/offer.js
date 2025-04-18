"use client";

import Image from "next/image";
import {
  AirplaneSquare,
  Bag,
  Card,
  Clock,
  CloseSquare,
  Cloud,
  ShoppingBag,
  Trash,
} from "iconsax-react";
import { useEffect, useState } from "react";
import { toDuration, toFlightTime, toTime } from "@/app/_utils/to_date";
import { add20Percent, toCurrency } from "@/app/_utils/to_currency";
import { Form } from "react-bootstrap";
import capitalize from "@/app/_utils/capitalize";
import { toast } from "react-toastify";
import { countries } from "@/app/_utils/countries";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import Loader from "../loader";

const FlightOffer = ({ id }) => {
  const [offer, setOffer] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({});
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [isReturn, setIsReturn] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);

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
          const isReturn_ = offer.slices.length > 1;

          setOffer(offer);
          setIsReturn(isReturn_);
        } catch (error) {}
      }

      getApi();
    }
  }, [id]);

  const onPassengerChange = (id, field, value) => {
    setPassengerDetails((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const onShowPaypal = (e) => {
    e.preventDefault();
    setShowPaypal(true);
  };

  const onPaypalCreateOrder = async () => {
    try {
      const info = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: offer.total_currency,
              value: add20Percent(offer.total_amount),
            },
          },
        ],
        cart: [
          {
            id: offer.id,
            quantity: "1",
          },
        ],
      };

      const res = await fetch("/api/paypal/create_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info }),
      });

      if (!res.ok) toast.error("Could not create PayPal order");

      const resJson = await res.json();
      const order = resJson.data;

      if (order.id) {
        return order.id;
      } else {
        const errorDetail = order?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${order.debug_id})`
          : JSON.stringify(order);

        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);

      toast.error(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const onPaypalApprove = async (data, actions) => {
    try {
      const res = await fetch("/api/paypal/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, actions }),
      });

      if (!res.ok) toast.error("Could not create PayPal order");

      const resJson = await res.json();
      const order = resJson.data;

      if (order.status === "COMPLETED") {
        toast.success(
          "Payment completed. You will receive your Itinerary in your email."
        );
      } else {
        toast.error(
          `Sorry, your transaction could not be processed...${error}`
        );
      }
    } catch (error) {
      toast.error(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  const PaypalLoadingState = () => {
    const [{ isPending, isRejected }] = usePayPalScriptReducer();

    if (isPending) {
      return (
        <div className="d-flex justify-content-center mt-4">
          <Loader className="me-2" /> Loading PayPal
        </div>
      );
    }

    if (isRejected) {
      return (
        <div className="d-flex justify-content-center mt-4">
          Error while loading PayPal
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container-fluid mt-3 mb-5 px-md-5">
      {offer ? (
        <form onSubmit={onShowPaypal} className="row justify-content-center">
          <div className="col-sm-8 mb-3">
            <h4 className="mb-4">Fare Options</h4>

            <>
              <div className="mb-5">
                <div className="mb-2">
                  {isReturn && (
                    <>
                      <span className="fw-bold alert alert-danger rounded-pill p-2">
                        Outbound
                      </span>
                      <br />
                      <br />
                    </>
                  )}
                  Flight from
                  <b className="ms-2">
                    {offer.slices[0].segments[0].origin.iata_code}
                  </b>
                  <small className="text-muted ms-2">
                    ({offer.slices[0].segments[0].origin.name})
                  </small>
                  , Terminal {offer.slices[0].segments[0].origin_terminal}
                </div>

                <div className="mb-2">
                  To
                  <b className="ms-2">
                    {offer.slices[0].segments[0].destination.iata_code}
                  </b>
                  <small className="text-muted ms-2">
                    ({offer.slices[0].segments[0].destination.name})
                  </small>
                  , Terminal {offer.slices[0].segments[0].destination_terminal}
                </div>

                <div>
                  On
                  <b className="text-muted ms-2">
                    {toFlightTime(offer.slices[0].segments[0].departing_at)}
                  </b>
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
                      <ShoppingBag className="me-2" size={18} variant="Bulk" />
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
                    {toCurrency(
                      add20Percent(offer.total_amount),
                      offer.total_currency
                    )}
                  </h5>
                </div>
              </div>
            </>

            {isReturn && (
              <>
                <div className="my-5">
                  <div className="mb-2">
                    <span className="fw-bold alert alert-success rounded-pill p-2">
                      Inbound
                    </span>
                    <br />
                    <br />
                    Flight from
                    <b className="ms-2">
                      {offer.slices[1].segments[0].origin.iata_code}
                    </b>
                    <small className="text-muted ms-2">
                      ({offer.slices[1].segments[0].origin.name})
                    </small>
                    , Terminal {offer.slices[1].segments[0].origin_terminal}
                  </div>

                  <div className="mb-2">
                    To
                    <b className="ms-2">
                      {offer.slices[1].segments[0].destination.iata_code}
                    </b>
                    <small className="text-muted ms-2">
                      ({offer.slices[1].segments[0].destination.name})
                    </small>
                    , Terminal{" "}
                    {offer.slices[1].segments[0].destination_terminal}
                  </div>

                  <div>
                    On
                    <b className="text-muted ms-2">
                      {toFlightTime(offer.slices[1].segments[0].departing_at)}
                    </b>
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
                        <b>
                          {toTime(offer.slices[1].segments[0].departing_at)}
                        </b>
                        <span className="text-muted mt-2">
                          {offer.slices[1].segments[0].origin.iata_code}
                        </span>
                      </div>

                      <div className="d-flex flex-column align-items-center w-100">
                        <small className="text-muted">
                          {toDuration(offer.slices[1].duration)}
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
                        <b>{toTime(offer.slices[1].segments[0].arriving_at)}</b>
                        <span className="text-muted mt-2">
                          {offer.slices[1].segments[0].destination.iata_code}
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
                          offer.slices[1].segments[0].passengers[0].cabin_class
                        ).replaceAll("_", " ")}
                      </span>
                      <p className="fw-bold">
                        {offer.slices[1].fare_brand_name}
                      </p>
                    </div>

                    <Form.Check
                      type="radio"
                      checked={true}
                      onChange={() => {}}
                    />
                  </div>

                  <hr />

                  <ul className="list-unstyled mb-3">
                    <li className="mb-3">
                      <small className="text-muted d-flex align-items-center">
                        <CloseSquare className="me-2" size={18} /> Not
                        changeable
                      </small>
                    </li>

                    <li className="mb-3">
                      <small className="text-muted d-flex align-items-center">
                        <CloseSquare className="me-2" size={18} /> Not
                        refundable
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
                        <Bag className="me-2" size={18} variant="Bulk" />
                        Includes carry-on bags
                      </small>
                    </li>

                    <li>
                      <small className="d-flex align-items-center">
                        <ShoppingBag
                          className="me-2"
                          size={18}
                          variant="Bulk"
                        />
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
                      {toCurrency(
                        add20Percent(offer.total_amount),
                        offer.total_currency
                      )}
                    </h5>
                  </div>
                </div>
              </>
            )}

            <h4 className="mt-5 mb-4">Checkout</h4>

            <div className="row d-flex justify-content-between">
              <div className="col-sm-6">
                <div className="card p-3 mb-3 mb-md-0">
                  <div className="d-flex h-100">
                    <AirplaneSquare className="me-3" variant="Bulk" />

                    <div className="d-flex flex-column">
                      <p className="fw-bold mb-2">Order change policy</p>
                      <small className="text-muted">
                        This order is not changeable.
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="card p-3">
                  <div className="d-flex h-100">
                    <AirplaneSquare className="me-3" variant="Bulk" />

                    <div className="d-flex flex-column">
                      <p className="fw-bold mb-2">Order refund policy</p>
                      <small className="text-muted">
                        This order is not refundable.
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-5" />

            <h5 className="mb-3">Paying now, or later?</h5>
            <small className="text-muted">
              Decide whether you want to pay for your trip now in its entirety,
              or whether you&apos;d like to put a hold on the order, and pay at
              a later date. Be aware that you cannot currently select seats or
              baggage when holding an order.
            </small>

            <div className="row d-flex justify-content-between mt-4">
              <div className="col-sm-6">
                <div
                  className="card border-0 p-3 mb-3 mb-md-0 pe-active"
                  style={{ background: "#2873ba20" }}
                >
                  <div className="d-flex h-100">
                    <Form.Check
                      type="radio"
                      checked={true}
                      onChange={() => {}}
                    />

                    <div className="d-flex flex-column ms-3">
                      <p className="fw-bold mb-2">Pay now</p>
                      <small className="text-muted">
                        Pay now and confirm seat and baggage selection
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div
                  className="card border-0 p-3"
                  style={{ background: "#f9f8fc" }}
                >
                  <div className="d-flex h-100">
                    <Form.Check
                      type="radio"
                      checked={false}
                      onChange={() => {}}
                    />

                    <div className="d-flex flex-column ms-3">
                      <p className="fw-bold mb-2">Hold order</p>
                      <small className="text-muted">
                        Hold price and space and pay at a later date
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="my-5" />

            <h5 className="mb-3">Passengers</h5>
            {offer.passengers.map((passenger, index, arr) => {
              const details = passengerDetails[passenger.id] || {};
              const typeLabel =
                passenger.type.charAt(0).toUpperCase() +
                passenger.type.slice(1);

              const number =
                arr.slice(0, index).filter((p) => p.type === passenger.type)
                  .length + 1;

              return (
                <div key={passenger.id} className="mb-3">
                  <span className="rounded-pill px-3 py-1 bg-dark text-white">
                    {`${typeLabel} ${number}`}
                  </span>

                  {/* Personal details */}
                  <p className="text-muted my-2">Personal details</p>
                  <div className="row">
                    {/* Title */}
                    <div className="col-sm-2 mb-3">
                      <label htmlFor={`title-${passenger.id}`}>Title</label>
                      <select
                        id={`title-${passenger.id}`}
                        value={details.title || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "title",
                            e.target.value
                          )
                        }
                      >
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                        <option value="mrs">Mrs.</option>
                        <option value="miss">Miss.</option>
                        <option value="dr">Dr.</option>
                      </select>
                    </div>

                    {/* Given Name */}
                    <div className="col-6 col-md-5 mb-3">
                      <label htmlFor={`givenName-${passenger.id}`}>
                        Given name
                      </label>
                      <input
                        id={`givenName-${passenger.id}`}
                        type="text"
                        value={details.givenName || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "givenName",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Family Name */}
                    <div className="col-6 col-md-5 mb-3">
                      <label htmlFor={`familyName-${passenger.id}`}>
                        Family name
                      </label>
                      <input
                        id={`familyName-${passenger.id}`}
                        type="text"
                        value={details.familyName || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "familyName",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Date of Birth */}
                    <div className="col-6 mb-3">
                      <label htmlFor={`dob-${passenger.id}`}>
                        Date of birth
                      </label>
                      <input
                        id={`dob-${passenger.id}`}
                        type="date"
                        value={details.dob || ""}
                        required
                        max={new Date().toISOString().split("T")[0]}
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(passenger.id, "dob", e.target.value)
                        }
                      />
                    </div>

                    {/* Gender */}
                    <div className="col-6">
                      <label htmlFor={`gender-${passenger.id}`}>Gender</label>
                      <select
                        id={`gender-${passenger.id}`}
                        value={details.gender || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "gender",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Passport details */}
                  <p className="text-muted my-2">Passport details</p>
                  <div className="row">
                    {/* Country */}
                    <div className="col-12 mb-3">
                      <label htmlFor={`country-${passenger.id}`}>
                        Country of issue
                      </label>
                      <select
                        id={`country-${passenger.id}`}
                        value={details.country || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "country",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country.en.toLowerCase()}>
                            {country.en}
                          </option>
                        ))}
                        {/* Populate country options as needed */}
                      </select>
                    </div>

                    {/* Passport Number */}
                    <div className="col-6 mb-3">
                      <label htmlFor={`passportNumber-${passenger.id}`}>
                        Passport number
                      </label>
                      <input
                        id={`passportNumber-${passenger.id}`}
                        type="text"
                        value={details.passportNumber || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "passportNumber",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {/* Expiry Date */}
                    <div className="col-6">
                      <label htmlFor={`expDate-${passenger.id}`}>
                        Expiry date
                      </label>
                      <input
                        id={`expDate-${passenger.id}`}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={details.expDate || ""}
                        required
                        className="form-control cus-form-control"
                        onChange={(e) =>
                          onPassengerChange(
                            passenger.id,
                            "expDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-sm-4">
            <h5>Contact Details</h5>

            <div className="mb-3">
              <input
                type="email"
                required
                className="form-control cus-form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                required
                className="form-control cus-form-control"
                id="phoneNumber"
                placeholder="Enter phone number (+1 234 567 8901)"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

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
                    <CloseSquare className="me-2" size={18} variant="Bulk" />
                    Not changeable
                  </small>
                </li>

                <li className="mb-3">
                  <small className="d-flex align-items-center">
                    <CloseSquare className="me-2" size={18} variant="Bulk" />
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
                    <ShoppingBag className="me-2" size={18} variant="Bulk" />
                    Includes checked bags
                  </small>
                </li>

                <li>
                  <small className="d-flex align-items-center">
                    <Cloud className="me-2" size={18} variant="Bulk" />
                    {offer.total_emissions_kg}kg CO2
                  </small>
                </li>
              </ul>

              <hr />

              <div>
                <div className="d-flex justify-content-between mb-2">
                  Fare
                  <b className="ms-2">
                    {toCurrency(
                      add20Percent(offer.base_amount),
                      offer.base_currency
                    )}
                  </b>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  Fare Tax
                  <b className="ms-2">
                    {toCurrency(
                      add20Percent(offer.tax_amount),
                      offer.tax_currency
                    )}
                  </b>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  TOTAL ({offer.total_currency})
                  <h5 className="mb-0 text-danger">
                    {toCurrency(
                      add20Percent(offer.total_amount),
                      offer.total_currency
                    )}
                  </h5>
                </div>
              </div>

              {showPaypal ? (
                <div className="mt-4">
                  <PayPalScriptProvider
                    options={{
                      clientId: process.env.NEXT_PUBLIC_PAYPAL_TEST_CLIENT_ID,
                    }}
                  >
                    <PaypalLoadingState />
                    <PayPalButtons
                      createOrder={() => onPaypalCreateOrder()}
                      onApprove={(data, actions) =>
                        onPaypalApprove(data, actions)
                      }
                    />
                  </PayPalScriptProvider>
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn btn-sm btn-dark mt-4 w-100"
                >
                  Make payment <Card color="white" size={16} />
                </button>
              )}
            </div>
          </div>
        </form>
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
