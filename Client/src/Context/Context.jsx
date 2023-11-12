import React from "react";
import { createContext } from "react";

export const MyContext = createContext();

const Context = (props) => {
  const Server = import.meta.env.VITE_SERVER;
  return (
    <MyContext.Provider value={{ Server }}>{props.children}</MyContext.Provider>
  );
};

export default Context;
