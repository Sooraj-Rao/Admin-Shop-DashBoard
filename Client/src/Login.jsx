import React, { useContext, useState } from "react";
import Admin from "./Admin";
import Shop from "./Shop";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { MyContext } from "./Context/Context";

const Login = () => {
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [admin, setadmin] = useState(false);
  const [shop, setshop] = useState(false);
  const [loader, setloader] = useState(false);

  const context = useContext(MyContext);
  const { Server } = context;

  let app = localStorage.getItem("admin");
  let app2 = localStorage.getItem("shop");

  const verify = async () => {
    try {
      setloader(true);
      const res = await axios.post(`${Server}/auth/login`, data);
      setloader(false);
      if (res.data.code == "admin") {
        localStorage.setItem("admin", true);
        setadmin(true);
      } else if (res.data.shop) {
        console.log(res.data.shop);
        localStorage.setItem("shopId", res.data.code);
        setshop(true);
        localStorage.setItem("shop", true);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      setloader(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {admin || app == "true" ? (
        <Admin />
      ) : shop || app2 == "true" ? (
        <Shop />
      ) : (
        <div className=" flex flex-col mt-10 items-center">
          <br />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button
            className=" cursor-pointer border px-4 py-2 mx-10"
            onClick={verify}
          >
            {loader ? <PulseLoader color="white" size={10} /> : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
