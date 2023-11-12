import React, { useContext, useMemo, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import Mycontext from "../../Context/Context";

const BillGeneration = ({ requestInfo, setrequestInfo }) => {
  const [discount, setDisocunt] = useState(0);
  const [total, settotal] = useState(0);

  const context = useContext(Mycontext);
  const Server = context;

  const handleChange = (e) => {
    setDisocunt(e.target.value);
  };
  useMemo(() => {
    if (discount < 99 && discount >= 0) {
      const value =
        requestInfo.serviceCost - (requestInfo.serviceCost * discount) / 100;
      value <= requestInfo.serviceCost && settotal(value.toFixed(2));
    }
  }, [discount]);

  const Generate = async () => {
    let data = {
      ...requestInfo,
      discount: parseInt(discount),
      total: parseInt(total),
    };
    console.log(data);
    try {
      const res = await axios.post(`${Server}/bill`, data);
      toast.success(res.data.message);
      setrequestInfo("");
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  return (
    <div className=" bg-slate-800 w-[80%] right-0 min-h-screen z-10 absolute">
      <div className=" flex justify-center">
        <h1 className=" text-center text-2xl mt-3">Bill Generation</h1>
        <span
          className=" absolute right-3 top-5 bg-red-700 px-2 rounded cursor-pointer"
          onClick={() => setrequestInfo("")}
        >
          Cancel
        </span>
      </div>
      <div className=" mt-5 bg-zinc-900 h-screen">
        <h1 className=" text-center font-semibold text-4xl italic py-2 text-blue-300">
          FindMyMechanic
        </h1>

        <h2 className=" text-center text-2xl">{requestInfo.shopName}</h2>

        <div className="px-10 mt-10 text-xl flex w-1/2 justify-between ">
          <div className=" flex-col flex gap-4">
            <h1>
              <span>Name</span>
            </h1>
            <h1>
              <span>Email</span>
            </h1>
            <h1>
              <span>Phone</span>
            </h1>
            <h1>
              <span>Service</span>
            </h1>
            <h1>
              <span>Vehcile </span>
            </h1>
            <h1>
              <span>Amount </span>
            </h1>
            <h1>discount (%)</h1>
          </div>
          <div className=" flex-col flex gap-4">
            <h1>{requestInfo.userName}</h1>
            <h1>{requestInfo.userEmail}</h1>
            <h1>{requestInfo.userPhone}</h1>
            <h1>{requestInfo.serviceName}</h1>
            <h1>{requestInfo.vehicleType}</h1>
            <h1>{requestInfo.serviceCost}</h1>
            <input
              min={0}
              max={99}
              maxLength={3}
              type="number"
              value={discount}
              placeholder="0"
              onChange={handleChange}
              className=" w-16 outline-none"
            />
          </div>
        </div>
        <hr className=" mt-5 bg-red-500" />
        <h1 className=" px-10 pt-5 text-2xl">total Amount</h1>
        <span className=" px-10 text-xl">
          Rs. {discount.length > 0 ? total : requestInfo.serviceCost}
        </span>
        <br />
        <button
          onClick={Generate}
          className=" bg-blue-600 absolute left-1/2 p-2 text-xl rounded hover:bg-blue-700"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default BillGeneration;
