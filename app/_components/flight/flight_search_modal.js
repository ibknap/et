"use client";

import { useState } from "react";
import Loader from "@/app/_components/loader";
import { Form, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";

const FlightSearchModal = ({ showState, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReturn, setIsReturn] = useState(true);
  const [isOneWay, setIsOneWay] = useState(false);
  const [isMultiCity, setIsMultiCity] = useState(false);

  const [from, setFrom] = useState(true);
  const [to, setTo] = useState(false);
  const [departure, setDeparture] = useState(false);
  const [returnTo, setReturnTo] = useState(true);
  const [passengers, setPassengers] = useState(false);
  const [classType, setClassType] = useState(false);

  const router = useRouter();

  const onSearchFlight = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    router.push("/flights/result");
  };

  const handleClose = () => {
    if (onHide) onHide();
  };

  return (
    <Modal
      contentClassName="border-0"
      scrollable
      centered
      size="lg"
      show={showState}
      onHide={handleClose}
    >
      <Modal.Body className="p-0 p-3 m-0">
        <div className="container p-0">
          <div className="row">
            <div className="col-12">
              <h4>Book Flight</h4>
              <hr />
            </div>

            <div className="d-flex col-12">
              <div className="mb-3 me-3">
                <Form.Check
                  type="radio"
                  checked={isReturn}
                  onChange={() => {
                    setIsReturn(true);
                    setIsOneWay(false);
                    setIsMultiCity(false);
                  }}
                  id="return"
                  label="Return"
                />
              </div>

              <div className="mb-3 me-3">
                <Form.Check
                  type="radio"
                  checked={isOneWay}
                  onChange={() => {
                    setIsReturn(false);
                    setIsOneWay(true);
                    setIsMultiCity(false);
                  }}
                  id="oneWay"
                  label="One Way"
                />
              </div>

              <div className="mb-3 me-3">
                <Form.Check
                  type="radio"
                  checked={isMultiCity}
                  onChange={() => {
                    setIsReturn(false);
                    setIsOneWay(false);
                    setIsMultiCity(true);
                  }}
                  id="multiCity"
                  label="Multi City"
                />
              </div>
            </div>

            {isReturn && (
              <div className="col-12">
                <form onSubmit={onSearchFlight} id="searchForm">
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="from"
                      placeholder="From"
                      onChange={(e) => setFrom(e.target.value)}
                    />

                    <label className="form-label" htmlFor="from">
                      From
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="To"
                      placeholder="To"
                      onChange={(e) => setTo(e.target.value)}
                    />

                    <label className="form-label" htmlFor="to">
                      To
                    </label>
                  </div>

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

                  <div className="form-floating mb-4">
                    <input
                      type="date"
                      required
                      className="form-control cus-form-control"
                      id="return"
                      placeholder="Return"
                      onChange={(e) => setReturnTo(e.target.value)}
                    />

                    <label className="form-label" htmlFor="return">
                      Return
                    </label>
                  </div>

                  <select
                    className="form-select cus-form-control mb-4"
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option disabled>Passengers</option>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                  </select>

                  <select
                    className="form-select cus-form-control"
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option disabled>Class</option>
                    <option value="Business">Business</option>
                    <option value="Middle">Middle</option>
                    <option value="Economy">Economy</option>
                  </select>
                </form>
              </div>
            )}

            {isOneWay && (
              <div className="col-12">
                <form onSubmit={onSearchFlight} id="searchForm">
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="from"
                      placeholder="From"
                      onChange={(e) => setFrom(e.target.value)}
                    />

                    <label className="form-label" htmlFor="from">
                      From
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="To"
                      placeholder="To"
                      onChange={(e) => setTo(e.target.value)}
                    />

                    <label className="form-label" htmlFor="to">
                      To
                    </label>
                  </div>

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

                  <select
                    className="form-select cus-form-control mb-4"
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option disabled>Passengers</option>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                  </select>

                  <select
                    className="form-select cus-form-control"
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option disabled>Class</option>
                    <option value="Business">Business</option>
                    <option value="Middle">Middle</option>
                    <option value="Economy">Economy</option>
                  </select>
                </form>
              </div>
            )}

            {isMultiCity && (
              <div className="col-12">
                <form onSubmit={onSearchFlight} id="searchForm">
                  <div className="mb-2 fw-bold">Trip</div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="from"
                      placeholder="From"
                      onChange={(e) => setFrom(e.target.value)}
                    />

                    <label className="form-label" htmlFor="from">
                      From
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="To"
                      placeholder="To"
                      onChange={(e) => setTo(e.target.value)}
                    />

                    <label className="form-label" htmlFor="to">
                      To
                    </label>
                  </div>

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

                  <hr />

                  <div className="mb-2 fw-bold">Trip</div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="from"
                      placeholder="From"
                      onChange={(e) => setFrom(e.target.value)}
                    />

                    <label className="form-label" htmlFor="from">
                      From
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      required
                      className="form-control cus-form-control"
                      id="To"
                      placeholder="To"
                      onChange={(e) => setTo(e.target.value)}
                    />

                    <label className="form-label" htmlFor="to">
                      To
                    </label>
                  </div>

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

                  <hr />

                  <select
                    className="form-select cus-form-control mb-4"
                    onChange={(e) => setPassengers(e.target.value)}
                  >
                    <option disabled>Passengers</option>
                    <option value="Adult">Adult</option>
                    <option value="Child">Child</option>
                  </select>

                  <select
                    className="form-select cus-form-control"
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option disabled>Class</option>
                    <option value="Business">Business</option>
                    <option value="Middle">Middle</option>
                    <option value="Economy">Economy</option>
                  </select>
                </form>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="col-md-12 d-flex justify-content-end border-0 py-2 m-0">
        <button
          type="submit"
          form="searchForm"
          disabled={isLoading}
          className="btn btn-lg btn-primary"
        >
          {isLoading ? <Loader /> : "Search Flights"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlightSearchModal;
