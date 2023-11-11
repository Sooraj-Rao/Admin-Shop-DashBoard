import { useEffect, useState } from "react";

export const Toaster = ({ message }) => {
  const [show, setshow] = useState(false);

  useEffect(() => {
    if (message !== "") {
      console.log("Rendder TOast .jsx");
      setshow(true);
    }
  }, [message]);

  setTimeout(() => {
    setshow(false);
  }, 4000);

  return (
    <>
      {show && (
        <div
          className="Toast"
          style={{ width: show ? "300px" : "0", }}
        >
          <h1 className=" text-lg font-semibold text-center pt-4">{message}</h1>
        </div>
      )}
    </>
  );
};
