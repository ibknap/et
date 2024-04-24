"use client";

import { ArrowRight2 } from "iconsax-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import logo from "@/public/logos/logo.png";
import onboard1Img from "@/public/images/onboard1.png";
import onboard2Img from "@/public/images/onboard2.png";
import onboard3Img from "@/public/images/onboard3.png";

import Image from "next/image";

const OnBoard = ({ showState, onHide }) => {
  const [show, setShow] = useState(showState);
  const [board, setBoard] = useState(1);

  const handleClose = () => {
    setShow(false);
    if (onHide) onHide();
  };

  return (
    <Modal
      contentClassName="border-0 bg-primary"
      scrollable
      centered
      size="lg"
      show={show}
      backdrop="static"
      onHide={handleClose}
    >
      <Modal.Body className="p-0 p-3 m-0">
        <div className="container p-0">
          <div className="row">
            <div className="col-12 text-white">
              <div className="d-flex justify-content-between">
                <Image
                  src={
                    board === 1
                      ? onboard1Img
                      : board === 2
                      ? onboard2Img
                      : onboard3Img
                  }
                  width={250}
                  height={275}
                  priority
                  alt="onboard"
                  className="rounded-4 object-fit-cover img-responsive"
                />

                <Image
                  src={logo}
                  width={150}
                  priority
                  alt="onboard"
                  className="d-none d-md-block rounded-4 object-fit-cover img-responsive"
                />
              </div>

              {board === 1 ? (
                <>
                  <h1 className="display-6 mt-4">
                    Discover <br /> Your Next Adventure
                  </h1>

                  <p className="text-white fw-light mt-3">
                    Exclusive Travel brings you a world of possibilities. Find
                    and book your perfect flights effortlessly.
                  </p>
                </>
              ) : board === 2 ? (
                <>
                  <h1 className="display-6 mt-4">
                    Effortless <br />
                    Flight Booking
                  </h1>

                  <p className="text-white fw-light mt-3">
                    Our user-friendly interface makes booking flights a breeze.
                    Customize your travel plans with ease.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="display-6 mt-4">
                    Explore <br />
                    Popular Routes
                  </h1>

                  <p className="text-white fw-light mt-3">
                    Discover featured destinations and popular routes tailored
                    to your preferences. Your journey starts here!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="col-md-12 d-flex justify-content-end border-0 p-3 m-0">
        <button
          onClick={() => {
            if (board === 1) {
              setBoard(2);
            } else if (board === 2) {
              setBoard(3);
            } else {
              handleClose();
            }
          }}
          className="btn btn-lg text-white bg-white bg-opacity-25 px-5"
        >
          {board === 1 || board === 2 ? (
            <>
              Next
              <ArrowRight2 size={18} color="#fff" />
            </>
          ) : (
            "Start Your Trip"
          )}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OnBoard;
