import React, { useState } from "react";
import NavTop from "./Shop/Components/NavTop";
import { Navbar, NavbarSide } from "./Shop/Components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Shop/Pages/Dashboard";
import AddMessage from "./Shop/Pages/AddMessage";
import ViewFeedback from "./Shop/Pages/ViewFeedback";
import ViewRequest from "./Shop/Pages/ViewRequest";
import AddService from "./Shop/Pages/AddService";
import ManageShop from "./Shop/Pages/ManageShop";
import { useDispatch, useSelector } from "react-redux";
import AreYouSure from "./Admin/Pages/AreYouSure";
import BillGeneration from "./Admin/Components/BillGeneration";
import ViewBill from "./Admin/Pages/ViewBill";

const Shop = () => {
  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const [Navshow, setNavshow] = useState(false);
  const [SlideLogout, setSlideLogout] = useState(false);

  const [requestInfo, setrequestInfo] = useState();

  const Info = (item) => {
    setrequestInfo(item);
  };

  return (
    <div>
      <Router>
        <NavTop
          setNavshow={setNavshow}
          Navshow={Navshow}
          SlideLogout={SlideLogout}
          setSlideLogout={setSlideLogout}
        />
        <div className=" flex">
          <Navbar />
          {IsShow ? <AreYouSure /> : ""}
          {requestInfo && (
            <BillGeneration
              requestInfo={requestInfo}
              setrequestInfo={setrequestInfo}
            />
          )}
  
          <NavbarSide Navshow={Navshow} SlideLogout={SlideLogout} setSlideLogout={setSlideLogout}/>
          <div className=" 2xl:w-5/6 lg:w-4/5 overflow-hidden ">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/addMessage" element={<AddMessage />} />
            <Route path="/addService" element={<AddService />} />
            <Route path="/viewFeedback" element={<ViewFeedback />} />
            <Route path="/manageShop" element={<ManageShop Info={Info} />} />
            <Route path="/viewBill" element={<ViewBill />} />
            <Route path="/viewRequest" element={<ViewRequest Info={Info} />} />
          </Routes>
      </div>
        </div>
      </Router>
    </div>
  );
};

export default Shop;
