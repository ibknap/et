"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import hotel from "@/public/icons/hotel_white.svg";
import plane from "@/public/icons/plane_white.svg";
import { Trash } from "iconsax-react";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/loader";
import { getCapitalImage } from "@/app/_utils/capitals";

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

  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [hotels, setHotels] = useState(null);
  const path = usePathname();
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

  const onSearchHotel = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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

              {isLoadingHotels && hotels === null && (
                <div className="col-md-12 mt-3 d-flex justify-content-center">
                  <Loader
                    style={{
                      width: 50,
                      height: 50,
                      borderTop: "3px solid #333",
                    }}
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
                  <div className="col-12">
                    <div className="row mt-5">
                      {hotels.map((hotel, index) => (
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
                )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNavbar />
    </>
  );
}
