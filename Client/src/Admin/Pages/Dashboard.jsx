import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Mycontext, { MyContext } from "../../Context/Context";

const Dashboard = () => {
  const [data, setdata] = useState([]);
  const [loader, setloader] = useState(true);

  const context = useContext(MyContext);
  const { Server } = context;

  useEffect(() => {
    try {
      fetch = async () => {
        const res = await axios.get(`${Server}/dashboard`);
        setdata(res.data);
        setloader(false);
      };
    } catch (error) {
      setloader(false);
      console.log(error);
    }
    fetch();
  }, []);

  let datas = [
    {
      text: "Total  Users",
      number: data?.UserLength,
      class: <i className="fa-solid fa-user"></i>,
    },
    {
      text: "Total Shops",
      number: data?.ShopLength,
      class: <i className="fa-solid fa-shop"></i>,
    },
    {
      text: " Feedbacks Recieved",
      number: data?.ContactsLength,
      class: <i className="fa-solid fa-comments"></i>,
    },
    {
      text: " Messages Sent",
      number: data?.MessageLength,
      class: <i className="fa-solid fa-message"></i>,
    },
  ];
  return (
    <div
      className=" 
    gap-8 mx-auto p-10 text-white text-center  bg-slate-800 flex
    flex-wrap 
    lg:h-[90vh]
    md:h-[90vh]
    sm:h-screen
    h-fit
    lg:w-full
    w-screen
    "
    >
      {datas.map((item, index) => (
        <div
          className="rounded-3xl mx-auto shadow-[0px_0px_20px_-4px] shadow-slate-400 hover:scale-[1.04] transition duration-150 bg-black
          md:w-1/3
          sm:w-2/4 
          w-80
          lg:w-2/5
          xl:w-2/6 
          pb-3
          "
          key={index}
        >
          <h1 className=" font-semibold xl:text-2xl lg:text-2xl my-5">
            {item.text}
          </h1>
          <span className=" text-5xl font-bold">
            {loader ? <PulseLoader color="white" size={10} /> : item.number}
          </span>
          <br />
          <div className=" mt-10">
            <span className=" text-5xl text-blue-600">{item.class}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
