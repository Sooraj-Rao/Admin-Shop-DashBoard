import React, { useState } from "react";

const NavTop = ({ setNavshow, Navshow, SlideLogout, setSlideLogout }) => {
  const Logout = () => {
    let Sure = confirm("Are You Sure ?");
    if (Sure) {
      localStorage.setItem("shop", false);
      window.location.href = "/";
    } else {
      setSlideLogout(!SlideLogout);
      return;
    }
  };
  SlideLogout && Logout();

  return (
    <div
      className=" sticky top-0 z-20 h-20  bg-slate-900 py-4 flex justify-between items-center w-screen px-5
    lg:px-10
    "
    >
      <h1
        className=" text-3xl font-bold text-blue-400 shadow-lg
      md:text-4xl
      "
      >
        Find My Mechanic
      </h1>
      <h2 className=" lg:hidden flex" onClick={() => setNavshow(!Navshow)}>
        {Navshow ? (
          <span className=" text-2xl ">
            <i className="fa-solid fa-x"></i>
          </span>
        ) : (
          <span className=" text-2xl ">
            <i className="fa-solid fa-bars"></i>
          </span>
        )}
      </h2>
      <h2
        onClick={Logout}
        className="
      Logout bg-slate-100 text-black cursor-pointer font-bold  justify-center items-center px-4 py-2 text-lg rounded-2xl
      lg:flex
      hidden
      "
      >
        Logout
      </h2>
    </div>
  );
};

export default NavTop;
