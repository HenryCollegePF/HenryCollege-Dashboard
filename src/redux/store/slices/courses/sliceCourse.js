import axios from "axios";
import { setCourseList, setCourseById } from ".";

const URL =
  "https://henrycollege-back-end.onrender.com" || "http://localhost:3001";
// "http://localhost:3001";
//Get All Courses import.meta.env.VITE_BACK_URL ||

export const getAllCourses = (token) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/course/?page=all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCourseList(res.data));
    } catch (err) {
      console.log("error_sliceCurse", err.message);
    }
  };
};

export const createNewCurse = (course, token) => {
  return async () => {
    try {
      await axios.post(`${URL}/course`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Se creo un nuevo curso");
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCourseById = (id, token) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:3001/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCourseById(res.data));
    } catch (error) {
      console.log("err_sliceById", error.message);
    }
  };
};

export const deleteCourse = (id, token) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/course/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("El curso se ha borrado con exito");
    } catch (error) {
      console.log("err_sliceDelete", error.message);
    }
  };
};
