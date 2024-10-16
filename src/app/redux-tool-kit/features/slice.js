"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: [],
  order: [],
};

export const slice = createSlice({
  name: "frankAndOakSlices",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const alreadyExist = state.wishList.find(
        (product) =>
          product._id === action.payload._id &&
          product.size === action.payload.size &&
          product.color === action.payload.color
      );
      if (alreadyExist) {
        alert(
          "You already added this product in your cart with same size & color. If you want to increase the quantity you can do that while checking out."
        );
        return;
      }
      state.wishList = [...state.wishList, action.payload];
      console.log("WishList", state.wishList);
    },
  },
});

export const { addToWishList } = slice.actions;
export default slice.reducer;
