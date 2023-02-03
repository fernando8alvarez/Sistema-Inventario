import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { products } from "../../Redux/actions";

//ESTILOS TAILWIND
const estilos = {
  tabla: "border border-gray-900 text-sm px-2 py-2 w-fit",
};

const ProductList = () => {
  //ESTADOS GLOBALES
  const { productList } = useSelector((state) => state);

  const columName = [
    "Id",
    "Codigo",
    "Descripcion",
    "Id_Categoria",
    "Categoria",
    "Detalles",
    "Stock",
    "Precio",
  ];

  return (
    <div className="w-full h-fit flex flex-col items-center gap-2">
      <div className="text-black text-3xl font-medium">Lista de Productos</div>
      <div className="w-full flex justify-center items-center">
        <table className="table-auto w-full">
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
