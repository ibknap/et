"use client";

import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { SearchNormal1, Star1, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import Loader from "@/app/_components/loader";
import { getCapitalImage } from "@/app/_utils/capitals";

const HotelContainer = () => {
  const [emblaRef] = useEmblaCarousel();
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [hotels, setHotels] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (hotels === null) {
      async function getApi() {
        try {
          const res = await fetch("/api/get_hotels", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const resJson = await res.json();
          const data = resJson.data;

          setHotels(data);
          setIsLoadingHotels(false);
        } catch (error) {
          console.error("Error getting hotels:", error);
        }
      }

      getApi();
    }
  }, [hotels]);

  return (
    <main className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Book Hotel</h2>
          </div>

          {isLoadingHotels && hotels === null && (
            <div className="col-md-12 mt-3 d-flex justify-content-center">
              <Loader
                style={{ width: 50, height: 50, borderTop: "3px solid #333" }}
              />
            </div>
          )}

          {!isLoadingHotels &&
            hotels !== null &&
            hotels !== undefined &&
            hotels.length === 0 && (
              <div className="col-md-12 mt-3 text-muted text-center">
                <Trash size={100} color="black" variant="Bulk" />
                <p className="mt-4 mb-0">No hotels yet</p>
              </div>
            )}

          {!isLoadingHotels &&
            hotels !== null &&
            hotels !== undefined &&
            hotels.length > 0 && (
              <div className="col-12 mt-3">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {hotels.slice(0, 10).map((hotel, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          router.push(`/hotels/result/${index}`);
                        }}
                        className="embla__slide__3 mb-3 pe-active"
                      >
                        <div
                          className="position-relative"
                          style={{ width: "100%", height: 400 }}
                        >
                          <img
                            src={getCapitalImage(hotel.address.countryCode)}
                            alt={hotel.name}
                            className="w-100 card rounded-4 shadow-sm object-fit-cover position-relative"
                            style={{ width: "100%", height: 400, zIndex: -1 }}
                          />

                          <div
                            style={{ zIndex: 1 }}
                            className="px-3 py-2 m-3 d-flex align-items-center position-absolute top-0 text-white bg-primary rounded-pill"
                          >
                            <Star1 variant="Bold" color="#fff" />
                          </div>

                          <div
                            style={{ zIndex: 1 }}
                            className="p-3 position-absolute bottom-0 text-white"
                          >
                            <h5 className="fw-bold text-white">{hotel.name}</h5>
                            <p className="fw-light text-white">
                              {hotel.address.cityName}
                            </p>
                          </div>

                          <div className="img-gradient rounded-4" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
        </div>

        <section className="row mt-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div
                  onClick={() => router.push("/hotels")}
                  className="shadow d-flex justify-content-between form-control cus-form-control border border-3 border-warning pe-active"
                >
                  <span className="fw-light">Search For Hotels</span>
                  <SearchNormal1 />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="row mt-5">
          <div className="col-12">
            <h2>Stay At</h2>
          </div>

          {!isLoadingHotels &&
            hotels !== null &&
            hotels !== undefined &&
            hotels.length > 0 &&
            hotels.slice(-10).map((hotel, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push(`/hotels/result/${index}`);
                }}
                className="col-md-6"
              >
                <div
                  className="p-3 mb-3 rounded-4 pe-active d-flex justify-content-between align-items-center"
                  style={{ background: "#EAF1F8" }}
                >
                  <img
                    src={getCapitalImage(hotel.address.countryCode)}
                    alt={hotel.name}
                    width="250px"
                    height="150px"
                    style={{ minWidth: "200px", minHeight: "100px" }}
                    className="rounded-4 object-fit-cover me-4"
                  />

                  <div className="w-100 flex-column d-flex justify-content-between">
                    <h5>{hotel.name}</h5>
                    <p>{hotel.address.cityName}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default HotelContainer;
