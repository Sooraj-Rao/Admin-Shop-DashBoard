import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" sticky left-0 top-0  Navbar h-[90vh]  bg-slate-300 font-bold 2xl:w-1/6 xl:w-1/5 w-[20rem]  hidden md:hidden sm:hidden lg:flex  xl:flex 2xl:flex flex-col text-xl items-center gap-7 pt-6 text-black">
      <Link to={"/"}>
        <h1>Dashboard</h1>
      </Link>
      <Link to={"/addShop"}>
        <h1>Add Shop</h1>
      </Link>
      <Link to={"/viewShop"}>
        <h1>View Shop</h1>
      </Link>
      <Link to={"/viewUser"}>
        <h1>View Users</h1>
      </Link>
      <Link to={"/viewFeedback"}>
        <h1>View Feedback</h1>
      </Link>
      <Link to={"/addMessage"}>
        <h1>Add Message</h1>
      </Link>
    </div>
  );
};

export { Navbar };

const NavbarSide = ({ Navshow,setSlideLogout,SlideLogout }) => {
  return (
    <div
      className={`duration-300 z-50 overflow-hidden h-screen bg-slate-950 fixed right-0 
    ${Navshow ? `w-4/6` : `w-0`}
    ${Navshow && `sm:w-1/2 `}
    `}
    >
      <div
        className={`flex flex-col items-center justify-evenly  h-2/3 whitespace-nowrap
      text-xl
      md:text-2xl`}
      >
        <Link to={"/"}>
          <h1>Dashboard</h1>
        </Link>
        <Link to={"/addShop"}>
          <h1>Add Shop</h1>
        </Link>
        <Link to={"/viewShop"}>
          <h1>View Shop</h1>
        </Link>
        <Link to={"/viewUser"}>
          <h1>View Users</h1>
        </Link>
        <Link to={"/viewFeedback"}>
          <h1>View Feedback</h1>
        </Link>
        <Link to={"/addMessage"}>
          <h1>Add Message</h1>
        </Link>
          <h1 className=" bg-slate-800 px-3 py-2 rounded-lg" onClick={()=>setSlideLogout(!SlideLogout)}>Logout</h1>
      </div>
    </div>
  );
};

export { NavbarSide };
