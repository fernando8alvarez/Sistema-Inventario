import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const estilos = {
  constenedor:
    " h-screen bg-[#0b0b0b]",
  boton:
    "text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-sm sm:text-base md:text-lg px-3 md:px-4 lg:px-5 py-2 lg:py-3 w-auto mt-10",
};

function Home() {
  const history = useNavigate();
  return (
    <>
      <div className={estilos.constenedor}>
        <div className="h-4/5 flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full items-center">
            <div className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mr-20 sm:mr-28 md:mr-32 lg:mr-52 border-b-4 lg:border-b-8 border-black">
              SISTEMA DE
            </div>
            <div className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium ml-20 sm:ml-32 md:ml-40 lg:ml-60 border-b-4 lg:border-b-8 border-black">
              INVENTARIO
            </div>

          </div>
          <div className="flex gap-3 sm:gap-5">
            <button onClick={() => history("/login")} className={estilos.boton}>
              Iniciar sesión
            </button>
            <button
              onClick={() => history("/register")}
              className={estilos.boton}
            >
              Registrarse
            </button>
          </div>

        </div>
        <div className="h-1/5">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
