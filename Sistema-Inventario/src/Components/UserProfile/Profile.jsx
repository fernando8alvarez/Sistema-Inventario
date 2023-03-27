import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Loading from "../Loading/Loading";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import { SaveUser, products, authentication } from "../../Redux/actions";
import Swal from "sweetalert2";
import Menu from "./Menu";

const Profile = () => {
  //MANEJO DE HOOKS
  const history = useNavigate();
  const dispatch = useDispatch();

  //MANEJO DE ESTADOS GLOBALES
  const { isAuthenticated, loading, user } = useSelector((state) => state);

  //MANEJO DE ESTADOS LOCALES (OPCIONES DEL MENU)
  const [buttonProductList, setButtonProductList] = useState(false);
  const [buttonCreateProducts, setbuttonCreateProducts] = useState(false);
  const [buttonEditProduct, setButtonEditProduct] = useState(false);

  //CUANDO SE MONTA EL COMPONENTE
  useEffect(() => {
    const datosUser = JSON.parse(localStorage.getItem("datosUser"));
    if(datosUser){
      dispatch(authentication(true));
      dispatch(SaveUser(datosUser));
      dispatch(products(datosUser.token));
    } 
    else if (!isAuthenticated) {
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

  return (
    <div
      className={
        buttonProductList
          ? "bg-[#0b0b0b] w-full h-full flex "
          : "bg-[#0b0b0b] w-full h-screen flex "
      }
    >
      {loading && <Loading />}
      <div className=" w-full h-fit flex pb-7">
        <div className="flex gap-5 pr-8 h-full">
          <Menu
            productList={buttonProductList}
            setProductList={setButtonProductList}
            createProducts={buttonCreateProducts}
            setCreateProducts={setbuttonCreateProducts}
            EditProduct={buttonEditProduct}
            setEditProduct={setButtonEditProduct}
          />
        </div>
        {buttonProductList && (
          <div className="w-full py-5 pr-10">
            <div className="bg-[#ECF1F6] w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
              <ProductList
                PList={buttonProductList}
                setProductList={setButtonProductList}
                editProduct={buttonEditProduct}
                setEditProduct={setButtonEditProduct}
              />
            </div>
          </div>
        )}
        {buttonCreateProducts && (
          <div className="w-full py-5 pr-10">
            <div className="bg-[#ECF1F6] w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
              <CreateProduct />
            </div>
          </div>
        )}
        {buttonEditProduct && (
          <div className="w-full py-5 pr-10">
            <div className="bg-[#ECF1F6] w-full h-auto mt-4 p-10 rounded-lg shadow-black shadow-lg">
              <EditProduct
                buttonProductList={buttonProductList}
                setButtonProductList={setButtonProductList}
                buttonEditProduct={buttonEditProduct}
                setButtonEditProduct={setButtonEditProduct}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
