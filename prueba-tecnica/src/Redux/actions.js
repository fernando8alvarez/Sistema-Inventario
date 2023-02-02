import axios from "axios";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOADING = "LOADING";

//REGISTRAR USUARIO
export function registerUser(data) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const newUser = await axios.post("https://api-test-v2.onrender.com/user/create", data);
      return dispatch({ type: REGISTER_USER, payload: newUser.data});
    } catch (error) {
      console.log(error);
    }
  };
}

//INICIO DE SESION DE USUARIO
export function loginUser(data) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const newUser = await axios.post("https://api-test-v2.onrender.com/user/login", data);
      return dispatch({ type: LOGIN_USER, payload: newUser.data});
    } catch (error) {
      console.log(error);
    }
  };
}
