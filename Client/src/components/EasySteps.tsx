import React from 'react';
import Paragraph from '../utils/Paragraph';
import styles from "../style/HeroSection.module.css";
import MainTitles from '../utils/MainTitles';
import steps from '../constants/arrays/steps';

const EasySteps: React.FC = () => {
  return (
    <>
      <hr className='w-[85%] m-auto border' />
      <div className="w-[90%] sm:w-[80%] md:w-[80%] m-auto overflow-hidden">
        <section className="flex flex-col lg:flex-row items-center justify-between gap-4 py-14">
          <div className="flex flex-col w-auto">
            <MainTitles topText='Fácil y Rápido' bottomText='Reserva tu próximo viaje en 5 sencillos pasos'/>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-3xl">{step.icon}</div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-700">{step.title}</h4>
                    <Paragraph paragraph={step.description} styles='text-gray-500' />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.imageContainer} relative mt-10`}>
            <img
              src={'./img/herosection/Traveler.png'}
              alt="Viajero"
              className={`${styles.heroImage} w-full mx-auto`}
            />
            <img
              src={`./img/herosection/Plane.png`}
              alt="Avión volando"
              className={`${styles.planeIcon} absolute top-0 right-0 w-20 opacity-90 transform hover:scale-105 transition duration-500`}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default EasySteps;


