import React from "react";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import Paragraph from "../utils/Paragraph";
import services from "../constants/arrays/service";

const Category: React.FC = () => {
  return (
    <section id="category" className="pt-12 pb-16 px-6 w-full">
      <div className="max-w-full sm:max-w-md md:max-w-screen-md lg:max-w-[1200px] mx-auto text-center">
        <Titles text="Categoría" type={titles.DESCRIPTION} styles="font-bold text-primary uppercase tracking-wider" />
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
