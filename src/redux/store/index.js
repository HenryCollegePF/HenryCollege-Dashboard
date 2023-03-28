import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users";
import teachers from "./slices/teachers";
import courses from "./slices/courses";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userState", "teacherState"],
};

export const rootReducer = combineReducers({
  userState: users,
  teacherState: teachers,
  courseState: courses,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
