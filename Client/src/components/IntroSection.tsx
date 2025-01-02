import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MainTitles from "../utils/MainTitles";
import Paragraph from "../utils/Paragraph";
import classNames from "classnames";
import { promotions } from "../constants/arrays/promotions";

const IntroSection: React.FC = () => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCarouselClick = () => {
    const promoMessage =
      "Hola, me gustaría saber más sobre las promociones que están en su sitio web (Rent A Car)";
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=+50370200976&text=${promoMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div
        id="rentacar"
        className="pt-20 pb-10 w-[90%] sm:w-[80%] md:w-[85%] m-auto rounded-lg flex flex-col lg:flex-row items-center md:items-start text-center md:text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex flex-col-reverse"
        >
          <div className="md:w-full mb-10 lg:mb-0 mt-6 md:mt-0 flex justify-end items-end h-full">
            <img
              src="https://di-uploads-pod10.dealerinspire.com/schumachereuropeanredesign/uploads/2021/11/1000x400_Model_Image-2.png"
              alt="Rental Cars"
              className="w-full sm:w-[80%] rounded-md m-auto"
            />
          </div>
          <div className="md:w-full md:pr-6">
            <div className="w-[90%] m-auto">
              <MainTitles
                topText="Renta un auto"
                bottomText="Renta el carro de tus sueños con nosotros"
                marginBottom="mb-3"
              />
              <Paragraph
                paragraph="Explora nuevos destinos con total libertad y comodidad. Con nuestra amplia variedad de vehículos, puedes elegir el auto perfecto para tu viaje, ya sea para un paseo corto o una aventura larga. ¡Haz de cada kilómetro una experiencia inolvidable!"
                styles="text-gray-700"
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full flex justify-center items-center"
        >
          {inView && (
            <iframe
              src="https://volamosviajes.carrentalnet.com/en-us/widgets/search"
              width="500"
              height="500"
              className="rounded-sm border-2"
              title="Car Rental Search"
            />
          )}
        </motion.div>
      </div>
      <div
        className={classNames(
          "py-1 w-full z-10 transition-colors duration-300 bg-gradient-to-r from-primary via-secondary to-secondary px-4 hover:cursor-pointer"
        )}
        style={{ borderBottom: "1px solid #ccc" }}
        onClick={handleCarouselClick}
      >
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
          >
            {promotions.map((promo, index) => (
              <div key={index} className="flex-none w-full text-center">
                <p className="text-sm text-white font-semibold">{promo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IntroSection;
