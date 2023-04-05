import axios from "axios";
import { setStudent } from ".";

const URL =
  "https://henrycollege-back-end.onrender.com" || "http://localhost:3001";

export const allStudents = (token) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setStudent(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteStudent = (id, token) => {
  return async () => {
    try {
      await axios.delete(`${URL}/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(`"El estudiante con id/${id} cambio su estado" `);
    } catch (error) {
      console.log("err_delete", error.message);
    }
  };
};
