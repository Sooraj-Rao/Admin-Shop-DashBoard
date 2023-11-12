import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Mycontext, { MyContext } from "../../Context/Context";

const AddMessage = () => {
  const [message, setmessage] = useState([]);
  const [loader, setloader] = useState({
    loader1: false,
    loader2: false,
  });
  const [data, setdata] = useState({
    MessageTitle: "",
    Message: "",
  });

  const context = useContext(MyContext);
  const { Server } = context;

  const [deleteId, setdeleteId] = useState();

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const deleteMessageConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };
  const deleteMessage = async (deleteId) => {
    try {
      const res = await axios.delete(`${Server}/addMessage/${deleteId}`);
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

  const AddMessage = async (e) => {
    e.preventDefault();
    try {
      setloader({ ...loader, loader1: true });
      const res = await axios.post(`${Server}/addMessage`, data);
      res.data.message !== "Message Added"
        ? toast.info(res.data.message)
        : toast.success(res.data.message);
      setloader({ ...loader, loader1: false });
      fetchMessage();
      setdata({ MessageTitle: "", Message: "" });
    } catch (error) {
      setloader({ ...loader, loader1: false });
      toast.error("Error occured addMessage");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const fetchMessage = async () => {
    try {
      setloader({ ...loader, loader2: true });
      const res = await axios.get(`${Server}/addMessage`);
      res && setmessage(res.data);
      setloader({ ...loader, loader2: false });
    } catch (error) {
      setloader({ ...loader, loader2: true });
      toast.error("Error Fetching Messages");
      console.log(error);
    }
  };

  useEffect(() => {
    !IsYes && fetchMessage();
    IsYes && deleteMessage(deleteId);
  }, [IsYes]);

  return (
    <div
      className=" mx-auto overflow-y-scroll  
 lg:w-[70vw]
 w-screen
 p-10
    "
    >
      <div className="  h-1/2">
        <h2 className="text-center text-2xl mt-3">Add Message</h2>
        <form
          className="sm:w-2/3 
        w-full mx-auto mt-7 text-lg bg-neutral-950 rounded  h-72 flex flex-col text-center gap-6 pt-10  "
        >
          <div className=" justify-center  flex  gap-2">
            <label>Message title</label>
            <input
              value={data.MessageTitle}
              onChange={handleChange}
              type="text"
              name="MessageTitle"
              className=" w-4/6"
            />{" "}
          </div>
          <div className="flex justify-center gap-10">
            <label>Message</label>
            <textarea
              value={data.Message}
              onChange={handleChange}
              type="text"
              name="Message"
              className=" text-black pl-2 
              sm:w-4/6
              w-4/6
              "
            />{" "}
          </div>
          <button
            onClick={AddMessage}
            className=" w-1/3 mx-auto bg-blue-400 py-2 mt-2 rounded-lg text-black font-bold"
          >
            {loader.loader1 ? <PulseLoader color="white" size={10} /> : "Add"}
          </button>
        </form>
      </div>
      <div className="  mt-10 rounded mx-auto  p-2 mb-20">
        <div>
          {loader.loader2 ? (
            <div className=" flex justify-center mt-5">
              <PulseLoader color="white" size={10} />
            </div>
          ) : (
            <div className=" flex flex-col flex-wrap">
              {message.map((item, i) => {
                return (
                  <div
                    className="mx-auto m-3  p-3 bg-zinc-900  w-full
                      text-xl
                      "
                    key={i}
                  >
                    <h1>
                      <span>Message Id : </span>
                      <span>{item._id}</span>
                    </h1>
                    <h1>
                      <span>Message Title : </span>
                      <span>{item.MessageTitle}</span>
                    </h1>
                    <h1>
                      <span>Message : </span>
                      <span>{item.Message}</span>
                    </h1>
                    <div>
                      <button onClick={() => deleteMessageConfirm(item._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
        theme="light"
      />
    </div>
  );
};

export default AddMessage;
