import Image from "next/image";
import logo from "@/public/logos/logo_loader.svg";

const Loading = () => (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="row">
      <div className="col-12 text-center">
        <Image src={logo} width={50} priority alt="logo" />
      </div>
    </div>
  </div>
);

export default Loading;
