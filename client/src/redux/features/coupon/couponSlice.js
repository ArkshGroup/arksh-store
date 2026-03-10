import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupon_info: undefined,
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    set_coupon: (state, { payload }) => {
      state.coupon_info = payload;
    },
    get_coupons: (state, { payload }) => {
      // no-op: coupon is no longer persisted in localStorage
      state.coupon_info = state.coupon_info;
    },
  },
});

export const { set_coupon,get_coupons } = couponSlice.actions;
export default couponSlice.reducer;
