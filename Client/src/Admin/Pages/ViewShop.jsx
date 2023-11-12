import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Mycontext, { MyContext } from "../../Context/Context";

const ViewShop = () => {
  const context = useContext(MyContext);
  const { Server } = context;

  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);
  const [deleteId, setdeleteId] = useState("");

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const deleteShopConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const deleteShop = async (id) => {
    try {
      const res = await axios.delete(`${Server}/viewShop/${id}`);
      let { message } = res.data;
      if (message == "Successfully Deleted") {
        toast.success(message);
      } else {
        toast.error(message);
      }
      dispatch(Yes());
      fetch();
    } catch (error) {
      toast.error(message);
      console.log(error);
      dispatch(Yes());
    }
  };

  const fetch = async () => {
    setload(true);
    const res = await axios.get(`${Server}/viewShop`);
    setdata(res.data);
    setload(false);
  };

  useEffect(() => {
    IsYes && deleteShop(deleteId);
    !IsYes && fetch();
  }, [IsYes]);

  return (
    <div className="    w-4/5 mx-auto ">
      <h1 className=" text-center font-semibold text-2xl py-3">Shops</h1>

      <hr className=" mt-2" />
      {load ? (
        <span className=" flex justify-center  mt-20">
          {" "}
          <PulseLoader color="white" size={10} />
        </span>
      ) : (
        <div className="mt-4  flex flex-wrap justify-center ">
          {data.map((item, index) => {
            return (
              <div
                className=" text-lg m-5 bg-slate-900 pl-5 py-6 space-y-2 rounded-md
                   w-11/12
                   sm:w-3/5  
                   xl:w-5/12  
                   overflow-x-scroll
                "
                key={index}
              >
                <div className=" text-2xl  text-green-200 pb-4 italic">
                  <span>{item.shopName}</span>
                </div>
                <div>
                  <span>Shop Id : </span>
                  <span>{item._id}</span>
                </div>
                <div>
                  <span> Address : </span>
                  <span> {item.shopAddress}</span>
                </div>
                <div>
                  <span> PinCode : </span>
                  <span> {item.shopPincode}</span>
                </div>
                <div>
                  <span>Owner Email : </span>
                  <span> {item.shopEmail}</span>
                </div>
                <div>
                  <button onClick={() => deleteShopConfirm(item._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1600}
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

export default ViewShop;
