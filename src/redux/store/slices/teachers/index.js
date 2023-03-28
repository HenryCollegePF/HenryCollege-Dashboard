import { createSlice } from "@reduxjs/toolkit";

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    list: [],
    authToken: [],
  },
  reducers: {
    setTeacherList: (state, action) => {
      state.list = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { setTeacherList, setAuthToken } = teacherSlice.actions;

export default teacherSlice.reducer;
