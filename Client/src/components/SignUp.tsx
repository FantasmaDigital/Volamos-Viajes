import React, { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "../utils/functions/useScrollAnimation";
import { animated } from "@react-spring/web";
import PhoneInput from 'react-phone-input-2'; // Paquete para la validación de teléfono
import 'react-phone-input-2/lib/style.css'; // Estilos del paquete
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import Separator from "../utils/Separator";
import { Alert } from "@mui/material";
import GoogleBTN from "./GoogleBTN";

// Componentes cargados de forma diferida
const HeaderLogo = React.lazy(() => import("./HeroLogo"));

const SignUp: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const country ="us";
  const [showMessage, setShowMessage] = useState<string>("")
  const [stateMessage, setStateMessage] = useState<boolean>(false)
  const [showSeverity, setShowSeverity] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
  const navigateTo = useNavigate()

  const onSubmit = (data: any) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/create`, {
      method: "POST", // Usa POST para enviar datos
      headers: {
        "Content-Type": "application/json", // El servidor debe esperar JSON
      },
      body: JSON.stringify({
        name: sanitizeInput(data.name),
        lastname: sanitizeInput(data.lastname),
        email: sanitizeInput(data.email),
        phoneNumber: sanitizeInput(data.phone),
        password: sanitizeInput(data.password),
        country: country,
      }),
    })
      .then(response => {
        if (response.status === 201) {
          setShowSeverity("success");
          setShowMessage("Te has registrado correctamente.");
          setStateMessage(true);
          setTimeout(() => {
            setStateMessage(false);
            navigateTo('/signin')
          }, 1500);
        } else if (response.status === 400) {
          setShowSeverity("error");
          setShowMessage("El usuario ya existe");
          setStateMessage(true);
          setTimeout(() => {
            setStateMessage(false);
          }, 5000);
        } else {
          setShowSeverity("error");
          setShowMessage("Hubo un error al registrarse");
          setStateMessage(true);
          setTimeout(() => {
            setStateMessage(false);
          }, 5000);
        }
      })
      .then(data => {
        console.log("Success:", data); // Maneja los datos devueltos
      })
      .catch(error => {
        console.error("Error:", error); // Maneja cualquier error
        alert("Ocurrió un error al registrarse."); // Muestra un mensaje al usuario
      });

    console.log(data); // Solo para depuración
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  password && confirmPassword && password === confirmPassword;

  const { ref: formRef } = useScrollAnimation(100);
  const { ref: googleRef, springProps: googleSpring } = useScrollAnimation(200);

  useEffect(() => {
    const countryCodes: { [key: string]: string } = {
      us: "+1",
      ca: "+1",
      mx: "+52",
      es: "+34",
      br: "+55",
    };
    setValue("phone", countryCodes[country]);
  }, [country, setValue]);

  return (
    <div className="flex min-h-screen py-10 md:py-0">
      <div
        className="hidden lg:flex w-[55%] bg-cover bg-center relative"
        style={{
          backgroundImage: "url('./img/background/blockss.jpg')",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 bg-white py-10">
        <Suspense fallback={<div></div>}>
          <Link to="/" className="mb-4">
            <HeaderLogo />
          </Link>
        </Suspense>
        <h2 className="text-3xl font-black text-primary text-center mb-4">
          ¡Regístrate!
        </h2>
        <p className="text-md text-text text-center font-medium mb-7 md:mb-0">
          Crea una cuenta para explorar el mundo con nosotros.
        </p>

        <form
          className="w-full max-w-xl md:max-w-lg p-0 md:p-8 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          {/* Campo de nombre completo */}
          <div className="w-full flex flex-row gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
                Nombres
              </label>
              <input
                id="name"
                type="text"
                placeholder="Ingresa tu nombre"
                className="w-full px-2 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="fullName">
                Apellidos
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Ingresa tu apellido"
                className="w-full px-2 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                {...register("lastname", { required: "El apellido es obligatorio" })}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname.message as string}</p>
              )}
            </div>
          </div>

          {/* Campo de email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="w-full px-2 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Ingresa un correo válido" }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          {/* Campo de teléfono */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
              Teléfono
            </label>
            <PhoneInput
              inputProps={{
                id: "phone"
              }}
              country={country}
              value={watch("phone")}
              onChange={(value) => setValue("phone", sanitizeInput(value), { shouldValidate: true })} // Se sanitiza el input antes de guardarlo
              placeholder="Ingresa tu número de teléfono"
              dropdownStyle={{
                backgroundColor: "white",
                color: "black",
                borderColor: "gray",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "16px",
              }}
              buttonStyle={{
                borderBottom: "2px solid #d1d5db",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                fontSize: "6px",
                width: "50px",
                paddingLeft: "10px",
              }}
              inputStyle={{
                borderBottom: "2px solid #d1d5db",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                paddingLeft: "60px",
                width: "100%",
              }}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
            )}
          </div>

          <div className="w-full flex flex-row gap-4">
            {/* Campo de contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Cambia el tipo de campo según el estado
                placeholder="Ingresa tu contraseña"
                className="w-full px-2 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
              )}
            </div>

            {/* Campo de confirmar contraseña */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"} // Cambia el tipo de campo según el estado
                placeholder="Confirma tu contraseña"
                className="w-full px-2 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                {...register("confirmPassword", {
                  required: "La confirmación es obligatoria",
                  validate: value => value === password || "Las contraseñas no coinciden"
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
              )}
            </div>
          </div>

          {/* Checkbox para mostrar/ocultar contraseñas */}
          <div className={`${stateMessage ? 'mb-3' : 'mb-6'} flex flex-row items-center`}>
            <input
              type="checkbox"
              id="showPass"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} // Cambia el estado al marcar/desmarcar el checkbox
            />
            <label htmlFor="showPass" className="text-gray-600 ml-2">Mostrar contraseña</label>
          </div>
          {stateMessage && (
            <div
              className="shadow-md border z-50 mb-4 flex justify-center items-center"
              style={{ width: "100%" }}
            >
              <Alert severity={showSeverity} className="w-full flex flex-row justify-center items-center">{showMessage}</Alert>
            </div>
          )}

          {/* Botón de registro */}
          <div className="w-full flex flex-col gap-5">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition duration-200"
            >
              Registrarse
            </button>

            {/* Separador */}
            <Separator />

            {/* Botón de registro con Google */}
            <Suspense fallback={<div>Loading...</div>}>
              <animated.div style={googleSpring} ref={googleRef}>
              <GoogleBTN text="signup_with"/>
              </animated.div>
            </Suspense>
          </div>

          {/* Enlace para iniciar sesión */}
          <p className="mt-6 text-gray-600 text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
