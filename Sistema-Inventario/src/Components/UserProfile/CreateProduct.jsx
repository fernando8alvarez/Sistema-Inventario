import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createdProduct } from "../../Redux/actions";
import Swal from "sweetalert2";

//ESTILOS TAILWIND
const estilos = {
  input: "border-4 border-gray-300 pl-3 py-2 shadow-sm bg-transparent rounded text-md focus:outline-none focus:border-[#bfff07] placeholder-gray-500 text-black",
  contenedor1: "flex flex-col items-center gap-10 justify-center w-full h-screen bg-[#0b0b0b]",
  contenedor2: "w-full flex flex-col mb-6",
  titulos: "text-xl leading-8 font-semibold text-slate-700 pb-2",
  boton: "text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-lg px-5 py-3 w-auto mt-10",
  link: "text-base font-semibold text-white hover:text-[#bfff07]",
  error: "text-red-500 text-sm mt-2 w-fit",
};

const CreateProduct = () => {
  //MANEJO DE HOOKS
  const dispatch = useDispatch();

  //MANEJO DE ESTADO GLOBAL
  const { user } = useSelector((state) => state);

  //ESTADO LOCAL CON LOS DATOS DEL PRODUCTO
  const [dataProduct, setDataProduct] = useState({
    codigo: "",
    descripcion: "",
    categoria: [{ categoria_id: 0 }],
    detalle_producto: [{ descripcion: "", stock: 0, precio: 0 }],
  });

  //MANEJO DE INPUTS DE LA INFORMACION DEL PRODUCTO Y ERRORES
  const handleChange = (e) => {
    if (e.target.name === "categoria") {
      setDataProduct({
        ...dataProduct,
        [e.target.name]: [{ ["categoria_id"]: parseInt(e.target.value) }],
      });
    } else if (e.target.name === "stock" || e.target.name === "precio") {
      setDataProduct({
        ...dataProduct,
        ["detalle_producto"]: [
          {
            ...dataProduct.detalle_producto[0],
            [e.target.name]: parseInt(e.target.value),
          },
        ],
      });
      setErrors(
        validate({
          ...dataProduct,
          ["detalle_producto"]: [
            {
              ...dataProduct.detalle_producto[0],
              [e.target.name]: parseInt(e.target.value),
            },
          ],
        })
      );
    } else if (e.target.name === "detalle") {
      setDataProduct({
        ...dataProduct,
        ["detalle_producto"]: [
          {
            ...dataProduct.detalle_producto[0],
            ["descripcion"]: e.target.value,
          },
        ],
      });
    } else {
      setDataProduct({ ...dataProduct, [e.target.name]: e.target.value });
      setErrors(validate({ ...dataProduct, [e.target.name]: e.target.value }));
    }
  };

  //VALIDACIONES DE LOS INPUTS
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};

    if (!input.codigo) {
      errors.codigo = "Se requiere un codigo numerico";
    } else if (!/^[0-9]*$/g.test(input.codigo)) {
      errors.codigo = "Solo puede contener numero";
    }
    if (!input.categoria[0].categoria_id) {
      errors.categoria = "Se requiere un numero entero";
    }
    if (!input.detalle_producto[0].stock) {
      errors.stock = "Se requiere un numero entero";
    }
    if (!input.detalle_producto[0].precio) {
      errors.precio = "Se requiere un numero entero o decimal";
    }

    return errors;
  }

  //ENVIO DE FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    const { codigo, descripcion, categoria, detalle_producto } = dataProduct;
    const { categoria_id } = categoria[0];
    const { stock, precio } = detalle_producto[0];
    const { token } = user[0];

    if (token && codigo && descripcion && categoria_id && stock && precio) {
      dispatch(createdProduct(dataProduct, token));
      setDataProduct({
        codigo: "",
        descripcion: "",
        categoria: [{ categoria_id: "" }],
        detalle_producto: [{ descripcion: "", stock: "", precio: "" }],
      });
    } else {
      //MODAL 1: Los campos requeridos estan vacios
      Swal.fire({
        title: "ERROR!!!",
        text: "No se han completado los campos",
        icon: "error",
        confirmButtonColor: "rgb(0 0 0)",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  };

  return (
    <div className="w-full h-fit flex flex-col items-center gap-10">
      <div className="text-slate-700 text-3xl font-medium">
        Agregar Productos
      </div>
      <form action="#" className="w-5/6">
        <div className="flex gap-10 justify-between">
          {/*---- INPUT CODIGO -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="codigo" className={estilos.titulos}>
                Código:
              </label>
              <input
                type="text"
                id="codigo"
                name="codigo"
                onChange={(e) => handleChange(e)}
                className={estilos.input}
                placeholder="Ingrese el codigo del producto ..."
              />
              {errors.codigo && (
                <p className={estilos.error}>{errors.codigo}</p>
              )}
            </div>
          </div>
          {/*----- INPUT DESCRIPCION -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="descripcion" className={estilos.titulos}>
                Descripción:
              </label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                className={estilos.input}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese una descripción ..."
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-between">
          {/*---- INPUT CATEGORIA ID -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="categoria" className={estilos.titulos}>
                Id de Categoria:
              </label>
              <input
                type="text"
                id="categoria"
                name="categoria"
                onChange={(e) => handleChange(e)}
                className={estilos.input}
                placeholder="Ingrese el id de la categoria ..."
              />
              {errors.categoria && (
                <p className={estilos.error}>{errors.categoria}</p>
              )}
            </div>
          </div>
          {/*----- INPUT DETALLE DEL PRODUCTO -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="detalle" className={estilos.titulos}>
                Detalles del producto:
              </label>
              <input
                type="text"
                id="detalle"
                name="detalle"
                className={estilos.input}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese una descripción ..."
              />
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-between">
          {/*---- INPUT STOCK DEL PRODUCTO -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="stock" className={estilos.titulos}>
                Stock:
              </label>
              <input
                type="text"
                id="stock"
                name="stock"
                onChange={(e) => handleChange(e)}
                className={estilos.input}
                placeholder="Ingrese la cantidad en existencia ..."
              />
              {errors.stock && <p className={estilos.error}>{errors.stock}</p>}
            </div>
          </div>
          {/*----- INPUT PRECIO DEL PRODUCTO -----*/}
          <div className={estilos.contenedor2}>
            <div className="flex flex-col">
              <label htmlFor="precio" className={estilos.titulos}>
                Precio del producto:
              </label>
              <input
                type="text"
                id="precio"
                name="precio"
                className={estilos.input}
                onChange={(e) => handleChange(e)}
                placeholder="Ingrese un precio para el producto ..."
              />
              {errors.precio && (
                <p className={estilos.error}>{errors.precio}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col  w-full">
          <div className="container flex justify-center gap-5">
            {/*----- BOTON AGREGAR PRODUCTO -----*/}
            <button
              type="submit"
              onClick={(e) => handleSubmit(e)}
              className={estilos.boton}
            >
              Agregar producto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
