import axios from "axios";
import { setPay } from ".";

const URL = "http://localhost:3001";

export const getPayments = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${URL}/membership`);
      dispatch(setPay(res.data));
    } catch (error) {
      console.log("slice_pay", error.message);
    }
  };
};
