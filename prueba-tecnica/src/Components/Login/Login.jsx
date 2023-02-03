import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, authentication, products } from "../../Redux/actions";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

//ESTILOS CON TAILWIND
const estilos = {
  input: "border-4 border-gray-300 pl-3 py-2 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-[#bfff07] placeholder-gray-500 text-white",
  contenedor1:"flex flex-col items-center gap-10 justify-center w-full h-screen bg-[#0b0b0b]",
  contenedor2: "w-full flex flex-col mb-6",
  titulos: "text-xl leading-8 font-semibold text-white pb-2",
  boton: "text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-lg px-5 py-3 w-auto mt-10",
  link: "text-base font-semibold text-white hover:text-[#bfff07]",
  error: "text-red-500 text-sm mt-2 w-fit",
};

function Login() {
  //MANEJO DE HOOKS
  const history = useNavigate();
  const dispatch = useDispatch();

  //ESTADOS GLOBALES
  const { user } = useSelector((state) => state);
  const { loading } = useSelector((state) => state);

  //ESTADO LOCAL CON LOS DATOS DEL USUARIO
  const [dataUser, setUser] = useState({
    usuario: "",
    password: "",
  });

  //MANEJO DE INPUTS CON LA INFORMACION DEL USUARIO
  const handleChange = (e) => {
    setUser({ ...dataUser, [e.target.name]: e.target.value });
    setErrors(validate({ ...dataUser, [e.target.name]: e.target.value }));
  };

  //VALIDACIONES DE LOS INPUTS
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};

    if (!input.usuario) {
      errors.usuario = "Se requiere un nombre de usuario";
    } else if (!/^[0-9a-zA-Z\s\\.\-\\_]+$/g.test(input.usuario)) {
      errors.usuario = "Solo letras, numeros, punto, guion y guion bajo";
    }
    if (!input.password) {
      errors.password = "Se requiere una contraseña";
    } else if (!/^[0-9a-zA-Z]+$/g.test(input.password)) {
      errors.password = "Solo puede contener numeros y letras";
    }

    return errors;
  }

  //ENVIO DE FORMULARIO
  const handleSubmit = (e) => {
    e.preventDefault();

    const { usuario, password } = dataUser;

    if (usuario && password) {
      dispatch(loginUser(dataUser));
    } else {
      //MODAL 1: Los campos requeridos estan vacios
      Swal.fire({
        title: "ERROR!!!",
        text: "No se han completado los campos requeridos.",
        icon: "error",
        confirmButtonColor: "rgb(0 0 0)",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
  };

  //MANEJO DE ESTATUS DEL USUARIO SEGUN EL MENSAJE RECIBIDO DE LA API
  useEffect(() => {
    if (user[0]) {
      const status = user[0].message;

      if (user[0].code === 1002 && dataUser.usuario) {
        setUser({
          usuario: "",
          password: "",
        });
        //MODAL 2: Usuario o constraseña incorrectos
        Swal.fire({
          title: "Error!",
          text: status,
          icon: "error",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          setUser({
            usuario: "",
            password: "",
          });
          history("/login");
        });
      } else if (user[0].code === 1000 && dataUser.usuario) {
        setUser({
          usuario: "",
          password: "",
        });
        //MODAL 3: Inicio de sesion exitoso
        Swal.fire({
          title: "Inicio de sesion satisfactorio!",
          text: status,
          icon: "success",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          dispatch(authentication(true));
          dispatch(products(user[0].token));
          history("/profile");
        });
      } else if (user[0].code === 1100 && dataUser.usuario) {
        setUser({
          usuario: "",
          password: "",
        });
        //MODAL 4: Error inesperado
        Swal.fire({
          title: "Error inesperado!",
          text: status,
          icon: "error",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          history("/");
        });
      }
    }
  }, [user,dispatch]);

  return (
    <>
      <div className={estilos.contenedor1}>
        {loading && <Loading />}
        <div className="text-white text-5xl font-medium">INICIAR SESIÓN</div>
        <form action="#" className="w-auto">
          <div className="flex flex-col justify-between">
            {/*---- INPUT USUARIO -----*/}
            <div className={estilos.contenedor2}>
              <div className="flex flex-col">
                <label htmlFor="usuario" className={estilos.titulos}>
                  Usuario:
                </label>
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  onChange={(e) => handleChange(e)}
                  className={estilos.input}
                  placeholder="Ingrese su usuario ..."
                  value={user.nombre}
                />
                {errors.usuario && (
                  <p className={estilos.error}>{errors.usuario}</p>
                )}
              </div>
            </div>
            {/*----- INPUT PASSWORD -----*/}
            <div className={estilos.contenedor2}>
              <div className="flex flex-col">
                <label htmlFor="password" className={estilos.titulos}>
                  Contraseña:
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  className={estilos.input}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ingrese su contraseña ..."
                  value={user.password}
                />
                {errors.password && (
                  <p className={estilos.error}>{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  w-full">
            {/*----- REDIRECCION A REGISTRO DE USUARIO -----*/}
            <button
              onClick={() => history("/register")}
              className={estilos.link}
            >
              ¿No tiene una cuenta? click aqui para registrarse
            </button>
            <div className="container flex justify-center gap-5">
              {/*----- BOTON INICIAR SESION -----*/}
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className={estilos.boton}
              >
                Iniciar sesión
              </button>
              {/*----- BOTON REGRESAR A HOME -----*/}
              <button onClick={() => history("/")} className={estilos.boton}>
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
