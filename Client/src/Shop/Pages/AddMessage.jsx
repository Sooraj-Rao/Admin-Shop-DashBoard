import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { getData } from "../../Redux/FetchShopDetailSlice";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { MyContext } from "../../Context/Context.jsx";

const AddMessage = () => {
  const [message, setmessage] = useState([]);
  const [loader, setloader] = useState(false);
  const [data, setdata] = useState({
    email: "",
    message: "",
    type: "shop",
  });
  const [deleteId, setdeleteId] = useState();

  const context = useContext(MyContext);
  const { Server } = context;
  const dispatch = useDispatch();
  const ShopDetails = useSelector((state) => state.shopData);

  const AddMessage = async (e) => {
    e.preventDefault();
    try {
      setloader(true);
      const res = await axios.post(`${Server}/ShopAddMessage`, data);
      res.data.message !== "Message Added"
        ? toast.info(res.data.message)
        : toast.success(res.data.message);
      setloader(false);
      fetchMessage();
      setdata({ ...data, message: "" });
    } catch (error) {
      setloader(false);
      toast.error("Error occured addMessage");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    ShopDetails.data.length == 0 && dispatch(getData());
    ShopDetails.data.length > 0 &&
      setdata({ ...data, email: ShopDetails.data[0].shopEmail });
  };

  useEffect(() => {
    fetchData();
    fetchMessage();
  }, [ShopDetails.data.length == 1, data.email.length > 0]);

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const deleteMessageConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const deleteMessage = async (deleteId) => {
    try {
      const res = await axios.delete(`${Server}/shopAddMessage/${deleteId}`);
      let { message } = res.data;
      if (message == "Successfully Deleted") {
        toast.success(message);
      } else {
        toast.error(message);
      }
      dispatch(Yes());
    } catch (error) {
      toast.error(message);
      console.log(error);
      dispatch(Yes());
    }
  };

  const fetchMessage = async () => {
    if (data.email.length > 0) {
      try {
        const res = await axios.get(`${Server}/ShopAddMessage/${data.email}`);
        res && setmessage(res.data);
      } catch (error) {
        toast.error("Error Fetching Messages");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    !IsYes && fetchMessage();
    IsYes && deleteMessage(deleteId);
  }, [IsYes]);

  return (
    <div
      className=" h-fit mx-auto overflow-scroll
    lg:w-3/4
    px-10
    w-screen
    "
    >
      <div className=" h-2/5  ">
        <h2 className="text-center text-2xl mt-3">Add Message</h2>
        <form
          className=" flex  flex-col mx-auto mt-7 text-lg justify-between gap-3
         w-2/3
         md:w-1/2
        "
        >
          <label>Email</label>
          <input value={data.email} readOnly type="text" name="email" />
          <label>Message</label>
          <input
            value={data.message}
            onChange={handleChange}
            type="text"
            name="message"
          />
          <button
            onClick={AddMessage}
            className=" w-1/3 mx-auto bg-blue-400 py-2 mt-2 rounded-lg text-black font-bold"
          >
            {loader ? <PulseLoader color="white" size={10} /> : "Add"}
          </button>
        </form>
      </div>
      <div
        className="mt-20  rounded mx-auto  p-2 mb-10 
      xl:w-3/4
      w-full
      "
      >
        <div className=" flex flex-wrap flex-col">
          {message.map((item, i) => {
            return (
              <div
                className=" mt-4 text-lg px-5 w-full bg-slate-800 p-2 overflow-scroll "
                key={i}
              >
                <h1>
                  <span>ID : </span>
                  <span>{item._id}</span>
                </h1>
                <h1>
                  <span>Message : </span>
                  <span>{item.message}</span>
                </h1>
                <h1>
                  <button onClick={() => deleteMessageConfirm(item._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </h1>
              </div>
            );
          })}
        </div>
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

export default AddMessage;
