import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PulseLoader from "react-spinners/PulseLoader";
import { getData } from "../../Redux/FetchShopDetailSlice";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";

const ViewRequest = ({ Info }) => {
  const [data, setdata] = useState([]);
  const [deleteId, setdeleteId] = useState();
  const [load, setload] = useState(false);

  const shopId = localStorage.getItem("shopId");
  const [loader, setloader] = useState({
    loader1: true,
    loader2: false,
  });

  const dispatch = useDispatch();

  const fetchRequest = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/viewRequest/${shopId}`
      );
      setloader({ ...loader, loader1: false });
      res && setdata(res.data);
    } catch (error) {
      setloader({ ...loader, loader1: false });
      toast.error("Error Fetching Services");
      console.log(error);
    }
  };

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const deleteRequestConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const Confirm = async (id) => {
    try {
      setloader({ ...loader, loader2: true });
      const res = await axios.post(
        `http://localhost:3000/viewRequest/confirm/${id}`
      );
      toast.success(res.data.message);
      setloader({ ...loader, loader2: false });
      setload(true);
      setTimeout(() => {
        setload(false);
      }, 200);
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  const deleteRequest = async (deleteId) => {
    try {
      console.log("Done");
      const res = await axios.delete(
        `http://localhost:3000/viewRequest/delete/${deleteId}`
      );
      console.log("Done");
      let { message } = res.data;
      if (message == "Successfully Deleted") {
        toast.success(message);
      } else {
        toast.error(message);
        console.log(message);
      }
      dispatch(Yes());
    } catch (error) {
      toast.error(message);
      console.log(error);
      dispatch(Yes());
    }
  };

  useEffect(() => {
    !IsYes && fetchRequest();
    IsYes && deleteRequest(deleteId);
  }, [IsYes, deleteId]);

  const Bill = (item) => {
    Info(item);
  };

  return (
    <div
      className="mt-5 rounded mx-auto p-2 mb-10 
    lg:w-full
    w-screen
    "
    >
      <div>
        {loader.loader1 ? (
          <span className=" flex justify-center mt-10">
            <PulseLoader color="white" size={10} />
          </span>
        ) : data.length > 0 ? (
          <div className=" flex flex-wrap justify-center ">
            {data?.map((item, i) => {
              i += 1;
              return (
                <>
                  <div
                    className=" mt-4 text-xl px-5 bg-slate-800 m-3 p-3 rounded-md  space-y-4 
                  xl:w-5/12
                    w-3/4
                    "
                    key={i}
                  >
                    <h1>
                      <span>S.No : </span>
                      <span>{i}</span>
                    </h1>
                    <h1>
                      <span>Name : </span>
                      <span>{item.userName}</span>
                    </h1>
                    <h1>
                      <span>Phone : </span>
                      <span>{item.userPhone}</span>
                    </h1>
                    <h1>
                      <span>Email : </span>
                      <span>{item.userEmail}</span>
                    </h1>
                    <h1>
                      <span>Service : </span>
                      <span>{item.serviceName}</span>
                    </h1>
                    <h1>
                      <span>Vehicle</span>
                      <span>{item.vehicleType}</span>
                    </h1>
                    <div>
                      <button
                        className=" bg-green-700 p-1 rounded-md mr-4"
                        onClick={() => Confirm(item._id)}
                        disabled={
                          item.status == "Service Approved" && "Approved"
                        }
                      >
                        {item.status == "Service Approved"
                          ? "Approved"
                          : "Confirm"}
                      </button>
                      <button
                        disabled={item.bill !== "No bills"}
                        className=" bg-red-600 rounded p-1 mr-4 mt-4"
                        onClick={() => Bill(item)}
                      >
                        {item.bill == "No bills"
                          ? "Generate Bill"
                          : "Bill Generated"}
                      </button>
                      <button onClick={() => deleteRequestConfirm(item._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <h1 className=" text-center text-2xl">No Requests Found</h1>
        )}
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

export default ViewRequest;
