"use client";

import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import { Star1 } from "iconsax-react";
import Image from "next/image";

const datas = [
  {
    title: "Emeralda De Hotel",
    subtitle: "Rome, Italy",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1675972399394-9d9033de1d9e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Ritz-Carlton",
    subtitle: "Tokyo",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1668496902276-5d0ba0728335?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Plaza Hotel",
    subtitle: "New York City",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Hotel Bel-Air",
    subtitle: "California",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1675827055597-2406877d4764?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "The Savoy",
    subtitle: "England",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1672055504819-3c87b9865333?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mandarin Oriental",
    subtitle: "Bangkok",
    price: "29",
    rating: "4.8",
    img: "https://plus.unsplash.com/premium_photo-1676469292214-2871e2841cbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const HotelContainer = () => {
  const [emblaRef] = useEmblaCarousel();
  const router = useRouter();

  return (
    <main className="my-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Book Hotel</h2>
          </div>

          <div className="col-12 mt-3">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container">
                {datas.map((data, index) => (
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
                        src={data.img}
                        alt={data.title}
                        className="w-100 card rounded-4 shadow-sm object-fit-cover position-relative"
                        style={{ width: "100%", height: 400, zIndex: -1 }}
                      />

                      <div
                        style={{ zIndex: 1 }}
                        className="px-3 py-2 m-3 d-flex align-items-center position-absolute top-0 text-white bg-primary rounded-pill"
                      >
                        <Star1 variant="Bold" color="#fff" className="me-2" />{" "}
                        {data.rating}
                      </div>

                      <div
                        style={{ zIndex: 1 }}
                        className="p-3 position-absolute bottom-0 text-white"
                      >
                        <h5 className="fw-bold text-white">{data.title}</h5>
                        <p className="fw-light text-white">{data.subtitle}</p>

                        <div className="d-flex text-white">
                          <h4>${data.price}</h4> / per night
                        </div>
                      </div>

                      <div className="img-gradient rounded-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h2>Stay At</h2>
          </div>

          {datas.map((data, index) => (
            <div
              key={index}
              onClick={() => {
                router.push(`/hotels/result/${index}`);
              }}
              className="col-md-4"
            >
              <div
                className="p-3 mb-3 rounded-4 pe-active d-flex justify-content-between"
                style={{ background: "#EAF1F8" }}
              >
                <img
                  src={data.img}
                  alt={data.title}
                  width="100px"
                  height="100px"
                  style={{ minWidth: "100px", minHeight: "100px" }}
                  className="rounded-4 object-fit-cover me-4"
                />

                <div className="w-100 flex-column d-flex justify-content-between">
                  <div className="d-flex justify-content-end">
                    <h4>${data.price}</h4> / per night
                  </div>

                  <h4>{data.title}</h4>
                  <p>{data.subtitle}</p>

                  <div className="d-flex">
                    <Star1 variant="Bold" color="#FFB803" className="me-2" />{" "}
                    {data.rating}
                  </div>
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
