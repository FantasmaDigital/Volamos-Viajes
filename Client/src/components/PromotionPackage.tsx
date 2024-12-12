import React from "react";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import Paragraph from "../utils/Paragraph";

const PromotionPackage: React.FC = () => {
    return (
        <div
            className="w-full relative h-full flex flex-col py-5"
            id="promopkg"
            style={{
                backgroundImage: "url('/img/promotionpkg/f1/formula_1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer"
            }}
        >
            {/* Sombra de izquierda a derecha */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                    width: "150%"
                }}
            ></div>
            <div className="text-center text-white z-10 w-full md:w-[80%] m-auto">
                <Titles text="¡Vive la Velocidad del Gran Premio de Fórmula 1!" type={titles.TITLE} styles="font-bold w-[80%] m-auto" />
                <Paragraph paragraph="Prepárate para una experiencia inolvidable en 2025: adrenalina, pasión y lujo. Descubre nuestros exclusivos paquetes y planifica tu viaje a las mejores carreras del mundo" styles="w-[80%] m-auto" />
            </div>
            <div className="w-full lg:w-[80%] h-full m-auto flex flex-col lg:flex-row py-2">
                <div className="flex flex-col w-full h-full">
                    <div className="w-full h-full flex justify-center items-center">
                        <img
                            src="/img/promotionpkg/f1/schedule-f1.png"
                            alt="F1 Schedule"
                            className="h-[33rem] z-20 opacity-80"
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center lg:justify-end items-end p-3 md:p-5 z-10">
                    <img src="/img/promotionpkg/f1/logo-f1.png" alt="" className="h-40 m-auto md:m-0 flex" />
                </div>
            </div>
            <div className="w-full flex justify-center py-5 z-10">
                <button
                    className="px-6 py-3 bg-red-600 text-white font-medium rounded-sm shadow-lg hover:bg-red-700 transition"
                    onClick={() => window.open("https://api.whatsapp.com/send/?phone=+50370200976&text=Hola,%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20calendario%20de%20viajes%20de%20la%20F%C3%B3rmula%201.%20%20%C2%BFPodr%C3%ADan%20proporcionarme%20los%20detalles,%20las%20fechas%20disponibles%20y%20los%20precios?", "_blank")}
                >
                    ¡Reserva Tu Asiento Ahora!
                </button>
            </div>
        </div>
    );
};

export default PromotionPackage;
