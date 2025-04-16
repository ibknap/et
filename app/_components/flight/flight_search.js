"use client";

import { useEffect, useState } from "react";
import Loader from "@/app/_components/loader";
import { Form } from "react-bootstrap";
import capitalize from "@/app/_utils/capitalize";
import { toast } from "react-toastify";
import FlightDeals from "@/app/_components/flight/flight_deals";
import { CloseCircle } from "iconsax-react";

const FlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOneWay, setIsOneWay] = useState(false);
  const [isReturn, setIsReturn] = useState(true);
  const [isMultiCity, setIsMultiCity] = useState(false);
  const [offers, setOffers] = useState(null);
  const [searchOrigin, setSearchOrigin] = useState(null);
  const [searchDestination, setSearchDestination] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState([]);
  const [childrenLength, setChildrenLength] = useState(0);
  const [cabinClass, setCabinClass] = useState("ECONOMY");

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
      } catch (error) {
        console.error("Error getting origin airport:", error);
      }
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
      } catch (error) {
        console.error("Error getting destination airport:", error);
      }
    } else {
      setSearchDestination(null);
    }
  };

  const onSearchFlight = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.info("Getting available cheapest flight offers...");

    const info = {
      origin: origin,
      destination: destination,
      departure: departure,
      arrival: arrival,
      adults: adults,
      childrenLength: childrenLength,
      children: children,
      cabinClass: cabinClass,
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

  return (
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

              <form onSubmit={onSearchFlight} id="searchForm" className="row">
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
                        onChange={(e) => onSearchOrigin(e.target.value)}
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
                        onChange={(e) => onSearchDestination(e.target.value)}
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
                                  (<b>{ap.iata_code}</b>) {capitalize(ap.name)}
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
                      onChange={(e) => setArrival(e.target.value)}
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
                    <div className="row m-2 p-2 rounded-3 border-0 alert alert-dark">
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
                                className="form-label"
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
                                  onChildAgeChange(id, parseInt(e.target.value))
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
  );
};

export default FlightSearch;
