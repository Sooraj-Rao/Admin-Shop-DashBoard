import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { getData } from "../../Redux/FetchShopDetailSlice";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ViewBill = () => {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);

  const shopId = localStorage.getItem("shopId");

  const fetchBills = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/viewBill/${shopId}`);
      setloader(false);
      res && setdata(res.data);
    } catch (error) {
      setloader(false);
      toast.error("Error Fetching Services");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="mt-5 rounded mx-auto  p-2 mb-10 w-full">
      <div>
        {loader ? (
          <span className=" flex justify-center mt-10">
            <PulseLoader color="white" size={10} />
          </span>
        ) : (
          <div className=" flex flex-wrap">
            {data?.map((item, i) => {
              i += 1;
              return (
                <div
                  className=" mt-4  px-5 rounded-lg mx-auto bg-slate-800 p-3 pl-6 text-xl m-2 space-y-3
                    lg:w-5/12
                    w-full
                    "
                  key={i}
                >
                  <h1>
                    <span>S.No : </span>
                    <span>{i}</span>
                  </h1>
                  <h1>
                    <span>Name : </span>
                    <span>{item.userName}</span>
                  </h1>
                  <h1>
                    <span>Email : </span>
                    <span>{item.userEmail}</span>
                  </h1>
                  <h1>
                    <span>Service : </span>
                    <span>{item.serviceName}</span>
                  </h1>
                  <h1>
                    <span>Vehicle : </span>
                    <span>{item.vehicleType}</span>
                  </h1>
                  <h1>
                    <span>Disocunt : </span>
                    <span>{item.discount} %</span>
                  </h1>
                  <h1>
                    <span>Total : </span>
                    <span>{item.total}</span>
                  </h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        h1eme="light"
      />
    </div>
  );
};

export default ViewBill;
