"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/_components/loader";
import { Form, Modal } from "react-bootstrap";
import capitalize from "@/app/_utils/capitalize";
import { toast } from "react-toastify";
import FlightDeals from "@/app/_components/flight/deals";
import { CloseCircle } from "iconsax-react";
import Image from "next/image";
import change from "@/public/icons/change.svg";
import { toFlightTime, toDate } from "@/app/_utils/to_date";
import { add20Percent, toCurrency } from "@/app/_utils/to_currency";
import Link from "next/link";

const FlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOneWay, setIsOneWay] = useState(false);
  const [isReturn, setIsReturn] = useState(true);
  const [isMultiCity, setIsMultiCity] = useState(false);
  const [offers, setOffers] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState(null);
  const [searchDestination, setSearchDestination] = useState(null);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState(null);
  const [returning, setReturning] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState([]);
  const [childrenLength, setChildrenLength] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");

  useEffect(() => {
    if (childrenLength > 0) {
      const initChildren = [...Array(parseInt(childrenLength)).keys()].map(
        (child, index) => ({ id: child + 1, age: 0 })
      );
      setChildren(initChildren);
    } else {
      setChildren([]);
    }
  }, [childrenLength]);

  const onSearchOrigin = async (q) => {
    const keyword = q.toString().toUpperCase();

    if (keyword.length > 0) {
      try {
        const res = await fetch("/api/flight/airports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        });
        const resJson = await res.json();
        const airport = resJson.data;

        setSearchOrigin(airport);
      } catch (error) {}
    } else {
      setSearchOrigin(null);
    }
  };

  const onSearchDestination = async (q) => {
    const keyword = q.toString().toUpperCase();

    if (keyword.length > 0) {
      try {
        const res = await fetch("/api/flight/airports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        });
        const resJson = await res.json();
        const airport = resJson.data;

        setSearchDestination(airport);
      } catch (error) {}
    } else {
      setSearchDestination(null);
    }
  };

  const onChildAgeChange = (id, ageValue) => {
    setChildren((prev) => {
      const index = prev.findIndex((child) => child.id === id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], age: ageValue };
        return updated;
      } else {
        return [...prev, { id, age: ageValue }];
      }
    });
  };

  const onSearchFlightOffers = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Getting available cheapest flight offers...");

    const info = {
      origin: origin,
      destination: destination,
      departure: departure,
      returning: returning,
      adults: adults,
      childrenLength: childrenLength,
      children: children,
      cabinClass: cabinClass,
      isOneWay: isOneWay,
    };

    try {
      const res = await fetch("/api/flight/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info }),
      });
      const resJson = await res.json();
      const offers = resJson.data;

      setOffers(offers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-sm-6 mb-5 mb-md-0">
            <div className="row">
              <div className="col-12">
                <h4 className="mb-4">Book Flight</h4>

                <div className="mb-2 fw-bold">Journey type</div>

                <div className="d-flex">
                  <div className="col-4 mb-3">
                    <Form.Check
                      type="radio"
                      checked={isOneWay}
                      onChange={() => {
                        setIsOneWay(true);
                        setIsReturn(false);
                        setIsMultiCity(false);
                      }}
                      id="oneWay"
                      label="One Way"
                    />
                  </div>

                  <div className="col-4 mb-3">
                    <Form.Check
                      type="radio"
                      checked={isReturn}
                      onChange={() => {
                        setIsOneWay(false);
                        setIsReturn(true);
                        setIsMultiCity(false);
                      }}
                      id="return"
                      label="Return"
                    />
                  </div>

                  <div className="col-4 mb-3">
                    <Form.Check
                      type="radio"
                      checked={isMultiCity}
                      onChange={() => toast.info("Coming soon!")}
                      id="multiCity"
                      label="Multi-city"
                    />
                  </div>
                </div>

                <form
                  onSubmit={onSearchFlightOffers}
                  id="searchForm"
                  className="row"
                >
                  <div className="col-sm-6">
                    <div className="mb-3 position-relative">
                      <label className="form-label" htmlFor="origin">
                        Origin
                      </label>

                      <div className="position-relative">
                        <input
                          type="text"
                          required
                          className="form-control cus-form-control"
                          id="origin"
                          placeholder="Enter origin"
                          value={origin}
                          onChange={(e) => {
                            const v = e.target.value;
                            setOrigin(v);
                            onSearchOrigin(v);
                          }}
                        />

                        {origin && (
                          <CloseCircle
                            variant="Bulk"
                            color="red"
                            onClick={() => {
                              setOrigin("");
                              setSearchOrigin(null);
                            }}
                            className="search-close"
                          />
                        )}
                      </div>

                      {searchOrigin !== null && searchOrigin !== undefined && (
                        <div className="card shadow p-2 w-100 search-f-box">
                          <ul className="list-group list-group-flush">
                            {searchOrigin.map((ap, index) => (
                              <li
                                key={index}
                                className="list-group-item mb-1 pe-active"
                                onClick={() => {
                                  setOrigin(ap.iata_code);
                                  setSearchOrigin(null);
                                }}
                              >
                                <small>
                                  (<b>{ap.iata_code}</b>) {capitalize(ap.name)}
                                </small>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3 position-relative">
                      <label className="form-label" htmlFor="destination">
                        Destination
                      </label>

                      <div className="position-relative">
                        <input
                          type="text"
                          required
                          className="form-control cus-form-control"
                          id="destination"
                          placeholder="Enter destination"
                          value={destination}
                          onChange={(e) => {
                            const v = e.target.value;
                            setDestination(v);
                            onSearchDestination(v);
                          }}
                        />

                        {destination && (
                          <CloseCircle
                            variant="Bulk"
                            color="red"
                            onClick={() => {
                              setDestination("");
                              setSearchDestination(null);
                            }}
                            className="search-close"
                          />
                        )}
                      </div>

                      {searchDestination !== null &&
                        searchDestination !== undefined && (
                          <div className="card shadow p-2 w-100 search-f-box">
                            <ul className="list-group list-group-flush">
                              {searchDestination.map((ap, index) => (
                                <li
                                  key={index}
                                  className="list-group-item mb-1 pe-active"
                                  onClick={() => {
                                    setDestination(ap.iata_code);
                                    setSearchDestination(null);
                                  }}
                                >
                                  <small>
                                    (<b>{ap.iata_code}</b>){" "}
                                    {capitalize(ap.name)}
                                  </small>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className={isReturn ? "col-6 mb-4" : "col-12 mb-4"}>
                    <label className="form-label" htmlFor="departure">
                      Departure date
                    </label>

                    <input
                      type="date"
                      required
                      className="form-control cus-form-control"
                      id="departure"
                      placeholder="Departure"
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                  </div>

                  {isReturn && (
                    <div className="col-6 mb-3">
                      <label className="form-label" htmlFor="return">
                        Return date
                      </label>

                      <input
                        type="date"
                        min={departure}
                        required={isReturn}
                        className="form-control cus-form-control"
                        id="return"
                        placeholder="Return"
                        onChange={(e) => setReturning(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="adults">
                          Adults
                        </label>

                        <input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          type="number"
                          min="0"
                          aria-describedby="adultsLabel"
                          required
                          className="form-control cus-form-control"
                          id="adults"
                          placeholder="Adults"
                          defaultValue={1}
                          onChange={(e) => setAdults(e.target.value)}
                        />

                        <span id="adultsLabel" className="form-text">
                          18+
                        </span>
                      </div>

                      <div className="col-sm-6 mb-3">
                        <label className="form-label" htmlFor="childrenLength">
                          Children
                        </label>

                        <input
                          inputMode="numeric"
                          pattern="[0-9]*"
                          type="number"
                          min="0"
                          aria-describedby="childrenLengthLabel"
                          required
                          className="form-control cus-form-control"
                          id="childrenLength"
                          placeholder="Children"
                          defaultValue={0}
                          onChange={(e) => setChildrenLength(e.target.value)}
                        />

                        <span id="childrenLengthLabel" className="form-text">
                          0 to 18
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      childrenLength > 0 ? "col-sm-6 mb-3" : "col-sm-6 mb-4"
                    }
                  >
                    <label className="form-label" htmlFor="cabinClass">
                      Cabin class
                    </label>

                    <select
                      id="cabinClass"
                      className="form-select cus-form-control"
                      onChange={(e) => setCabinClass(e.target.value)}
                    >
                      <option value="economy">Economy</option>
                      <option value="premium_economy">Premium economy</option>
                      <option value="business">Business</option>
                      <option value="first">First</option>
                    </select>
                  </div>

                  {childrenLength > 0 && (
                    <div className="col-12 mb-4">
                      <div
                        className="row m-2 p-2 rounded-3 border-0 alert alert-dark m-0"
                        style={{ background: "#f9f8fc" }}
                      >
                        <small className="text-muted">
                          A child&apos;s age must be valid for the full duration
                          of journey. For example, if a child has a birthday
                          during a trip please use their age on the date of the
                          returning flight.
                        </small>

                        <hr className="my-2" />

                        {[...Array(parseInt(childrenLength)).keys()].map(
                          (child, index) => {
                            const id = child + 1;

                            return (
                              <div
                                key={index}
                                className={
                                  id === childrenLength
                                    ? "col-sm-6"
                                    : "col-sm-6 mb-3"
                                }
                              >
                                <label
                                  className="form-label "
                                  htmlFor={`child${id}Age`}
                                >
                                  Child {id} age
                                </label>

                                <select
                                  required
                                  id={`child${id}Age`}
                                  className="form-select cus-form-control"
                                  value={
                                    children.find((c) => c.id === id)?.age ?? ""
                                  }
                                  onChange={(e) =>
                                    onChildAgeChange(
                                      id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                >
                                  {[...Array(18).keys()].map((age, index) => (
                                    <option key={index} value={age}>
                                      {age}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <button
                      type="submit"
                      form="searchForm"
                      disabled={isLoading}
                      className="btn btn-primary w-100"
                    >
                      {isLoading ? <Loader /> : "Find Available Flights"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <FlightDeals />
        </div>
      </div>

      {offers !== null && (
        <Modal
          scrollable
          dialogClassName="modal-95w"
          backdrop="static"
          show={offers !== null}
          onHide={() => setOffers(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title className="h5">All Available Offers</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-0 m-0 mt-3 mx-2">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-3">
                  <div
                    className="rounded-3 border-0 alert alert-dark"
                    style={{ background: "#f9f8fc" }}
                  >
                    <p className=" fw-bold">
                      {isReturn
                        ? `Round trip to ${destination}`
                        : `One way trip to ${destination}`}
                    </p>

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="d-flex flex-column ">
                        {origin}
                        <small>{toDate(departure)}</small>
                      </div>

                      <Image
                        src={change}
                        priority
                        alt="change"
                        className="img-responsive"
                      />

                      <div className="d-flex flex-column  text-end">
                        {destination}
                        {isReturn && <small>{toDate(returning)}</small>}
                      </div>
                    </div>

                    <p className=" my-2">{adults} Passenger(s)</p>

                    <p className=" m-0 mt-2 text-muted">
                      {isReturn ? "Return" : "One Way"} •{" "}
                      {capitalize(cabinClass).replaceAll("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="col-sm-9">
                  {offers
                    .filter(
                      (offer) =>
                        !offer.owner.name.toLowerCase().includes("duffel")
                    )
                    .sort(
                      (a, b) =>
                        parseFloat(a.total_amount) - parseFloat(b.total_amount)
                    )
                    .map((offer, index) => (
                      <div
                        key={index}
                        className="d-flex mb-3 justify-content-between flex-column w-100 border rounded-3 p-3 text-decoration-none"
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold me-3">
                              {toFlightTime(
                                offer.slices[0].segments[0].departing_at
                              )}
                            </h6>

                            <div className="d-flex flex-column">
                              <Image
                                src={offer.owner.logo_symbol_url}
                                priority
                                width={50}
                                height={50}
                                alt="plane line"
                                className="img-responsive w-100 mb-2"
                              />
                              {offer.owner.name}
                            </div>

                            <h6 className="fw-bold ms-3">
                              {toFlightTime(
                                offer.slices[0].segments[0].arriving_at
                              )}
                            </h6>
                          </div>

                          <div className="d-flex justify-content-between">
                            <h6 className="fw-light text-muted">
                              {offer.slices[0].origin.iata_code}
                            </h6>

                            {isReturn && (
                              <h6 className="fw-light text-muted">
                                {offer.slices[1].origin.iata_code}
                              </h6>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between">
                            {offer.slices[0].segments[0].aircraft ? (
                              <div>
                                <small>
                                  {offer.slices[0].segments[0].aircraft.name}
                                  <br />
                                  <span className="text-muted">
                                    ({offer.slices[0].origin.name})
                                  </span>
                                </small>
                              </div>
                            ) : (
                              <small>{offer.slices[0].origin.name}</small>
                            )}

                            <h5 className="fw-bold text-danger">
                              {toCurrency(
                                offer.total_amount,
                                offer.total_currency
                              )}
                            </h5>
                          </div>

                          <div className="d-flex justify-content-between">
                            <h6 className="fw-light text-muted">
                              <b>{offer.slices[0].segments[0].stops.length}</b>{" "}
                              Stops
                            </h6>

                            <h6 className="fw-light text-muted">
                              Ticket Price
                            </h6>
                          </div>
                        </div>

                        <hr />
                        <div className="d-flex justify-content-end">
                          <Link
                            href={`/flights/offer/${offer.id}`}
                            className="btn btn-sm btn-dark"
                          >
                            Select Flight
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default FlightSearch;
