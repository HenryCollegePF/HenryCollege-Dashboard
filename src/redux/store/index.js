import { configureStore } from "@reduxjs/toolkit";
import students from "./slices/students";
import teachers from "./slices/teachers";
import courses from "./slices/courses";
import payments from "./slices/payments";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teacherState"],
};

export const rootReducer = combineReducers({
  studentState: students,
  teacherState: teachers,
  courseState: courses,
  paymentState: payments,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
