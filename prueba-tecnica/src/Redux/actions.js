import axios from "axios";
import Swal from "sweetalert2";

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOADING = "LOADING";
export const AUTHENTICATION = "AUTHENTICATION";
export const PRODUCT_LIST = "PRODUCT_LIST";

//REGISTRAR USUARIO
export function registerUser(data) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const newUser = await axios.post(
        "https://api-test-v2.onrender.com/user/create",
        data
      );
      return dispatch({ type: REGISTER_USER, payload: newUser.data });
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
      const newUser = await axios.post(
        "https://api-test-v2.onrender.com/user/login",
        data
      );
      return dispatch({ type: LOGIN_USER, payload: newUser.data });
    } catch (error) {
      console.log(error);
    }
  };
}

//AUTENTICACION DE USUARIO
export function authentication(payload) {
  return {
    type: AUTHENTICATION,
    payload,
  };
}

//LISTADO DE PRODUCTOS
export function productList(data) {
  return async function (dispatch) {
    dispatch({ type: LOADING });
    try {
      const products = await axios.get(
        "https://api-test-v2.onrender.com/producto/index",
        {
          headers: {
            token: data,
          },
        }
      );

      if (products) {
        const { code, message } = products.data;

        if (code === 1000) {
          console.log(message);
          return dispatch({ type: PRODUCT_LIST, payload: products });
        } else if (code === 1100) {
          Swal.fire({
            title: "Error!",
            text: message,
            icon: "error",
            confirmButtonColor: "rgb(0 0 0)",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(function () {
            history("/");
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Token invalido",
        icon: "error",
        confirmButtonColor: "rgb(0 0 0)",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(function () {
        window.location.href = window.location.origin;
      });
    }
  };
}
