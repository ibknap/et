"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Loader from "@/app/_components/loader";
import Image from "next/image";
import { toFlightTime } from "@/app/_utils/to_date";
import { toCurrency } from "@/app/_utils/to_currency";
import { toast } from "react-toastify";

export default function Flights() {
  const [isLoading, setIsLoading] = useState(false);
  const [isReturn, setIsReturn] = useState(true);
  const [offers, setOffers] = useState(null);
  const [searchFrom, setSearchFrom] = useState(null);
  const [searchTo, setSearchTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [returning, setReturning] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [classType, setClassType] = useState("ECONOMY");

  const onSearchFrom = async (q) => {
    const keyword = q.toString().toUpperCase();

    if (keyword.length > 0) {
      try {
        const res = await fetch("/api/get_flight_location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        });
        const resJson = await res.json();
        const location = resJson.data;

        setSearchFrom(location);
      } catch (error) {
        console.error("Error getting flight location:", error);
      }
    } else {
      setSearchFrom(null);
    }
  };

  const onSearchTo = async (q) => {
    const keyword = q.toString().toUpperCase();

    if (keyword.length > 0) {
      try {
        const res = await fetch("/api/get_flight_location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        });
        const resJson = await res.json();
        const location = resJson.data;

        setSearchTo(location);
      } catch (error) {
        console.error("Error getting flight location:", error);
      }
    } else {
      setSearchTo(null);
    }
  };

  const onSearchFlight = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Getting available cheapest flight offers...");

    const info = {
      from: from,
      to: to,
      departure: departure,
      returning: returning,
      adults: adults,
      children: children,
      infants: infants,
      classType: classType,
    };

    try {
      const res = await fetch("/api/get_flight_offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info }),
      });
      const resJson = await res.json();
      const offers = resJson.data;

      setOffers(offers);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting flight offers:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <h4>Book Flight</h4>
            <hr />
          </div>

          <div className="d-flex col-12">
            <div className="mb-3 me-3">
              <Form.Check
                type="radio"
                checked={isReturn}
                onChange={() => setIsReturn(true)}
                id="return"
                label="Return"
              />
            </div>

            <div className="mb-3 me-3">
              <Form.Check
                type="radio"
                checked={!isReturn}
                onChange={() => setIsReturn(false)}
                id="oneWay"
                label="One Way"
              />
            </div>
          </div>

          <div className="col-12">
            <form onSubmit={onSearchFlight} id="searchForm" className="row">
              <div className="col-sm-6">
                <div className="form-floating mb-4 position-relative">
                  <input
                    type="search"
                    required
                    className="form-control cus-form-control"
                    id="from"
                    placeholder="From"
                    value={from}
                    onChange={(e) => onSearchFrom(e.target.value)}
                  />

                  <label className="form-label" htmlFor="from">
                    From
                  </label>

                  {searchFrom !== null && searchFrom !== undefined && (
                    <div className="card shadow p-2 w-100 search-f-box">
                      <ul className="list-group list-group-flush">
                        {searchFrom.map((loc, index) => (
                          <li
                            key={index}
                            className="list-group-item mb-1 pe-active"
                            onClick={() => {
                              setFrom(loc.iataCode);
                              setSearchFrom(null);
                            }}
                          >
                            <small>
                              (<b>{loc.iataCode}</b>) {capitalize(loc.name)}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-floating mb-4 position-relative">
                  <input
                    type="search"
                    required
                    className="form-control cus-form-control"
                    id="To"
                    placeholder="To"
                    value={to}
                    onChange={(e) => onSearchTo(e.target.value)}
                  />

                  <label className="form-label" htmlFor="to">
                    To
                  </label>

                  {searchTo !== null && searchTo !== undefined && (
                    <div className="card shadow p-2 w-100 search-f-box">
                      <ul className="list-group list-group-flush">
                        {searchTo.map((loc, index) => (
                          <li
                            key={index}
                            className="list-group-item mb-1 pe-active"
                            onClick={() => {
                              setTo(loc.iataCode);
                              setSearchTo(null);
                            }}
                          >
                            <small>
                              (<b>{loc.iataCode}</b>) {capitalize(loc.name)}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className={isReturn ? "col-6" : "col-12"}>
                <div className="form-floating mb-4">
                  <input
                    type="date"
                    required
                    className="form-control cus-form-control"
                    id="departure"
                    placeholder="Departure"
                    onChange={(e) => setDeparture(e.target.value)}
                  />

                  <label className="form-label" htmlFor="departure">
                    Departure
                  </label>
                </div>
              </div>

              {isReturn && (
                <div className="col-6">
                  <div className="form-floating mb-4">
                    <input
                      type="date"
                      min={departure}
                      required={isReturn}
                      className="form-control cus-form-control"
                      id="return"
                      placeholder="Return"
                      onChange={(e) => setReturning(e.target.value)}
                    />

                    <label className="form-label" htmlFor="return">
                      Return
                    </label>
                  </div>
                </div>
              )}

              <div className="col-sm-6">
                <div className="form-floating mb-4">
                  <input
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

                  <label className="form-label" htmlFor="adults">
                    Adults
                  </label>
                  <span id="adultsLabel" className="form-text">
                    12 years old and older
                  </span>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-floating mb-4">
                  <input
                    type="number"
                    min="0"
                    aria-describedby="childrenLabel"
                    required
                    className="form-control cus-form-control"
                    id="children"
                    placeholder="Children"
                    defaultValue={0}
                    onChange={(e) => setChildren(e.target.value)}
                  />

                  <label className="form-label" htmlFor="children">
                    Children
                  </label>
                  <span id="childrenLabel" className="form-text">
                    2 to 12 years old
                  </span>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="form-floating mb-4">
                  <input
                    type="number"
                    min="0"
                    aria-describedby="infantsLabel"
                    required
                    className="form-control cus-form-control"
                    id="infants"
                    placeholder="Infants"
                    defaultValue={0}
                    onChange={(e) => setInfants(e.target.value)}
                  />

                  <label className="form-label" htmlFor="infants">
                    Infants
                  </label>
                  <span id="infantsLabel" className="form-text">
                    Up to 2 years old
                  </span>
                </div>
              </div>

              <div className="col-sm-6">
                <select
                  className="form-select cus-form-control"
                  onChange={(e) => setClassType(e.target.value)}
                >
                  <option value="ECONOMY">Economy</option>
                  <option value="PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="BUSINESS">Business</option>
                  <option value="FIRST">First</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />

      {offers !== null && (
        <Modal
          scrollable
          dialogClassName="modal-95w"
          backdrop="static"
          show={offers !== null}
          onHide={() => setOffers(null)}
        >
          <Modal.Header className="py-2" closeButton>
            <Modal.Title className="h5">All Available Offers</Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-0 p-3 m-0">
            <div className="container">
              <div className="row">
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      toast.success(
                        "Process booking and payments when connected with External Gateway (PCI-DSS & consolidator)"
                      );
                    }}
                    className="col-12 pe-active"
                  >
                    <div className="d-flex mb-3 justify-content-between flex-column w-100 border rounded-3 p-3">
                      <div>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5 className="fw-bold">
                            <h5 className="fw-bold">
                              {toFlightTime(
                                offer.itineraries[0].segments[0].departure.at
                              )}
                            </h5>
                          </h5>
                          <Image
                            src={planeLine}
                            priority
                            alt="plane line"
                            className="img-responsive w-100"
                          />
                          <h5 className="fw-bold">
                            {toFlightTime(
                              offer.itineraries[0].segments[0].arrival.at
                            )}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between">
                          <h6 className="fw-light text-muted">
                            {
                              offer.itineraries[0].segments[0].departure
                                .iataCode
                            }
                          </h6>

                          <h6 className="fw-light text-muted">
                            {offer.itineraries[0].segments[0].arrival.iataCode}
                          </h6>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">
                            {offer.numberOfBookableSeats}
                          </h5>

                          <h5 className="fw-bold text-danger">
                            {toCurrency(
                              offer.price.grandTotal,
                              offer.price.currency
                            )}
                          </h5>
                        </div>

                        <div className="d-flex justify-content-between">
                          <h6 className="fw-light text-muted">
                            Bookable Seats
                          </h6>

                          <h6 className="fw-light text-muted">Ticket Price</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
