import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getData } from "../../Redux/FetchShopDetailSlice";

const ManageShop = () => {
  const dispatch = useDispatch();
  const [click, setclick] = useState(false);

  const ShopDetails = useSelector((state) => state.shopData);

  useEffect(() => {
    dispatch(getData());
  }, []);

  let data = ShopDetails.data[0];

  const Update = () => {
    setclick(true);
    console.log(data);
  };

  return (
    <div
      className="
    lg:mx-0
      lg:w-full
    w-screen
    "
    >
      <h1 className=" text-center font-semibold text-2xl pb-3 mt-4 ">
        View Profile
      </h1>
      <div
        className=" flex text-center justify-center bg-slate-700 mx-auto
        xl:w-1/2
        lg:w-2/3
        w-full
      "
      >
        <div className=" flex flex-col w-2/4 gap-5 bg-slate-700 h-fit py-2  mt-4 text-lg">
          <h1> Name</h1>
          <h1> Address</h1>
          <h1> Pincode</h1>
          <h1> Owner</h1>
          <h1>Password</h1>
        </div>
        <div className="hai  flex flex-col w-2/4 gap-5 bg-slate-700 h-fit py-2  mt-4 text-lg">
          <h1 style={{ backgroundColor: click && "rgb(32, 43, 59)" }}>
            {data?.shopName}
          </h1>
          <h1 style={{ backgroundColor: click && "rgb(32, 43, 59)" }}>
            {data?.shopAddress}
          </h1>
          <h1 style={{ backgroundColor: click && "rgb(32, 43, 59)" }}>
            {data?.shopPincode}
          </h1>
          <h1 style={{ backgroundColor: click && "rgb(32, 43, 59)" }}>
            {data?.shopEmail}
          </h1>
          <h1 style={{ backgroundColor: click && "rgb(32, 43, 59)" }}>
            {data?.password}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ManageShop;
