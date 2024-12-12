import React from 'react';
import Paragraph from '../utils/Paragraph';
import styles from "../style/HeroSection.module.css";
import MainTitles from '../utils/MainTitles';

const steps = [
  {
    icon: '🌍',
    title: 'Elige el Destino',
    description: 'Selecciona el destino que deseas visitar. Encuentra las mejores opciones de viaje según tus preferencias y presupuesto.',
  },
  {
    icon: '📞',
    title: 'Contacta con Nosotros',
    description: 'Si tienes dudas o necesitas asistencia, nuestro equipo de atención al cliente está listo para ayudarte a planificar tu viaje.',
  },
  {
    icon: '✔️',
    title: 'Elige la Opción que Más te Convenga',
    description: 'Selecciona entre nuestras opciones personalizadas para encontrar la que mejor se adapte a tus necesidades de viaje.',
  },
  {
    icon: '💳',
    title: 'Realiza el Pago',
    description: 'Completa tu compra de manera rápida y segura. Aceptamos múltiples métodos de pago para tu comodidad.',
  },
  {
    icon: '🛫',
    title: 'Llega al Aeropuerto en la Fecha Seleccionada',
    description: 'El día de tu viaje, llega al aeropuerto en la hora y fecha elegidas. Te proporcionamos toda la información para un check-in sin estrés.',
  },
];

const EasySteps: React.FC = () => {
  return (
    <>
      <hr className='w-[85%] m-auto border' />
      <div className="w-[90%] sm:w-[80%] md:w-[85%] m-auto overflow-hidden">
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


