import React from "react";
import { useNavigate } from "react-router-dom";

const estilos = {
  input:"border-4 border-gray-300 pl-3 py-3 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-[#bfff07] placeholder-gray-500 text-gray-700",
  contenedor1:"flex flex-col items-center gap-10 justify-center w-full h-screen bg-[#0b0b0b]",
  contenedor2: "w-full flex flex-col mb-6",
  titulos: "text-xl leading-8 font-semibold text-white pb-2",
  boton:"text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-lg px-5 py-3  w-auto mt-10",
};

function Login() {
  const history = useNavigate();
  return (
    <>
      <div className={estilos.contenedor1}>
        <div className="text-white text-5xl font-medium">INICIAR SESIÓN</div>
        <form action="#" class="w-3/12">
          <div className="flex flex-col justify-between">
            <div className={estilos.contenedor2}>
              <div className="flex flex-col">
                <label for="usuario" class={estilos.titulos}>
                  Usuario:
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  onChange={""}
                  class={estilos.input}
                  placeholder="Ingrese su usuario o correo ..."
                  value={""}
                />
              </div>
            </div>
            <div className={estilos.contenedor2}>
              <div className="flex flex-col">
                <label for="password" class={estilos.titulos}>
                  Contraseña:
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  class={estilos.input}
                  onChange={"(e) => handleChange(e)"}
                  placeholder="Ingrese su contraseña..."
                  value={""}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col  w-full">
            <button
              onClick={() => history("/")}
              class="text-base font-semibold text-white hover:text-[#bfff07]"
            >
              ¿No tiene una cuenta? click aqui para registrarse
            </button>
            <div className="container flex justify-center gap-5">
              <button
                type="submit"
                onClick={"(e) => handleSubmit(e)"}
                className={estilos.boton}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => history("/")}
                className={estilos.boton}
              >
                Regresar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
