"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import hotel from "@/public/icons/hotel_white.svg";
import plane from "@/public/icons/plane_white.svg";
import { Star1 } from "iconsax-react";
import { useRouter } from "next/navigation";

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

export default function Flights() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQ, setSearchQ] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const onSearchHotel = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    router.push("/hotels/result");
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="bg-primary pt-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex">
                  <Link
                    href="/"
                    className={`px-3 py-2 text-decoration-none rounded-pill text-white ${
                      path === "/" ? "bg-white bg-opacity-25" : ""
                    } border border-white me-4`}
                  >
                    <Image src={plane} priority alt="plane" className="me-2" />
                    Flights
                  </Link>

                  <Link
                    href="/hotels"
                    className={`px-3 py-2 text-decoration-none rounded-pill text-white ${
                      path === "/hotels" ? "bg-white bg-opacity-25" : ""
                    } border border-white me-4`}
                  >
                    <Image src={hotel} priority alt="hotel" className="me-2" />
                    Hotels
                  </Link>
                </div>
              </div>

              <div className="col-12 pt-5">
                <h1 className="text-white display-4 fw-bold">Hi Jenna!</h1>

                <p className="text-white fw-light">
                  Where would you like to stay?
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="my-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control cus-form-control"
                    id="search"
                    placeholder="Search For Hotels"
                    onChange={(e) => setSearchQ(e.target.value)}
                  />

                  <label className="form-label" htmlFor="search">
                    Search For Hotels
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="row mt-5">
                  {datas.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/hotels/result/${index}`);
                      }}
                      className="col-md-4"
                    >
                      <div
                        className="p-3 mb-3 rounded-4 pe-active d-flex justify-content-between align-items-center"
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
                            <Star1
                              variant="Bold"
                              color="#FFB803"
                              className="me-2"
                            />{" "}
                            {data.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNavbar />
    </>
  );
}
