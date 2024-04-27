"use client";

import { useMediaQuery } from "@chakra-ui/react";
import styles from "@/app/_components/navs/navs.module.css";
import flight from "@/public/icons/flight.svg";
import flightActive from "@/public/icons/flight_active.svg";
import home from "@/public/icons/home.svg";
import homeActive from "@/public/icons/home_active.svg";
import hotel from "@/public/icons/hotel.svg";
import hotelActive from "@/public/icons/hotel_active.svg";
import profile from "@/public/icons/profile.svg";
import profileActive from "@/public/icons/profile_active.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const path = usePathname();

  if (!isMobile) return <></>;

  return (
    <nav
      className={`${styles.bg_bottom} navbar navbar-expand-md navbar-dark fixed-bottom pt-3 pb-2`}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          href="/"
          className={`d-flex flex-column text-decoration-none align-items-center ${
            path === "/" ? styles.text_bottom_active : styles.text_bottom
          }`}
        >
          <Image src={path === "/" ? homeActive : home} priority alt="home" />
          Home
        </Link>

        <Link
          href="/flights"
          className={`d-flex flex-column text-decoration-none align-items-center ${
            path.includes("flights")
              ? styles.text_bottom_active
              : styles.text_bottom
          }`}
        >
          <Image
            src={path.includes("flights") ? flightActive : flight}
            priority
            alt="flight"
          />
          Flight
        </Link>

        <Link
          href="/hotels"
          className={`d-flex flex-column text-decoration-none align-items-center ${
            path.includes("hotels")
              ? styles.text_bottom_active
              : styles.text_bottom
          }`}
        >
          <Image
            src={path.includes("hotels") ? hotelActive : hotel}
            priority
            alt="hotel"
          />
          Hotel
        </Link>

        <Link
          href="/auth/profile"
          className={`d-flex flex-column text-decoration-none align-items-center ${
            path.includes("profile")
              ? styles.text_bottom_active
              : styles.text_bottom
          }`}
        >
          <Image
            src={path.includes("profile") ? profileActive : profile}
            priority
            alt="profile"
          />
          Profile
        </Link>
      </div>
    </nav>
  );
}
