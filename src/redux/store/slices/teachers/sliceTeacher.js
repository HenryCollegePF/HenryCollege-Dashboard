import axios from "axios";
import { setTeacherList, settoken, logout } from ".";

const URL = "http://localhost:3001";

// import.meta.env.VITE_BACK_URL ||

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
      console.log("err_getTeachers", error);
    }
  };
};

export const postNewTeacher = (teacher) => {
  return async () => {
    try {
      await axios.post(`${URL}/teachers`, teacher);
      alert("ok create teacher please login with new user");
    } catch (err) {
      console.log("err_post", err.message);
    }
  };
};
export const loginTeacher = (teacher) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}/teachers/login`, teacher);
      dispatch(settoken(data.auth.access_token));
    } catch (error) {
      console.log("err_login", error.message);
    }
  };
};

export const deleteTeacher = (id, token) => {
  return async () => {
    try {
      await axios.delete(`${URL}/teachers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`El profesor con id ${id} cambio su estado a inactivo`);
    } catch (err) {
      console.log("err_delete", err);
    }
  };
};

export const logoutTeacher = () => (dispatch) => {
  return dispatch(logout());
};
