"use client";

import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight2, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import Loader from "@/app/_components/loader";
import DOMPurify from "dompurify";

const PlaceContainer = () => {
  const [emblaRef] = useEmblaCarousel();
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);
  const [places, setPlaces] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (places === null) {
      async function getApi() {
        try {
          const res = await fetch("/api/get_places", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const resJson = await res.json();
          const data = resJson.data;

          setPlaces(data);
          setIsLoadingPlaces(false);
        } catch (error) {
          console.error("Error sending email:", error);
        }
      }

      getApi();
    }
  }, [places]);

  return (
    <main className="my-5">
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2>Plan Your Next Trip</h2>
          </div>

          {isLoadingPlaces && places === null && (
            <div className="col-md-12 mt-3 d-flex justify-content-center">
              <Loader
                style={{ width: 50, height: 50, borderTop: "3px solid #333" }}
              />
            </div>
          )}

          {!isLoadingPlaces &&
            places !== null &&
            places !== undefined &&
            places.length === 0 && (
              <div className="col-md-12 mt-3 text-muted text-center">
                <Trash size={100} color="black" variant="Bulk" />
                <p className="mt-4 mb-0">No places yet</p>
              </div>
            )}

          {!isLoadingPlaces &&
            places !== null &&
            places !== undefined &&
            places.length > 0 && (
              <div className="col-12 mt-3">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {[...places]
                      .sort((a, b) => {
                        if (a.pictures.length > 0 && b.pictures.length === 0)
                          return -1;
                        if (a.pictures.length === 0 && b.pictures.length > 0)
                          return 1;
                        return 0;
                      })
                      .map((place, index) => (
                        <div
                          key={index}
                          onClick={() => router.push(`/places/${place.id}/`)}
                          className="embla__slide mb-3 pe-active"
                        >
                          <div className="card rounded-4 border-0 shadow-sm">
                            <img
                              src={
                                place.pictures.length > 0
                                  ? place.pictures[0]
                                  : "/logos/logo_dark.png"
                              }
                              alt={place.name}
                              className={`w-100 rounded-top-4 ${
                                place.pictures.length > 0
                                  ? "object-fit-cover"
                                  : "object-fit-contain"
                              }`}
                              height="200px"
                            />

                            <div className="p-3">
                              <p className="fw-bold">{place.name}</p>

                              <p
                                className="fw-light"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    DOMPurify.sanitize(
                                      place.description
                                    ).substring(0, 100) + "...",
                                }}
                              />

                              <hr />

                              <div className="d-flex justify-content-between align-items-center">
                                <span className="fw-bold">
                                  Find more details
                                </span>
                                <ArrowRight2 />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default PlaceContainer;
