import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Paragraph from "../utils/Paragraph";
import styles from "../style/HeroSection.module.css";
import MainTitles from "../utils/MainTitles";
import steps from "../constants/arrays/steps";

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
    className="flex items-start space-x-4"
  >
    <div className="text-3xl">{icon}</div>
    <div>
      <h4 className="text-xl font-semibold text-gray-700">{title}</h4>
      <Paragraph paragraph={description} styles="text-gray-500" />
    </div>
  </motion.div>
);

const EasySteps: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Anima los hijos con un escalonamiento
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <hr className="w-[85%] mx-auto border" />
      <div className="w-[90%] sm:w-[80%] md:w-[80%] mx-auto overflow-hidden">
        <section
          ref={ref}
          className="flex flex-col lg:flex-row items-center justify-between gap-8 py-14"
        >
          {/* Contenido de texto */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="flex flex-col w-auto space-y-6"
          >
            <MainTitles
              topText="Fácil y Rápido"
              bottomText="Reserva tu próximo viaje en 5 sencillos pasos"
            />
            <div className="space-y-6">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </motion.div>

          {/* Contenedor de imágenes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              },
            }}
            className={`${styles.imageContainer} relative mt-10`}
          >
            {/* Imagen principal */}
            <img
              src="/img/herosection/Traveler.png"
              alt="Persona viajando con mochila"
              className={`${styles.heroImage} w-full mx-auto`}
              loading="lazy"
              decoding="async"
            />
            {/* Imagen del avión */}
            <img
              src="/img/herosection/Plane.png"
              alt="Avión volando"
              className={`${styles.planeIcon} absolute top-0 right-0 w-20 opacity-90 transform hover:scale-105 transition duration-500`}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default EasySteps;
