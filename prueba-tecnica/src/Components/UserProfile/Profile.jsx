import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Loading from "../Loading/Loading";
import CreateProduct from "./CreateProduct";


import Swal from "sweetalert2";
import Menu from "./Menu";

const Profile = () => {
  //MANEJO DE HOOKS
  const history = useNavigate();
  const dispatch = useDispatch();

  //ESTADOS GLOBALES
  const { isAuthenticated } = useSelector((state) => state);
  const { loading } = useSelector((state) => state);

  //ESTADOS LOCALES
  const [buttonProductList, setButtonProductList] = useState(false);
  const [buttonCreateProducts, setbuttonCreateProducts] = useState(false);

  console.log(buttonCreateProducts,buttonCreateProducts);

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

 

  return loading ? (
    <Loading />
  ) : (
    <div className={buttonProductList ? "bg-[#0b0b0b] w-full h-full flex " : "bg-[#0b0b0b] w-full h-screen flex "}>
      <div className=" w-full h-fit flex pb-7">
        <div className="flex gap-5 pr-8 h-full">
          <Menu
            productList={buttonProductList}
            setProductList={setButtonProductList}
            createProducts={buttonCreateProducts}
            setCreateProducts={setbuttonCreateProducts}
          />
        </div>
        {buttonProductList && (
          <div className="w-full py-5 pr-10">
            <div className="bg-white w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
              <ProductList />
            </div>
          </div>
        )}
        {buttonCreateProducts && (
          <div className="w-full py-5 pr-10">
            <div className="bg-white w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
              <CreateProduct />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
