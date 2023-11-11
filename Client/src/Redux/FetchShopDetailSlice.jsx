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
    const res = await axios.get(`http://localhost:3000/manageShop/${shop}`);
    dispatch(FetchedShopData(res.data));
  };
};
3