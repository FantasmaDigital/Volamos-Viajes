import React, { Suspense, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "../utils/functions/useScrollAnimation";
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import { Alert } from "@mui/material";
import HeroLogo from "./HeroLogo";

const HeaderLogo = React.lazy(() => import("./HeroLogo"));

const NewPassword: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showMessage, setShowMessage] = useState<string>("");
    const [stateMessage, setStateMessage] = useState<boolean>(false);
    const [showSeverity, setShowSeverity] = useState<"success" | "error" | "warning" | "info" | undefined>(undefined);
    const [userID, setUserID] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigateTo = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = location.pathname.split("/")[2];

        const verifyToken = async (token:string) => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/verify-token-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token: token }), // Inicialización del valor de password
                });
                const data = await response.json();
                if (data.ok) {
                    setIsLoading(false);
                    setUserID(data.userId)
                } else {
                    setShowMessage("Token no válido o expirado");
                    setShowSeverity("error");
                    setStateMessage(true);
                    setTimeout(() => setStateMessage(false), 5000);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Ocurrió un error al verificar el token.");
                setIsLoading(false);
            }
        };

        verifyToken(token);
    }, []);

    const onSubmit = async (data: any) => {
        if (data.password !== data.confirmPassword) {
            setShowSeverity("error");
            setShowMessage("Las contraseñas no coinciden.");
            setStateMessage(true);
            setTimeout(() => setStateMessage(false), 5000);
            return;
        }

        console.log(userID)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userID, newPassword: sanitizeInput(data.password) }),
            });
            const result = await response.json();
            if (result.ok) {
                setShowSeverity("success");
                setShowMessage("Contraseña actualizada correctamente.");
                setStateMessage(true);

                setTimeout(() => {
                    setStateMessage(false);
                    navigateTo('/signin');
                }, 1500);
            } else {
                setShowSeverity("error");
                setShowMessage("Hubo un error al actualizar la contraseña.");
                setStateMessage(true);
                setTimeout(() => setStateMessage(false), 5000);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Ocurrió un error al intentar cambiar la contraseña.");
        }
    };

    const { ref: formRef } = useScrollAnimation(100);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4" style={{ backgroundImage: "url('/img/background/blockss.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat:'no-repeat' }}>
                {showSeverity === 'error' ? (
                    <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-6 max-w-sm w-full">
                        <div className="pb-5">
                        <HeroLogo/>
                        </div>
                        <Alert severity={showSeverity} className="w-full flex flex-col items-center mb-4 text-center">
                            <span className="font-semibold">{showMessage}</span>
                        </Alert>
                        <Link 
                            to="/" 
                            className="text-primary hover:text-blue-600 text-lg font-semibold"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-6 max-w-sm w-full">
                        <p className="text-gray-600 text-lg font-semibold mb-4">Cargando...</p>
                        <div className="animate-spin rounded-full border-t-4 border-blue-500 h-12 w-12"></div>
                    </div>
                )}
            </div>
        );
    }    

    return (
        <>
            {
                <div className="flex min-h-screen">
                    {/* Sección de la imagen */}
                    <div className="hidden lg:flex w-[55%] bg-cover bg-center relative" style={{ backgroundImage: "url('/img/background/blockss.jpg')" }}></div>

                    {/* Sección del formulario */}
                    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 bg-white">
                        <Suspense fallback={<div></div>}>
                            <Link to="/" className="mb-4">
                                <HeaderLogo />
                            </Link>
                        </Suspense>
                        <h2 className="text-3xl font-black text-primary text-center mb-4">
                            Restablecer contraseña
                        </h2>
                        <p className="text-md text-text text-center font-medium">
                            Ingresa una nueva contraseña para tu cuenta.
                        </p>

                        <form className="w-full max-w-lg p-8 rounded-lg" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                            {/* Campo de contraseña */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu nueva contraseña"
                                    className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                                    {...register("password", { required: "La contraseña es obligatoria" })}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
                            </div>

                            {/* Campo de repetir contraseña */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">Repetir contraseña</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Repite tu nueva contraseña"
                                    className="w-full px-4 py-3 border-b-2 border-gray-300 rounded-sm focus:outline-none"
                                    {...register("confirmPassword", { required: "Debes confirmar la contraseña" })}
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>}
                            </div>

                            {stateMessage && (
                                <div className="shadow-md border z-50 mb-4 flex justify-center items-center" style={{ width: "100%" }}>
                                    <Alert severity={showSeverity} className="w-full flex flex-row justify-center items-center">{showMessage}</Alert>
                                </div>
                            )}

                            {/* Botón de restablecer contraseña */}
                            <div className="w-full flex flex-col gap-5">
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-sm hover:bg-secondary transition duration-200"
                                >
                                    Restablecer contraseña
                                </button>
                            </div>

                            {/* Enlace para ir al inicio de sesión */}
                            <p className="mt-6 text-gray-600 text-center">
                                ¿Ya tienes una cuenta?{" "}
                                <Link to="/signin" className="text-primary hover:underline">
                                    Inicia sesión aquí
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};

export default NewPassword;
