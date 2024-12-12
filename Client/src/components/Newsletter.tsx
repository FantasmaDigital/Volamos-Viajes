import React, { useState } from "react";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import { sanitizeInput } from "../utils/functions/sanitizeInput";

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            const sanitizedEmail = sanitizeInput(email);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/suscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: sanitizedEmail }),
            });

            if (!response.ok) {
                throw new Error("Error al suscribirse. Inténtalo nuevamente.");
            }

            setSuccess("¡Suscripción exitosa! Te mantendremos informado sobre nuestras promociones y novedades.");
        } catch (err: any) {
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full xl:w-[80%] gap-2 bg-background shadow-2xl min-h-72 rounded-2xl flex flex-row px-4 pt-4 justify-between absolute bottom-0 left-0 xl:left-[10%] z-10 translate-y-1/2">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="pb-5">
                    <Titles text="Suscríbete a nuestro boletín" type={titles.TITLE} styles="text-text text-center" />
                    <Titles text="Mantente informado de todas las novedades" type={titles.DESCRIPTION} styles="text-secondary mt-0 text-center" />
                </div>
                <form className="w-full max-w-md flex flex-row gap-2" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Tu correo electrónico"
                        className="w-full px-4 py-3 border rounded-sm shadow-xl"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className={`px-6 py-3 ${loading ? "bg-gray-400" : "bg-primary hover:bg-secondary"} cursor-pointer text-white rounded-sm transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? "Enviando..." : "Suscribirse"}
                    </button>
                </form>
                {success && <p className="text-green-500 mt-2">{success}</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <img src="./img/newsletter/mailbox.png" alt="Buzón" className="h-72 hidden lg:block" />
        </div>
    );
};

export default Newsletter;
