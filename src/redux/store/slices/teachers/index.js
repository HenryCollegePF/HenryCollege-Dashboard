import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    list: [],
    token: [],
  },
  reducers: {
    setTeacherList: (state, action) => {
      state.list = action.payload;
    },
    settoken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
});

export const { setTeacherList, settoken, logout } = teacherSlice.actions;

export default teacherSlice.reducer;
