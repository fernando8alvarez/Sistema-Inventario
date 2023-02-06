import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products, productToEdit } from "../../Redux/actions";

//ESTILOS TAILWIND
const estilos = {
  tabla: "border border-slate-700 text-slate-700 text-sm px-2 py-2 w-fit ",
  boton:
    "text-white bg-black hover:bg-gray-800 focus:outline-none rounded-full text-center py-1 px-2 text-sm",
};

const ProductList = ({
  PList,
  setProductList,
  editProduct,
  setEditProduct,
}) => {

  //MANEJO DE HOOKS
  const dispatch = useDispatch();
  //ESTADOS GLOBALES
  const { productList, user } = useSelector((state) => state);

  const columName = [
    "Id",
    "Codigo",
    "Descripcion",
    "Id_Categoria",
    "Categoria",
    "Detalles",
    "Stock",
    "Precio",
    "Edit prod",
  ];

  const EditarProducto = (
    codigo,
    descripcion,
    idCategoria,
    detalle,
    stock,
    precio
  ) => {
    const productDetail = {
      codigo: codigo,
      descripcion: descripcion,
      idCategoria: idCategoria,
      detalle: detalle,
      stock: stock,
      precio: precio,
    };
    
    setProductList(PList && false);
    setEditProduct(!editProduct && true);
    dispatch(productToEdit(productDetail));

  };

  useEffect(() => {
    const { token } = user[0];
    dispatch(products(token));
  }, []);

  return (
    <div className="w-full h-fit flex flex-col items-center gap-2">
      <div className="text-slate-700 text-3xl font-medium">
        Lista de Productos
      </div>
      <div className="w-full flex justify-center items-center rounded-lg">
        <table className="table-auto w-full text-center ">
          {/*----- TITULO DE COLUMNAS (ENCABEZADO) ------*/}
          <thead>
            <tr>
              {columName.map((e) => {
                return <th className={estilos.tabla}>{e}</th>;
              })}
            </tr>
          </thead>
          {/*----- INFORMACION DE COLUMNAS (PRODUCTOS) -----*/}
          <tbody>
            {productList.data.data &&
              productList.data.data.map((e) => {
                return (
                  <tr>
                    <td className={estilos.tabla}>{e.id && e.id}</td>
                    <td className={estilos.tabla}>{e.codigo && e.codigo}</td>
                    <td className={estilos.tabla}>
                      {e.descripcion && e.descripcion}
                    </td>
                    <td className={estilos.tabla}>
                      {e.productos_categorias[0] &&
                        e.productos_categorias[0].categoria_id}
                    </td>
                    <td className={estilos.tabla}>
                      {e.productos_categorias[0] &&
                        e.productos_categorias[0].categoria.descripcion}
                    </td>
                    <td className={estilos.tabla}>
                      {e.detalle_productos[0].descripcion}
                    </td>
                    <td className={estilos.tabla}>
                      {e.detalle_productos[0].stock}
                    </td>
                    <td className={estilos.tabla}>
                      {e.detalle_productos[0].precio}
                    </td>
                    <td className={estilos.tabla}>
                      <button
                        className={estilos.boton}
                        onClick={() =>
                          EditarProducto(
                            e.codigo ? e.codigo : "",
                            e.descripcion ? e.descripcion : "",
                            e.productos_categorias[0]
                              ? e.productos_categorias[0].categoria_id
                              : "",
                            e.detalle_productos[0].descripcion
                              ? e.detalle_productos[0].descripcion
                              : "",
                            e.detalle_productos[0].stock
                              ? e.detalle_productos[0].stock
                              : "",
                            e.detalle_productos[0].precio
                              ? e.detalle_productos[0].precio
                              : ""
                          )
                        }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
