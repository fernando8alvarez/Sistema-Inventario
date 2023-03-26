import React from "react";
import imgUser from "./img/defaultUser.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authentication, products } from "../../Redux/actions";
import Swal from "sweetalert2";

//ESTILOS CON TAILWIND
const estilos = {
  contenedor1:"bg-white w-60 h-fit mt-4 py-5 px-4 rounded-r-lg shadow-black shadow-lg flex flex-col gap-5",
  botones:"text-sm font-medium w-full text-gray-700 py-2 px-2 flex gap-2 items-center justify-start hover:bg-[#bfff07] hover:text-slate-700 hover:scale-105 rounded-md transition-all duration-300 delay-150 ease-in-out",
};

const Menu = ({
  productList,
  setProductList,
  createProducts,
  setCreateProducts,
  EditProduct,
  setEditProduct,
}) => {
  //MANEJO DE HOOKS
  const history = useNavigate();
  const dispatch = useDispatch();

  //MANEJO DE ESTADOS GLOBALES
  const { user } = useSelector((state) => state);

  //MANEJO DE LOCAL STORAGE
  const { nombre, apellido, usuario, email } = JSON.parse(
    localStorage.getItem("datosUser")
  ).data;

  //AUTENTICACION DE SESION
  const singOut = () => {
    Swal.fire({
      title: "Cierre de sesion satisfactorio!",
      icon: "success",
      confirmButtonColor: "rgb(0 0 0)",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(function () {
      localStorage.removeItem("datosUser");
      dispatch(authentication(false));
      history("/");
    });
  };

  //BOTON MOSTRAR LISTA DE PRODUCTOS
  const buttonProductList = () => {
    setProductList(!productList && true);
    dispatch(products(user[0].token));
    setCreateProducts(false);
    setEditProduct(EditProduct && false);
  };

  //BOTON MOSTRAR FORMULARIO PARA CREAR PRODUCTOS
  const buttonCreateProduct = () => {
    setCreateProducts(!createProducts && true);
    setProductList(false);
    setEditProduct(EditProduct && false);
  };

  return (
    <div className={estilos.contenedor1}>
      {/* INFORMACION DE PERFIL DE USUARIO */}
      <div className="flex flex-col justify-center items-center gap-1">
        <img src={imgUser} alt="img default" className="w-1/3 rounded-full" />
        {/*----- NOMBRE Y APELLIDO DEL USUARIO -----*/}
        <p className="font-Ubuntu text-md text-slate-700  font-semibold">
          {`${nombre && nombre} ${apellido && apellido}`}
        </p>
        <div>
          {/*----- USERNAME DEL USUARIO -----*/}
          <p className="font-Ubuntu text-sm text-slate-700">
            Usuario: {usuario && usuario}
          </p>
          {/*----- CORREO DEL USUARIO-----*/}
          <p className="font-Ubuntu text-sm text-slate-700 ">
            Email: {email && email}
          </p>
        </div>
      </div>
      {/*----- OPCIONES DEL MENU -----*/}
      <div>
        {/*----- PESTAÑA LISTAR PRODUCTOS -----*/}
        <button onClick={() => buttonProductList()} className={estilos.botones}>
          <span className="">Lista de productos</span>
        </button>
        {/*----- PESTAÑA CREAR PRODUCTO -----*/}
        <button
          onClick={() => buttonCreateProduct()}
          className={estilos.botones}
        >
          <span className="">Crear productos</span>
        </button>
        {/*----- PESTAÑA CERRAR SESION -----*/}
        <button onClick={() => singOut()} className={estilos.botones}>
          <span className=""> Cerrar Sesion</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
