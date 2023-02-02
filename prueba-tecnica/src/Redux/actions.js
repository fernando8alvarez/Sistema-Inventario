import axios from "axios";
export const REGISTER_USER = "REGISTER_USER";
export const LOADING = "LOADING";

export function registerUser(data) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const newUser = await axios.post("https://api-test-v2.onrender.com/user/create",data);
      console.log(newUser.data);
      return dispatch({ type: REGISTER_USER, payload: newUser.data});
    } catch (error) {
      console.log(error);
    }
  };
}
