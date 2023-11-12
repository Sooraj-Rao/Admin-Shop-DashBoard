import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./Login.jsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import Context from "./Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Context>
      <Provider store={Store}>
        <Login />
      </Provider>
    </Context>
  </React.StrictMode>
);
