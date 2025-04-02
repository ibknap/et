"use client";

import { useState } from "react";
import Loader from "@/app/_components/loader";
import { Form, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";

const FlightSearchModal = ({ showState, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReturn, setIsReturn] = useState(true);
  const router = useRouter();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [returning, setReturning] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [classType, setClassType] = useState("ECONOMY");

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
      <Modal.Body className="p-3 pb-0 m-0">
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
                </div>

                <div className="col-sm-6">
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
      </Modal.Body>

      <Modal.Footer className="col-md-12 d-flex justify-content-center border-0 py-2 m-0">
        <button
          type="submit"
          form="searchForm"
          disabled={isLoading}
          className="btn btn-lg btn-primary w-100"
        >
          {isLoading ? <Loader /> : "Search Flights"}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FlightSearchModal;
