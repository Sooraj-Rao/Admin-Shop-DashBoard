import React, { useContext, useState, useEffect } from "react";
import context from "./ContextFeedback";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { MyContext } from "../../Context/Context";

const ViewFeedback = () => {
  const [toggle, settoggle] = useState(true);

  const [FetchMessage, setFetchMessage] = useState([]);
  const [load, setload] = useState(false);
  const [deleteId, setdeleteId] = useState("");

  const contextRef = useContext(MyContext);
  const { Server } = contextRef;

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const delId = (id) => {
    deleteConfirm(id);
  };

  const deleteConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const deleteMessage = async (id) => {
    try {
      const res = await axios.delete(`${Server}/viewUserMessage/${id}`);
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
    if (toggle) {
      const res = await axios.get(`${Server}/viewUserMessage/user`);
      setFetchMessage(res.data);
    } else {
      const res = await axios.get(`${Server}/viewUserMessage/shop`);
      setFetchMessage(res.data);
    }
    setload(false);
  };

  useEffect(() => {
    IsYes && deleteMessage(deleteId);
    !IsYes && fetch();
  }, [toggle, IsYes]);

  return (
    <context.Provider value={{ toggle, settoggle }}>
      {toggle ? (
        <UserFeedback FetchMessage={FetchMessage} load={load} delId={delId} />
      ) : (
        <ShopFeedback FetchMessage={FetchMessage} load={load} delId={delId} />
      )}
    </context.Provider>
  );
};

export default ViewFeedback;

const UserFeedback = ({ FetchMessage, load, delId }) => {
  return (
    <>
      <Show
        message="User Msg"
        Email="User Email"
        FetchMessage={FetchMessage}
        load={load}
        delId={delId}
      />
    </>
  );
};

const ShopFeedback = ({ FetchMessage, load, delId }) => {
  return (
    <>
      <Show
        message="Shop Msg"
        Email="Shop Email"
        FetchMessage={FetchMessage}
        load={load}
        delId={delId}
      />
    </>
  );
};

const Show = ({ message, Email, FetchMessage, load, delId }) => {
  const data = useContext(context);
  const { toggle, settoggle } = data;

  return (
    <>
      <div className=" w-11/12 mx-auto">
        <div className=" relative w-full  ">
          <h1 className="  font-semibold text-center text-2xl pt-4">
            {!toggle ? "Shop" : "User"} Feedback
          </h1>
          <div
            onClick={() => settoggle(!toggle)}
            className="Toggle cursor-pointer absolute 
            sm:left-[85%]
            sm:bottom-3
            bottom-0
            left-[70%]
            "
          >
            <h1
              className=" absolute pt-1 text-black font-semibold"
              style={{ left: !toggle && "5px", right: toggle && "5px" }}
            >
              {toggle ? "Shop" : "User"}
            </h1>
            <button
              style={{ left: toggle && "5px", right: !toggle && "5px" }}
            ></button>
          </div>
        </div>

        <hr className=" text-center" />

        <div className=" flex justify-center  ">
          {load ? (
            <div className=" flex justify-center mt-10">
              <PulseLoader color="white" size={10} />
            </div>
          ) : (
            <div className="text-lg px-5 flex flex-wrap justify-center  w-full mt-4  ">
              {FetchMessage?.map((item, i) => {
                return (
                  <div
                    className=" overflow-scroll rounded-md space-y-2 flex flex-col justify-between p-4 m-2 bg-zinc-900 
                      sm:text-xl
                      w-11/12
                      text-lg
                    "
                    key={i}
                  >
                    <div>
                      <span>Message ID : </span>
                      <span>{item._id}</span>
                    </div>
                    <div>
                      <span>Email : </span>
                      <span>{item.email}</span>
                    </div>
                    <div>
                      <span>Message : </span>
                      <span>{item.message}</span>
                    </div>
                    <div>
                      <button onClick={() => delId(item._id)}>
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
    </>
  );
};
