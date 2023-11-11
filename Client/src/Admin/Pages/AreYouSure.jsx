import React from "react";
import { show } from "../../Redux/AreYouSureSlice";
import { Yes } from "../../Redux/YesSureSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";

const AreYouSure = () => {
  const IsShow = useSelector((state) => state.show);

  const IsYes = useSelector((state) => state.Yes);

  const dispatch = useDispatch();

  const Yess = () => {
    dispatch(Yes());
    dispatch(show());
  };

  const No = () => {
    dispatch(show());
  };

  return (
    <div className=" flex justify-center">
      <div className=" fixed sm:w-1/3 w-2/3 h-40 sm:left-1/3 left-16 top-1/3 bg-slate-900 rounded-xl">
        <h1 className=" text-3xl text-center font-Poppins2 pt-7">
          Are You Sure
        </h1>
        <div className=" flex justify-center  text-xl gap-4 mt-7">
          <button
            className=" w-1/3 h-10 bg-slate-700 active:scale-95"
            onClick={Yess}
          >
            Yes
          </button>
          <button
            className=" w-1/3 h-10 bg-slate-700 active:scale-95"
            onClick={No}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
