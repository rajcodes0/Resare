import React from "react";
import Plane from "../assets/plane.png";
import Upload from "./Upload";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div className="grid grid-cols-2 md:flex md:flex-col-reverse">
        <div className="m-30">
          <h1 className="font-bold text-3xl">Hey there Fellow Earthlings</h1>{" "}
          <p className="font-stretch-50% text-xl ">
            {" "}
            Share your files to the users or students to unlock Potential{" "}
          </p>
          <br />
          <Link
            to="/Login"
            className="text-xl p-4 m-2 bg-sky-500 rounded-2xl mt-10 hover:text-white hover:opacity-80"
          >
            Get Started
          </Link>
        </div>
        <div className="m-10">
          <img src={Plane} className="h-full w-full" alt="plane" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-100">
        {" "}
        <h1 className="text-center text-4xl  font-bold">
          {" "}
          Share your stuff - under 25MB{" "}
        </h1>
        <Upload className=" flex flex-col mt-10 text-black" />
        <span className="text-red-300 mt-3 text-xl text-bold">
          Files can be img ,pdf, and zip but not videos you can offer Links too
          ...
        </span>
      </div>
    </>
  );
}

export default Home;
