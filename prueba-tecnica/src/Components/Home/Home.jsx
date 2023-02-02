import React from "react";
import { useNavigate } from "react-router-dom";

const estilos = {
  constenedor:"flex flex-col items-center gap-10 justify-center w-full h-screen bg-[#0b0b0b]",
  boton:"text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-lg px-5 py-3  w-auto mt-10",
};

function Home() {
  const history = useNavigate();
  return (
    <>
      <div className={estilos.constenedor}>
        <div className="flex flex-col w-full items-center">
          <div className="text-white text-8xl font-medium mr-52 border-b-8 border-black">
            BIENVENIDO
          </div>
          <div className="text-white text-8xl font-medium ml-60 border-b-8 border-black">
            WELCOME
          </div>
        </div>
        <div className="flex gap-5">
          <button onClick={() => history("/login")} className={estilos.boton}>
            Iniciar sesión
          </button>
          <button className={estilos.boton}>Registrarse</button>
        </div>
      </div>
    </>
  );
}

export default Home;
