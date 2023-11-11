import React, { useState } from "react";
import NavTop from "./Admin/Components/NavTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Admin/Pages/Dashboard";
import AddMessage from "./Admin/Pages/AddMessage";
import ViewFeedback from "./Admin/Pages/ViewFeedback";
import ViewUser from "./Admin/Pages/ViewUser";
import ViewShop from "./Admin/Pages/ViewShop";
import AddShop from "./Admin/Pages/AddShop";
import AreYouSure from "./Admin/Pages/AreYouSure";
import { show } from "./Redux/AreYouSureSlice";
import { Yes } from "./Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Navbar,NavbarSide } from "./Admin/Components/Navbar";

const Admin = () => {
  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);
const dispatch = useDispatch();
  const [Navshow, setNavshow] = useState(false);
  const [SlideLogout, setSlideLogout] = useState(false);

  return (
    <div>
      <Router>
        <NavTop setNavshow={setNavshow} Navshow={Navshow} SlideLogout={SlideLogout} setSlideLogout={setSlideLogout} />
      
        <div className=" flex">
          <Navbar />
          {IsShow ? <AreYouSure /> : ""}
         
          <NavbarSide Navshow={Navshow} SlideLogout={SlideLogout} setSlideLogout={setSlideLogout}/>
        
          <div className=" 2xl:w-5/6 lg:w-4/5 overflow-hidden ">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addMessage" element={<AddMessage />} />
              <Route path="/addShop" element={<AddShop />} />
              <Route path="/viewFeedback" element={<ViewFeedback />} />
              <Route path="/viewShop" element={<ViewShop />} />
              <Route path="/viewUser" element={<ViewUser />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Admin;
