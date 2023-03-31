import axios from "axios";
import { setUserList } from ".";

const URL = "http://localhost:3001";

//Get users

export const getAllUsers = (token) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setUserList(res.data));
    } catch (error) {
      console.log("err_sliceUser", error.message);
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
      alert(`"El estudiante con id ${id}, cambio su estado a inactivo" `);
    } catch (error) {
      console.log("err_delete", error.message);
    }
  };
};
