import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { MyContext } from "../../Context/Context";

const ViewUser = () => {
  const [data, setdata] = useState([]);
  const [load, setload] = useState(false);
  const [deleteId, setdeleteId] = useState("");

  const context = useContext(MyContext);
  const { Server } = context;

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const deleteUserConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`${Server}/viewUser/${id}`);
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
    const res = await axios.get(`${Server}/viewUser`);
    setdata(res.data);
    setload(false);
  };

  useEffect(() => {
    IsYes && deleteUser(deleteId);
    !IsYes && fetch();
  }, [IsYes]);

  return (
    <div className=" w-4/5 mx-auto">
      <h1 className=" text-center font-semibold text-2xl pb-3">Users</h1>
      <hr className="mt-2" />

      <div>
        {load ? (
          <div className=" flex justify-center mt-20">
            {" "}
            <PulseLoader color="white" size={10} />
          </div>
        ) : (
          <div className=" flex flex-wrap justify-center w-full mt-4">
            {data.map((item, i) => {
              return (
                <div
                  className=" overflow-scroll flex flex-col text-lg bg-gray-800 p-4 rounded-md space-y-2 justify-between  m-3  mt-4
                w-11/12
                xl:w-2/5
                lg:w-3/5
                sm:w-2/3
                "
                  key={i}
                >
                  <div>
                    <span>User ID : </span>
                    <span>{item._id}</span>
                  </div>
                  <div>
                    <span>Name : </span>
                    <span> {item.name}</span>
                  </div>
                  <div>
                    <span>Phone : </span>
                    <span> {item.phone}</span>
                  </div>
                  <div>
                    <span>Email : </span>
                    <span> {item.email}</span>
                  </div>
                  <div>
                    <button onClick={() => deleteUserConfirm(item._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
    </div>
  );
};

export default ViewUser;
