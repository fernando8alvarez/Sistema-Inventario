import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Loading from "../Loading/Loading";

import Swal from "sweetalert2";
import Menu from "./Menu";

const Profile = () => {
  const history = useNavigate();
  const { isAuthenticated } = useSelector((state) => state);
  const { loading } = useSelector((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      //MODAL 1: Usuario invalido
      Swal.fire({
        title: "Usuario invalido!",
        text: "Usted no ha iniciado sesion o no se encuentra registrado.",
        icon: "error",
        confirmButtonColor: "rgb(0 0 0)",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(function () {
        history("/login");
      });
    }
  }, []);

  return loading ? <Loading /> : (
    <div className="w-fit h-auto flex ">
      <div className="bg-[#0b0b0b] w-full h-auto flex pb-7">
        <div className="flex gap-5 pr-8 h-full">
          <Menu />
        </div>
        <div className="w-full py-5 pr-10">
          <div className="bg-white w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
