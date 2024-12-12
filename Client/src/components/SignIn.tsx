import React, { Suspense, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "../utils/functions/useScrollAnimation";
import { animated } from "@react-spring/web";
import Separator from "../utils/Separator";
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import Cookies from 'js-cookie';
import { Alert } from "@mui/material";
import GoogleBTN from "./GoogleBTN";
import { Helmet } from "react-helmet";

const HeaderLogo = React.lazy(() => import("./HeroLogo")); // Si deseas que el logo también se cargue de forma diferida//-

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showMessage, setShowMessage] = useState<string>("")
  const [stateMessage, setStateMessage] = useState<boolean>(false)
  const [showSeverity, setShowSeverity] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
  const navigateTo = useNavigate()

  const onSubmit = (data: any) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: "POST", // Usa POST para enviar datos
      headers: {
        "Content-Type": "application/json", // El servidor debe esperar JSON
      },
      body: JSON.stringify({
        email: sanitizeInput(data.email),
        password: sanitizeInput(data.password),
      }),
    })
      .then(response => response.json())  // Convertimos la respuesta a JSON
      .then(data => {
        if (data.token) {
          // Si el token es devuelto, lo guardamos en la cookie
          Cookies.set('authToken', data.token, {
            expires: 1 / 24, // Expiración en 1 hora
            path: '/',
            secure: true,
            sameSite: 'Strict',
          });

          // También guardamos el objeto del usuario en el localStorage
          localStorage.setItem('user', JSON.stringify(data.user));

          // Mostrar mensajes de éxito
          setShowSeverity("success");
          setShowMessage("Credenciales válidas.");
          setStateMessage(true);

          setTimeout(() => {
            setStateMessage(false);
            navigateTo('/');  // Redirigir al inicio o a la página deseada
          }, 1500);
        } else {
          // Manejo de errores según la respuesta del servidor
          if (data.message === 'Invalid email or password') {
            setShowSeverity("error");
            setShowMessage("El correo electrónico o la contraseña no coinciden.");
          } else if (data.message === 'User not found') {
            setShowSeverity("error");
            setShowMessage("El usuario no está registrado.");
          } else if (data.message === 'Account is inactive') {
            setShowSeverity("error");
            setShowMessage("Tu cuenta está inactiva. Contacta con soporte.");
          } else {
            // Caso general de error
            setShowSeverity("error");
            setShowMessage("Ocurrió un error al iniciar sesión.");
          }
          setStateMessage(true);

          setTimeout(() => {
            setStateMessage(false);
          }, 5000);
        }
      })
      .catch(error => {
        console.error("Error:", error); // Maneja cualquier error
        setShowSeverity("error");
        setShowMessage("Ocurrió un error al intentar comunicarte con el servidor.");
        setStateMessage(true);

        setTimeout(() => {
          setStateMessage(false);
        }, 5000);
      });
  };


  const { ref: formRef } = useScrollAnimation(100);
  const { ref: googleRef, springProps: googleSpring } = useScrollAnimation(200);

  return (
    <div className="flex min-h-screen py-14 md:py-0">
      <Helmet>
        {/* Meta etiquetas generales */}
        <title>Iniciar Sesión | Volamos Viajes - Accede a tu cuenta</title>
        <meta
          name="description"
          content="Inicia sesión en Volamos Viajes para explorar nuestras ofertas exclusivas, paquetes de viaje y destinos increíbles. ¡Reserva tus vacaciones ahora!"
        />
        <meta
          name="keywords"
          content="iniciar sesión, cuenta, usuario, acceso, viajes, vacaciones, paquetes, ofertas, Volamos Viajes"
        />
        <meta name="author" content="Volamos Viajes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="index, follow" />

        {/* Meta etiquetas Open Graph para redes sociales */}
        <meta property="og:title" content="Iniciar Sesión | Volamos Viajes - Accede a tu cuenta" />
        <meta
          property="og:description"
          content="Inicia sesión en Volamos Viajes para explorar nuestras ofertas exclusivas, paquetes de viaje y destinos increíbles. ¡Reserva tus vacaciones ahora!"
        />
        <meta property="og:image" content="https://volamosviajes.com/img/logo.png" />
        <meta property="og:image:alt" content="Iniciar sesión en Volamos Viajes" />
        <meta property="og:url" content="https://volamosviajes.com/signin" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />

        {/* Meta etiquetas para Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Iniciar Sesión | Volamos Viajes - Accede a tu cuenta" />
        <meta
          name="twitter:description"
          content="Inicia sesión en Volamos Viajes para explorar nuestras ofertas exclusivas, paquetes de viaje y destinos increíbles. ¡Reserva tus vacaciones ahora!"
        />
        <meta name="twitter:image" content="https://volamosviajes.com/img/logo.png" />
        <meta name="twitter:image:alt" content="Iniciar sesión en Volamos Viajes" />
        <meta name="twitter:site" content="@VolamosViajes" />
        <meta name="twitter:creator" content="@VolamosViajes" />

        {/* Meta etiquetas adicionales */}
        <link rel="canonical" href="https://volamosviajes.com/signin" />
        <meta property="og:site_name" content="Volamos Viajes" />
        <meta name="theme-color" content="#0e3d5e" />
        <meta name="apple-mobile-web-app-title" content="Volamos Viajes" />
        <meta name="application-name" content="Volamos Viajes" />
        <meta name="msapplication-TileColor" content="#1f567a" />
        <meta name="msapplication-TileImage" content="https://volamosviajes.com/img/logo.png" />

        {/* Favicon y recursos */}
        <link rel="icon" href="https://volamosviajes.com/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://volamosviajes.com/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://volamosviajes.com/img/favicon-32x32.png" />
        <link rel="manifest" href="https://volamosviajes.com/site.webmanifest" />
      </Helmet>

      {/* Sección de la imagen */}
      <div
        className="hidden lg:flex w-[55%] bg-cover bg-center relative"
        style={{
          backgroundImage: "url('./img/background/blockss.jpg')",
          backgroundPosition: "center"
        }}
      >
      </div>

      {/* Sección del formulario */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 bg-white">
        <Suspense fallback={<div></div>}>
          <Link to='/' className="mb-4">
            <HeaderLogo /> {/* Logo cargado de forma diferida */}
          </Link>
        </Suspense>
        <h2 className="text-3xl font-black text-primary text-center mb-4">
          ¡Bienvenido de nuevo!
        </h2>
        <p className="text-md text-text text-center font-medium">
          Inicia sesión para continuar explorando el mundo con nosotros.
        </p>

        <form
          className="w-full max-w-lg p-8 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef} // Referencia para animar el formulario
        >
          {/* Campo de email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm  focus:outline-none"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && typeof errors.email === 'object' && 'message' in errors.email && (
              <p className="text-red-500 text-sm mt-1">{(errors.email as any).message}</p>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm  focus:outline-none"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && typeof errors.password === 'object' && 'message' in errors.password && (
              <p className="text-red-500 text-sm mt-1">{(errors.password as any).message}</p>
            )}
          </div>

          {/* Enlace para recuperar contraseña */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/reset-password"
              className="text-primary hover:underline text-sm"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {stateMessage && (
            <div
              className="shadow-md border z-50 mb-4 flex justify-center items-center"
              style={{ width: "100%" }}
            >
              <Alert severity={showSeverity} className="w-full flex flex-row justify-center items-center">{showMessage}</Alert>
            </div>
          )}

          {/* Botón de inicio de sesión */}
          <div className="w-full flex flex-col gap-5">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition duration-200"
            >
              Iniciar sesión
            </button>

            {/* Separador */}
            <Separator />

            {/* Botón de inicio de sesión con Google */}
            <Suspense fallback={<div>Loading...</div>}>
              <animated.div style={googleSpring} ref={googleRef}>
                <GoogleBTN text="signin_with" />
              </animated.div>
            </Suspense>
          </div>

          {/* Enlace para registrarse */}
          <p className="mt-6 text-gray-600 text-center">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
