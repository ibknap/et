"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash } from "iconsax-react";
import { Modal } from "react-bootstrap";
import Loader from "@/app/_components/loader";

export default function PlaceDetail() {
  const placeId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [gallery, setGallery] = useState(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (placeId !== null) {
      async function getApi() {
        try {
          const res = await fetch("/api/get_place", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              placeId: placeId,
            }),
          });

          const resJson = await res.json();
          const data = resJson.data;

          setPlace(data);
          setIsLoading(false);
        } catch (error) {}
      }

      getApi();
    }
  }, [placeId]);

  return (
    <>
      <Navbar />

      {isLoading && place === null && (
        <div className="col-md-12 mb-5 vh-100 d-flex justify-content-center align-items-center">
          <Loader
            style={{ width: 50, height: 50, borderTop: "3px solid #333" }}
          />
        </div>
      )}

      {!isLoading &&
        place !== null &&
        place !== undefined &&
        place.length === 0 && (
          <div className="col-md-12 mt-3 text-muted text-center">
            <Trash size={100} color="black" variant="Bulk" />
            <p className="mt-4 mb-0">No place yet</p>
          </div>
        )}

      {!isLoading && place !== null && place !== undefined && (
        <div className="container-fluid mb-5 px-md-5">
          <div className="row justify-content-center">
            <div className="col-12 fw-bold px-0">
              <img
                src={
                  place.pictures.length > 0
                    ? place.pictures[0]
                    : "/logos/logo_dark.png"
                }
                alt="image"
                width="100%"
                height="425px"
                className={`img-responsive mb-4 ${
                  place.pictures.length > 0
                    ? "object-fit-cover"
                    : "object-fit-contain"
                }`}
              />

              <h1>{place.name}</h1>
            </div>

            <div
              className={`col-md-8 mt-3 ${
                place.description ? "" : "text-center"
              }`}
            >
              <div className="mb-4">
                <h4>Description</h4>

                {place.description ? (
                  <div className="mt-2">
                    <p
                      className="fw-light"
                      dangerouslySetInnerHTML={{
                        __html: place.description,
                      }}
                    />
                  </div>
                ) : (
                  <Trash size={100} color="black" variant="Bulk" />
                )}
              </div>
            </div>

            <div
              className={`col-12 ${
                place.pictures.length > 0 ? "" : "text-center"
              }`}
            >
              <h4>Gallery Photos</h4>

              {place.pictures.length > 0 ? (
                <div className="row mt-3">
                  {place.pictures.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setGallery(img)}
                      className="col-sm-4 mb-3 pe-active"
                    >
                      <img
                        src={img}
                        width="100%"
                        height={200}
                        alt="image"
                        className="rounded-4 shadow-sm object-fit-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Trash size={100} color="black" variant="Bulk" />
              )}
            </div>

            <div className="col-md-8 mt-3">
              <h4>Location</h4>

              <iframe
                src={`https://maps.google.com/maps?q=${place.geoCode.latitude},${place.geoCode.longitude}&hl=es;&z=14&amp;&output=embed`}
                width="100%"
                height="400"
                className="mt-2 rounded-4"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNavbar />

      {gallery !== null && (
        <Modal
          scrollable
          centered
          show={gallery !== null}
          onHide={() => setGallery(null)}
        >
          <Modal.Body className="p-0 p-3 m-0">
            <div className="container p-0">
              <div className="row">
                <img
                  src={gallery}
                  width="100%"
                  height="100%"
                  alt="image"
                  className="object-fit-cover"
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
