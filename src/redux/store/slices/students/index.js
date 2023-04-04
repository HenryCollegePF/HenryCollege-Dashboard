import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
  },
  reducers: {
    setStudent: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { setStudent } = studentSlice.actions;

export default studentSlice.reducer;
