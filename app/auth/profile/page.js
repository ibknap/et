"use client";

import Image from "next/image";
import profileImg from "@/public/images/profile.png";
import edit from "@/public/icons/edit.svg";
import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import { useState } from "react";
import Loader from "@/app/_components/loader";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(firstName, lastName, dob, email, phoneNumber, gender);
  };

  const onUpdateAvatar = () => {
    setIsAvatarLoading(true);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-4 px-4 px-md-0 text-center">
            <div className="d-flex justify-content-center">
              <div
                className="position-relative"
                style={{ width: 112, height: 112 }}
              >
                <Image
                  src={profileImg}
                  width={112}
                  height={112}
                  priority
                  alt="profile"
                  className="rounded-circle object-fit-cover"
                />

                {isAvatarLoading ? (
                  <Loader className="position-absolute bottom-0 end-0" />
                ) : (
                  <button
                    type="button"
                    className="transparent border-0 position-absolute bottom-0 end-0"
                    onClick={() => onUpdateAvatar()}
                  >
                    <Image src={edit} priority alt="edit" />
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={onUpdateProfile}>
              <div className="form-floating mb-4 mt-5">
                <input
                  type="text"
                  required
                  className="form-control cus-form-control"
                  id="firstName"
                  placeholder="john"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="text"
                  required
                  className="form-control cus-form-control"
                  id="lastName"
                  placeholder="john"
                  onChange={(e) => setLastName(e.target.value)}
                />

                <label className="form-label" htmlFor="lastName">
                  First Name
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="date"
                  required
                  className="form-control cus-form-control"
                  id="dob"
                  placeholder="john"
                  onChange={(e) => setDob(e.target.value)}
                />

                <label className="form-label" htmlFor="dob">
                  Date Of Birth
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="email"
                  required
                  className="form-control cus-form-control"
                  id="email"
                  placeholder="example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="tel"
                  required
                  className="form-control cus-form-control"
                  id="phoneNumber"
                  placeholder="john"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label className="form-label" htmlFor="phoneNumber">
                  Phone Number
                </label>
              </div>

              <select
                className="form-select cus-form-control mb-5"
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-lg btn-primary mx-auto w-100"
              >
                {isLoading ? <Loader /> : "Confirm"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
