import axios from "axios";
import { setTeacherList, setAuthToken } from ".";

const URL = import.meta.env.VITE_BACK_URL || "http://localhost:3001";

export const getAllTeachers = (token) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setTeacherList(res.data));
    } catch (error) {
      console.log("err_sliceTeacher", error);
    }
  };
};

export const postNewTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL}/teacher`, teacher);
      alert("ok create teacher please login with new user");
    } catch (err) {
      console.log("err_postNewTeacher", err.message);
    }
  };
};
export const loginTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/teachers/login`, teacher);
      dispatch(setAuthToken(data.auth.access_token));
    } catch (err) {
      console.log("err_loginTeacher", err);
    }
  };
};
