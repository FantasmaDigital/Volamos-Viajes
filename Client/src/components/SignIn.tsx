import React, { Suspense, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "../utils/functions/useScrollAnimation";
import { animated } from "@react-spring/web";
import Separator from "../utils/Separator";
import { Alert } from "@mui/material";
import GoogleBTN from "./GoogleBTN";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../hooks/usePost";
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import HelmetSignIn from "../conf/HelmetSignIn";

const HeaderLogo = React.lazy(() => import("./HeroLogo"));

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showMessage, setShowMessage] = useState<string>("")
  const [stateMessage, setStateMessage] = useState<boolean>(false)
  const [showSeverity, setShowSeverity] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
  const navigateTo = useNavigate();

  const { setToken, saveUser } = useAuth();

  const { loading, dataPost, error, postData } = usePost({
    url: `${import.meta.env.VITE_API_URL}/users/login`,
    body: {}, // Body will be updated dynamically
  });

  const onSubmit = (data: any) => {
    postData({
      email: sanitizeInput(data.email),
      password: sanitizeInput(data.password),
    });
  };

  useEffect(() => {
    if (dataPost) {
      if (dataPost.token) {
        setToken(dataPost.token);
        saveUser(dataPost.user);

        setShowSeverity("success");
        setShowMessage("Credenciales válidas.");
        setStateMessage(true);

        setTimeout(() => {
          setStateMessage(false);
          navigateTo('/');
        }, 1500);
      } else if (dataPost.message) {
        setShowSeverity("error");
        setShowMessage(dataPost.message);
        setStateMessage(true);

        setTimeout(() => {
          setStateMessage(false);
        }, 5000);
      }
    }

    if (error) {
      setShowSeverity("error");
      setShowMessage(error);
      setStateMessage(true);

      setTimeout(() => {
        setStateMessage(false);
      }, 5000);
    }
  }, [dataPost, error]);

  const { ref: formRef } = useScrollAnimation(100);
  const { ref: googleRef, springProps: googleSpring } = useScrollAnimation(200);

  return (
    <div className="flex min-h-screen py-14 md:py-0">
      <HelmetSignIn />
      <div
        className="hidden lg:flex w-[55%] bg-cover bg-center relative"
        style={{ backgroundImage: "url('./img/background/blockss.jpg')", backgroundPosition: "center" }}
      ></div>

      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 bg-white">
        <Suspense fallback={<div></div>}>
          <Link to='/' className="mb-4">
            <HeaderLogo />
          </Link>
        </Suspense>
        <h2 className="text-3xl font-black text-primary text-center mb-4">¡Bienvenido de nuevo!</h2>
        <p className="text-md text-text text-center font-medium">Inicia sesión para continuar explorando el mundo con nosotros.</p>

        <form
          className="w-full max-w-lg p-8 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
              {...register("password", { required: "La contraseña es obligatoria" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-6">
            <Link to="/reset-password" className="text-primary hover:underline text-sm">¿Olvidaste tu contraseña?</Link>
          </div>

          {stateMessage && (
            <div className="shadow-md border z-50 mb-4 flex justify-center items-center" style={{ width: "100%" }}>
              <Alert severity={showSeverity} className="w-full flex flex-row justify-center items-center">{showMessage}</Alert>
            </div>
          )}

          <div className="w-full flex flex-col gap-5">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition duration-200"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <Separator />
            <Suspense fallback={<div>Loading...</div>}>
              <animated.div style={googleSpring} ref={googleRef}>
                <GoogleBTN text="signin_with" />
              </animated.div>
            </Suspense>
          </div>

          <p className="mt-6 text-gray-600 text-center">
            ¿No tienes una cuenta? <Link to="/signup" className="text-primary hover:underline">Regístrate aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
