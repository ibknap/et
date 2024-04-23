"use client";

import logo from "@/public/logos/logo.svg";
import logoWhite from "@/public/logos/logo_white.svg";
import Image from "next/image";

const Loader = ({
  size = 24,
  color = "white",
  isAwait = false,
  fullHeight = false,
  className = "",
  style = {},
}) => {
  if (fullHeight) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Image
          src={color === "white" ? logoWhite : logo}
          width={size}
          priority={true}
          alt="logo"
          className="loader-img"
          style={style}
        />
      </div>
    );
  } else {
    return isAwait ? (
      <div className="loader-await" />
    ) : (
      <div className={`loader ${className}`} style={style} />
    );
  }
};

export default Loader;
