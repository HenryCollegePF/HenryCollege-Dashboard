import axios from "axios";
import { setUserList } from ".";

const URL = import.meta.env.VITE_BACK_URL || "http://localhost:3001";

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
