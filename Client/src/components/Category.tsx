import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Titles from "../utils/Titles";
import { titles } from "../constants/enums/titles.enum";
import Paragraph from "../utils/Paragraph";
import services from "../constants/arrays/service";

const Category: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 }); // Se activa cuando el 20% del componente está visible

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Escalona las animaciones de los hijos
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="category" ref={ref} className="pt-12 pb-16 px-6 w-full">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-full sm:max-w-md md:max-w-screen-md lg:max-w-[90%] mx-auto text-center"
      >
        <Titles
          text="Categoría"
          type={titles.DESCRIPTION}
          styles="font-bold text-primary uppercase tracking-wider"
        />
        <Titles
          text="Ofrecemos los mejores servicios"
          type={titles.TITLE}
          styles="text-3xl sm:text-4xl font-extrabold text-text mb-12"
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="cursor-pointer flex flex-col items-center text-center p-8 rounded-xl bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="text-5xl mb-6 text-blue-500">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {service.title}
            </h3>
            <Paragraph paragraph={service.description} styles="text-gray-600" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Category;
