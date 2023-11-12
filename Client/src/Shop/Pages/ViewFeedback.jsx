import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../Context/Context";

const ViewFeedback = () => {
  const [data, setdata] = useState([]);
  const shopId = localStorage.getItem("shopId");

  const context = useContext(MyContext);
  const { Server } = context;

  const fetchMessage = async () => {
    try {
      const res = await axios.get(
        `${Server}/viewMessage/${shopId}`
      );
      setdata(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <div
        className=" 
      lg:w-full
      w-screen
      "
      >
        <h1 className=" text-center font-semibold text-2xl pb-3">
          User Feeback
        </h1>
        <div className=" flex flex-col">
          {data.map((item, i) => {
            i += 1;
            return (
              <div
                className=" lg:w-3/5 w-4/5 mx-auto mt-4 p-4 bg-slate-800 rounded-md  "
                key={i}
              >
                <h1>
                  <span>S.No : </span>
                  <span>{i}</span>
                </h1>
                <h1>
                  <span>Email : </span>
                  <span>{item.userEmail}</span>
                </h1>

                <h1>
                  <span>Message : </span>
                  <span>{item.message}</span>
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewFeedback;
