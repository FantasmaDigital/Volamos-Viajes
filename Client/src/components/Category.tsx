import React from "react";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import Paragraph from "../utils/Paragraph";

const services = [
  {
    icon: "🏥",
    title: "Seguros de viajes",
    description: "Cotiza tu asistencia de viajes con nosotros. Contamos con las mejores opciones para que viajes seguro y protegido en todo momento.",
  },
  {
    icon: "✈️",
    title: "Mejores Vuelos",
    description: "¡Tu próximo destino te espera! Te ofrecemos las mejores tarifas aéreas para que disfrutes de unas vacaciones inolvidables.",
  },
  {
    icon: "🚗",
    title: "Renta un auto",
    description: "Experimenta la libertad de conducir el vehículo de tus sueños. Rentar con nosotros es fácil y confiable.",
  },
  {
    icon: "🏨",
    title: "Hoteles",
    description: "Encuentra el hotel ideal para tu viaje. Cotiza con nosotros y asegúrate de tener una estadía perfecta.",
  },
];

const Category: React.FC = () => {
  return (
    <section id="category" className="pt-12 pb-16 px-6 w-full">
      <div className="max-w-full sm:max-w-md md:max-w-screen-md lg:max-w-[1200px] mx-auto text-center">
        <Titles text="Categoría" type={titles.DESCRIPTION} styles="font-bold text-gray-600 uppercase tracking-wider" />
        <Titles text="Ofrecemos los mejores servicios" type={titles.TITLE} styles="text-3xl sm:text-4xl font-extrabold text-text mb-12"/>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="cursor-pointer flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <div className="text-5xl mb-6 text-blue-500">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">{service.title}</h3>
              <Paragraph paragraph={service.description} styles="text-gray-600"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
