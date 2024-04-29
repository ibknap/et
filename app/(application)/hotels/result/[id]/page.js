"use client";

import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Location } from "iconsax-react";
import Image from "next/image";
import swimmer from "@/public/icons/swimmer.svg";
import wifi from "@/public/icons/wifi.svg";
import utensils from "@/public/icons/utensils.svg";
import park from "@/public/icons/park.svg";
import hotelDark from "@/public/icons/hotel_dark.svg";
import bath from "@/public/icons/bath.svg";
import bed from "@/public/icons/bed.svg";
import door from "@/public/icons/door.svg";
import useEmblaCarousel from "embla-carousel-react";
import { Modal } from "react-bootstrap";

const datas = [
  "https://plus.unsplash.com/premium_photo-1675972399394-9d9033de1d9e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ,
  "https://plus.unsplash.com/premium_photo-1668496902276-5d0ba0728335?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ,
  "https://plus.unsplash.com/premium_photo-1672082422409-879d79636902?q=80&w=3165&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ,
  "https://plus.unsplash.com/premium_photo-1675827055597-2406877d4764?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ,
  "https://plus.unsplash.com/premium_photo-1672055504819-3c87b9865333?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ,
  "https://plus.unsplash.com/premium_photo-1676469292214-2871e2841cbe?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function HotelDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [emblaRef] = useEmblaCarousel();
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="container mb-5 px-md-5">
        <div className="row justify-content-center">
          <div className="col-12 fw-bold px-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1675972399394-9d9033de1d9e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              width="100%"
              height="425px"
              className="object-fit-cover img-responsive mb-4"
            />

            <div className="px-3">
              <h1>Emeralda De Hotel</h1>
              <div>
                <Location /> Rome, Italy
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-3">
            <div>
              <b>Gallery Photos</b>

              <div className="mt-2">
                <div className="embla" ref={emblaRef}>
                  <div className="embla__container">
                    {datas.map((data, index) => (
                      <div
                        key={index}
                        onClick={() => setGallery(data)}
                        className="embla__slide mb-3 pe-active"
                      >
                        <img
                          src={data}
                          width={150}
                          height={100}
                          alt="image"
                          className="rounded-4 shadow-sm object-fit-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <b>Details</b>

              <div className="mt-2 row align-items-center">
                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={hotelDark} priority alt="icon" />
                    Hotels
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={bed} priority alt="icon" />3 Bedrooms
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={bath} priority alt="icon" />2 Bathrooms
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <b>Description</b>

              <div className="mt-2">
                <p>
                  Sed eleifend, urna eget dignissim fringilla, turpis dolor
                  lacinia ante, sit amet feugiat augue ipsum ut sem. Cras
                  ultrices convallis rhoncus. Curabitur imperdiet porttitor
                  velit non imperdiet. Maecenas tristique ut odio id lacinia.
                  Integer sagittis auctor eros sed auctor. Duis ullamcorper,
                  sapien sed fermentum luctus, lectus diam bibendum elit, a
                  sagittis felis metus ac felis. Praesent efficitur eros eget
                  purus suscipit rhoncus. Aliquam in dapibus mauris. Curabitur
                  molestie pellentesque lorem a dictum. Duis et finibus risus,
                  sit amet tempus odio. In hac habitasse platea dictumst. Mauris
                  nec finibus mi. Fusce hendrerit a enim eu interdum.
                  Suspendisse accumsan facilisis euismod. Integer mollis, eros
                  at convallis sagittis, ex augue fringilla elit, vitae
                  sollicitudin eros purus ut neque.
                </p>

                <p>
                  Proin laoreet consectetur urna, pharetra eleifend elit posuere
                  in. Pellentesque tristique, dolor ut rhoncus scelerisque, urna
                  mauris laoreet ipsum, eget vulputate erat purus eu neque.
                  Nullam mattis blandit neque, at congue nisl pretium vitae.
                  Nunc a erat porttitor ipsum tristique interdum. Vestibulum
                  dolor ante, aliquam ac risus et, imperdiet faucibus orci. Sed
                  id ex fermentum, ullamcorper leo convallis, sollicitudin odio.
                  Etiam id urna ante. Nulla laoreet at arcu at malesuada.
                </p>

                <p>
                  Etiam gravida lorem in libero dignissim venenatis. Integer vel
                  lobortis ipsum. Sed eu tellus vel felis vulputate dictum. In
                  orci nisi, dignissim et condimentum id, euismod nec erat. In
                  sit amet orci eget arcu tempus iaculis. Sed et enim vel ex
                  semper vehicula eu ut nisl. In ac velit vulputate tortor
                  cursus tristique. Phasellus lobortis massa consequat erat
                  hendrerit, a ultrices dolor luctus.
                </p>
              </div>
            </div>

            <div className="mt-3">
              <b>Facilities</b>

              <div className="mt-2 row align-items-center">
                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={swimmer} priority alt="icon" />
                    Swimming Pool
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={wifi} priority alt="icon" />
                    WiFi
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={utensils} priority alt="icon" />
                    Restaurant
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={park} priority alt="icon" />
                    Parking
                  </div>
                </div>

                <div className="col-4">
                  <div className="d-flex flex-column text-decoration-none align-items-center mb-3">
                    <Image src={door} priority alt="icon" />
                    Meeting Room
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <b>Location</b>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d190029.11506476684!2d12.371192928506044!3d41.909953277728334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61b6532013ad%3A0x28f1c82e908503c4!2sColosseum!5e0!3m2!1sen!2s!4v1714378224707!5m2!1sen!2s"
                width="100%"
                height="300"
                className="mt-2 rounded-4"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

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
