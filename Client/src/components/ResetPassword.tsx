import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "../utils/functions/useScrollAnimation";
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import { Alert } from "@mui/material";

const HeaderLogo = React.lazy(() => import("./HeroLogo")); // Si deseas que el logo también se cargue de forma diferida

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showMessage, setShowMessage] = useState<string>("")
  const [stateMessage, setStateMessage] = useState<boolean>(false)
  const [showSeverity, setShowSeverity] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);

  const onSubmit = (data: any) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/request-newpassword`, {
      method: "POST", // Usa POST para enviar datos
      headers: {
        "Content-Type": "application/json", // El servidor debe esperar JSON
      },
      body: JSON.stringify({
        email: sanitizeInput(data.email), // Solo enviamos el correo
      }),
    })
      .then(response => response.json())  // Convertimos la respuesta a JSON
      .then(data => {
        if (data.ok) {
          setShowSeverity("success");
          setShowMessage("Te hemos enviado un enlace de restablecimiento de contraseña a tu correo.");
          setStateMessage(true);
        } else {
          setShowSeverity("error");
          setShowMessage("No se pudo enviar el enlace. Verifica tu correo o intenta de nuevo.");
          setStateMessage(true);
  
          setTimeout(() => {
            setStateMessage(false);
          }, 5000);
        }
      })
      .catch(error => {
        console.error("Error:", error); // Maneja cualquier error
        alert("Ocurrió un error al intentar restablecer la contraseña."); // Muestra un mensaje al usuario
      });
  };

  const { ref: formRef } = useScrollAnimation(100);

  return (
    <div className="flex min-h-screen">
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
          ¿Olvidaste tu contraseña?
        </h2>
        <p className="text-md text-text text-center font-medium">
          Ingresa tu correo electrónico para recibir un enlace de restablecimiento.
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

          {stateMessage && (
            <div
              className="shadow-md border z-50 mb-4 flex justify-center items-center"
              style={{ width: "100%" }}
            >
              <Alert severity={showSeverity} className="w-full flex flex-row justify-center items-center">{showMessage}</Alert>
            </div>
          )}

          {/* Botón de envío */}
          <div className="w-full flex flex-col gap-5">
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition duration-200"
            >
              Enviar enlace de restablecimiento
            </button>
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

export default ResetPassword;
