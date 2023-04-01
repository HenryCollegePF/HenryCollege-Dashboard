import { createSlice } from "@reduxjs/toolkit";

export const paySlice = createSlice({
  name: "payments",
  initialState: {
    list: [],
  },
  reducers: {
    setPay: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setPay } = paySlice.actions;

export default paySlice.reducer;
