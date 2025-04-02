"use client";

import Image from "next/image";
import logo from "@/public/logos/logo_dark.svg";
import change from "@/public/icons/change.svg";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";

const FlightContainer = () => {
  const [emblaRef] = useEmblaCarousel();
  const router = useRouter();

  return (
    <main className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Flight Deals</h2>
          </div>

          <div className="col-12 mt-3">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {[1, 2, 3, 4, 5, 6].map((e) => (
                  <div key={e} className="embla__slide mb-3">
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
                          <span className="fw-light">Qatar Airways</span>
                        </div>

                        <span className="fw-bold">$618</span>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between">
                        <h6 className="fw-bold">New York</h6>
                        <Image
                          src={change}
                          priority
                          alt="change"
                          className="img-responsive"
                        />
                        <h6 className="fw-bold">Abu Dhabi</h6>
                      </div>

                      <small className="fw-light">
                        Wed, Jan 31 - Sat, Feb 3
                      </small>
                      <small className="fw-light">Economy</small>

                      <div className="d-flex justify-content-end">
                        <button
                          onClick={() => {
                            router.push(`/flights/result/${e}`);
                          }}
                          className="bg-primary border-0 rounded text-white w-auto mt-3 px-3 py-1"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FlightContainer;
