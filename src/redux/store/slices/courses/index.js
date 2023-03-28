import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    courseId: [],
  },
  reducers: {
    setCourseList: (state, action) => {
      state.list = action.payload;
    },
    setCourseById: (state, action) => {
      state.courseId = action.payload;
    },
  },
});

export const { setCourseList, setCourseById } = courseSlice.actions;

export default courseSlice.reducer;
