import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
};

let shop = localStorage.getItem("shopId");
const FetchShopDetail = createSlice({
  name: "FetchShopDetail",
  initialState,
  reducers: {
    FetchedShopData(state, action) {
      state.data = action.payload;
    },
  },
});
export const { FetchedShopData } = FetchShopDetail.actions;
export default FetchShopDetail.reducer;

export const getData = () => {
  return async function getDataThunk(dispatch, getState) {
    const Server = import.meta.env.VITE_SERVER;
    const res = await axios.get(`${Server}/manageShop/${shop}`);
    dispatch(FetchedShopData(res.data));
  };
};
3;
