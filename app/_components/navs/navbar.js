"use client";

import styles from "@/app/_components/navs/navs.module.css";
import logo from "@/public/logos/logo_long.svg";
import { Menu } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [auth, setAuth] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary pt-3 pb-2 p-0 border-0">
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/" className="navbar-brand">
          <Image src={logo} alt="al gendini!" height={50} priority />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Menu color="white" />
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mx-auto"></ul>

          <div className="d-flex justify-content-center">
            {auth ? (
              <>
                <Link href="#" className={`${styles.btn_danger} me-2`}>
                  Sign Out
                </Link>

                <Link href="/auth/profile" className={styles.btn}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/signup" className={`${styles.btn} me-2`}>
                  Sign Up
                </Link>

                <Link href="/auth/signin" className={styles.btn}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
