import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, authentication } from "../../Redux/actions";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

//ESTILOS CON TAILWIND
const estilos = {
  input:
    "border-4 border-gray-300 pl-3 py-2 shadow-sm bg-transparent rounded text-lg focus:outline-none focus:border-[#bfff07] placeholder-gray-500 text-white",
  contenedor1:
    "flex flex-col items-center gap-10 justify-center w-full h-screen bg-[#0b0b0b]",
  contenedor2: "w-full flex flex-col mb-6",
  titulos: "text-xl leading-8 font-semibold text-white pb-2",
  boton:
    "text-white bg-black hover:bg-gray-800 focus:outline-none shadow-md shadow-black rounded-full text-center font-semibold text-lg px-5 py-3  w-auto mt-10",
  link: "text-base font-semibold text-white hover:text-[#bfff07]",
  error: "text-red-500 text-sm mt-2 w-fit",
};

function Register() {
  //MANEJO DE HOOKS
  const history = useNavigate();
  const dispatch = useDispatch();

  //ESTADOS GLOBALES
  const { message, loading, user } = useSelector((state) => state);

  //ESTADO LOCAL CON LOS DATOS DEL USUARIO A REGISTRAR
  const [dataUser, setDataUser] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    password: "",
  });

  const [startUser, setStartUser] = useState({
    usuario: "",
    password: "",
  });

  //MANEJO DE INPUTS CON LA INFORMACION DEL USUARIO
  const handleChange = (e) => {
    if (e.target.name === "usuario" || e.target.name === "password") {
      setStartUser({ ...startUser, [e.target.name]: e.target.value });
    }
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    setErrors(validate({ ...dataUser, [e.target.name]: e.target.value }));
  };

  //VALIDACIONES DE LOS INPUTS
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};

    if (!input.nombre) {
      errors.nombre = "Se requiere un nombre";
    } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.nombre)) {
      errors.nombre = "Solo puede contener letras";
    }
    if (!input.apellido) {
      errors.apellido = "Se requiere un apellido";
    } else if (!/^[_A-z]*((-|\s)*[_A-z])*$/g.test(input.apellido)) {
      errors.apellido = "Solo puede contener letras";
    }
    if (!input.usuario) {
      errors.usuario = "Se requiere un nombre de usuario";
    } else if (!/^[0-9a-zA-Z\s\\.\-\\_]+$/g.test(input.usuario)) {
      errors.usuario = "Solo letras, numeros, punto, guion y guion bajo";
    }
    if (!input.email) {
      errors.email = "Se requiere un correo valido";
    } else if (!/^[0-9a-z\s\\.\-\\_\\@]+$/.test(input.email)) {
      errors.email = "Mayuscula o caracter expecial no permitido";
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

    const { nombre, apellido, usuario, email, password } = dataUser;

    if (nombre && apellido && usuario && email && password) {
      dispatch(registerUser(dataUser));
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
    if (message[0]) {
      const status = message[0].message;

      if (message[0].code === 1001 && dataUser.nombre) {
        setDataUser({
          nombre: "",
          apellido: "",
          usuario: "",
          email: "",
          password: "",
        });
        //MODAL 2: EL usuario ya se encuentra en uso
        Swal.fire({
          title: "Alerta!",
          text: status,
          icon: "warning",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          history("/login");
        });
      } else if (message[0].code === 1000 && dataUser.nombre) {
        dispatch(loginUser(startUser));
        dispatch(authentication(true));
        setDataUser({
          nombre: "",
          apellido: "",
          usuario: "",
          email: "",
          password: "",
        });
        //MODAL 3: Operación fué realizada exitosamente
        Swal.fire({
          title: "Registro satisfactorio!",
          text: status,
          icon: "success",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          if (user[0]) {
            history("/profile");
          }
        });
      } else if (message[0].code === 1100 && dataUser.nombre) {
        setDataUser({
          nombre: "",
          apellido: "",
          usuario: "",
          email: "",
          password: "",
        });
        //MODAL 4: Error inesperado
        Swal.fire({
          title: "Error!",
          text: status,
          icon: "error",
          confirmButtonColor: "rgb(0 0 0)",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(function () {
          history("/profile");
        });
      }
    }
  }, [message, user[0]]);

  //DESMONTAR EL COMPONENTE
  useEffect(() => {
    return () => {
      localStorage.setItem("datosUser", JSON.stringify(user[0]));
    };
  });

  return (
    <>
      <div className={estilos.contenedor1}>
        {loading && <Loading />}
        <div className="text-white text-5xl font-medium">REGISTRARSE</div>
        <form action="#" className="w-auto">
          <div className="flex flex-col justify-center">
            <div className="flex gap-5">
              {/*----- INPUT NOMBRE -----*/}
              <div className={estilos.contenedor2}>
                <div className="flex flex-col">
                  <label htmlFor="nombre" className={estilos.titulos}>
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={(e) => handleChange(e)}
                    className={estilos.input}
                    placeholder="Ingrese su nombre ..."
                    value={dataUser.nombre}
                  />
                  {errors.nombre && (
                    <p className={estilos.error}>{errors.nombre}</p>
                  )}
                </div>
              </div>
              {/*----- INPUT APELLIDO -----*/}
              <div className={estilos.contenedor2}>
                <div className="flex flex-col">
                  <label htmlFor="apellido" className={estilos.titulos}>
                    Apellido:
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    onChange={(e) => handleChange(e)}
                    className={estilos.input}
                    placeholder="Ingrese su apellido ..."
                    value={dataUser.apellido}
                  />
                  {errors.apellido && (
                    <p className={estilos.error}>{errors.apellido}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-5">
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
                    placeholder="Ingrese un usuario ..."
                    value={dataUser.usuario}
                  />
                  {errors.usuario && (
                    <p className={estilos.error}>{errors.usuario}</p>
                  )}
                </div>
              </div>
              {/*----- INPUT EMAIL -----*/}
              <div className={estilos.contenedor2}>
                <div className="flex flex-col">
                  <label htmlFor="email" className={estilos.titulos}>
                    Email:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    className={estilos.input}
                    placeholder="Ingrese su correo ..."
                    value={dataUser.email}
                  />
                  {errors.email && (
                    <p className={estilos.error}>{errors.email}</p>
                  )}
                </div>
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
                  placeholder="Ingrese una contraseña ..."
                  value={dataUser.password}
                />
                {errors.password && (
                  <p className={estilos.error}>{errors.password}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col  w-full">
            {/*----- REDIRECCION A INICIO DE SESION -----*/}
            <button onClick={() => history("/login")} className={estilos.link}>
              ¿Ya tienes una cuenta? click aqui para iniciar sesión
            </button>
            <div className="container flex justify-center gap-5">
              {/*----- BOTON REGISTRARSE-----*/}
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className={estilos.boton}
              >
                Registrarse
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

export default Register;
