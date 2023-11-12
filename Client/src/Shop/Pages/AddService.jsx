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
import { MyContext } from "../../Context/Context";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [loader, setloader] = useState({
    loader1: false,
    loader2: false,
  });
  const [data, setdata] = useState({
    shopId: "",
    serviceName: "",
    vehicleType: "Car",
    serviceImage: "",
    serviceCost: "",
  });
  const [deleteId, setdeleteId] = useState();

  const dispatch = useDispatch();

  const context = useContext(MyContext);
  const { Server } = context;

  let shopId = localStorage.getItem("shopId");

  const AddService = async (e) => {
    e.preventDefault();
    try {
      setloader({ ...loader, loader1: true });
      const res = await axios.post(`${Server}/addService`, data);
      setloader({ ...loader, loader1: false });

      if (res.data.message !== "Service Added") {
        return toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
      fetchservices();
      setdata({
        serviceName: "",
        serviceImage: "",
        vehicleType: "Car",
        serviceCost: "",
      });
    } catch (error) {
      setloader({ ...loader, loader1: false });
      toast.error("Error occured addMessage");
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const deleteServiceConfirm = (id) => {
    dispatch(show());
    setdeleteId(id);
  };

  const deleteservices = async (deleteId) => {
    try {
      const res = await axios.delete(`${Server}/viewService/${deleteId}`);
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

  const fetchservices = async () => {
    try {
      setloader({ ...loader, loader2: true });
      const res = await axios.get(`${Server}/viewService/${shopId}`);
      res && setServices(res.data);
      setloader({ ...loader, loader2: false });
    } catch (error) {
      setloader({ ...loader, loader2: false });
      toast.error("Error Fetching Services");
      console.log(error);
    }
  };

  useEffect(() => {
    !IsYes && fetchservices();
    IsYes && deleteservices(deleteId);
  }, [IsYes]);

  useEffect(() => {
    setdata({ ...data, shopId: shopId });
  }, [loader.loader1]);

  return (
    <div
      className="
      mx-auto
       lg:w-full 
      w-screen
    "
    >
      <div>
        <h2 className="text-center text-2xl mt-3">Add Service</h2>
        <form
          className=" flex  flex-col mx-auto mt-7 text-lg gap-2
        w-1/2

        "
        >
          <label>Service Name</label>
          <input
            value={data.serviceName}
            onChange={handleChange}
            type="text"
            name="serviceName"
          />
          <label>Vehicle Type</label>
          <select
            name="vehcileType"
            className=" text-black h-10 outline-none"
            value={data.vehicleType}
            onChange={handleChange}
          >
            <option>Car</option>
            <option>Truck</option>
            <option>2 Wheeler</option>
          </select>

          <label>Service Image URL</label>
          <input
            value={data.serviceImage}
            onChange={handleChange}
            type="text"
            name="serviceImage"
          />
          <label>Service Cost</label>
          <input
            value={data.serviceCost}
            onChange={handleChange}
            type="text"
            name="serviceCost"
          />
          <button
            onClick={AddService}
            className=" w-1/2 mx-auto bg-blue-400 py-2 mt-6 rounded-lg text-black font-bold"
          >
            {loader.loader1 ? (
              <PulseLoader color="white" size={10} />
            ) : (
              "Add Service"
            )}
          </button>
        </form>
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
      <div
        className="mt-5 rounded mx-auto  p-2 mb-10
       xl:w-3/4
      w-full
      "
      >
        <div>
          {loader.loader2 ? (
            <span className=" flex justify-center mt-10">
              <PulseLoader color="white" size={10} />
            </span>
          ) : (
            <div className=" flex flex-wrap justify-center">
              {services.map((item, i) => {
                return (
                  <div
                    className=" mt-4 px-5 py-3 text-xl m-3 rounded-xl   text-center bg-slate-800 
                        xl:w-2/5
                        w-3/5
                        "
                    key={i}
                  >
                    <div>
                      <span>Service : </span>
                      <span>{item.serviceName}</span>
                    </div>
                    <div>
                      <span>Vehcile Type : </span>
                      <span>{item.vehicleType}</span>
                    </div>
                    <div>
                      <span>Service Cost : </span>
                      <span>{item.serviceCost}</span>
                    </div>
                    <div>
                      <button onClick={() => deleteServiceConfirm(item._id)}>
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
    </div>
  );
};

export default AddService;
