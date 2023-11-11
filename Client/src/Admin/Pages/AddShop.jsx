import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";

const AddShop = () => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [input, setinput] = useState({
    shopName: "",
    shopAddress: "",
    shopPincode: "",
    shopEmail: "",
    shopImage: "",
    password: "",
  });

  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phone = Number(input.phone);
    try {
      setloader(true);
      const res = await axios.post("http://localhost:3000/addShop", {
        ...input,
        phone,
      });

      if (res.data.message !== "Successfully Added Shop") {
        setloader(false);
        return toast.info(res.data.message);
      } else {
        toast.success(res.data.message);
        setloader(false);
        setinput({
          shopName: "",
          shopAddress: "",
          shopImage: "",
          shopEmail: "",
          shopPincode: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/viewShop");
        }, 4000);
      }
    } catch (error) {
      setloader(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div
      className="  mx-auto h-[40rem]
    w-screen
    lg:w-3/4 
    ">
      <h2 className="text-center text-2xl mt-3">Add a Shop</h2>

      <form
        onSubmit={handleSubmit}
        className=" flex  flex-col w-2/3 mx-auto mt-7 text-lg justify-between h-4/5
        lg:w-2/3
        2xl:w-1/2
        md:w-1/2
        "
      >
        <label>Shop Name</label>
        <input
          value={input.shopName}
          onChange={handlechange}
          type="text"
          name="shopName"
        />
        <label>Shop Address</label>
        <input
          value={input.shopAddress}
          onChange={handlechange}
          type="text"
          name="shopAddress"
        />
        <label>Shop Pincode</label>
        <input
          value={input.shopPincode}
          onChange={handlechange}
          type="text"
          name="shopPincode"
        />
        <label>Shop Owner Email</label>
        <input
          value={input.shopOwnerEmail}
          onChange={handlechange}
          type="text"
          name="shopEmail"
        />
        <label>Shop Image</label>
        <input
          value={input.shopImage}
          onChange={handlechange}
          type="file"
          name="shopImage"
          className="  text-white border p-[1.6px] cursor-pointer"
        />
        <label>Shop Password</label>
        <input
          value={input.password}
          onChange={handlechange}
          type="text"
          name="password"
        />
        <button className=" w-1/2 mx-auto bg-blue-400 py-2 mt-3 rounded-lg text-black font-bold">
          {loader ? <PulseLoader color="white" size={10} /> : "Submit"}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AddShop;
