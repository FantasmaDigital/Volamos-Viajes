import React, { useEffect, useState } from 'react';
import MainTitles from '../utils/MainTitles';
import Paragraph from '../utils/Paragraph';
import classNames from 'classnames';

// Sample promotions
const promotions = [
  "🚗 Miami desde $39 por día *Restricciones aplican",
  "🚗 Los Ángeles desde $35 por día *Restricciones aplican",
  "🚗 Orlando desde $38 por día *Restricciones aplican",
  "🚗 Monterrey desde $66 por día *Restricciones aplican",
  "🚗 Fort Lauderdale desde $43 por día *Restricciones aplican",
];

const IntroSection: React.FC = () => {
  const [showIframe, setShowIframe] = useState(false);


  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  // Function to change the promotion every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
    }, 5000); // Change promo every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleCarouselClick = () => {
    const promoMessage = `Hola, me gustaría saber más sobre las promociones que están en su sitio web (Rent A Car)`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=+50370200976&text=${promoMessage}`;
    window.open(whatsappUrl, "_blank"); // Open WhatsApp with the message
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowIframe(true);  // Mostrar el iframe cuando el scroll es mayor a 400px
      } else {
        setShowIframe(false); // Ocultar el iframe cuando el scroll es menor a 400px
      }
    };

    window.addEventListener('scroll', handleScroll); // Agregar el listener de scroll

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id='rentacar' className="pt-20 pb-10 w-[90%] sm:w-[80%] md:w-[85%] m-auto rounded-lg flex flex-col lg:flex-row items-center md:items-start text-center md:text-left h-min">
        <div className='w-full flex flex-col-reverse'>
          <div className="md:w-full mb-10 lg:mb-0 mt-6 md:mt-0 flex justify-end items-end h-full">
            <img
              src="https://di-uploads-pod10.dealerinspire.com/schumachereuropeanredesign/uploads/2021/11/1000x400_Model_Image-2.png"
              alt="Rental Cars"
              className="w-full sm:w-[80%] rounded-md m-auto"
            />
          </div>
          <div className="md:w-full md:pr-6">
            <div className="w-[90%] m-auto">
              <MainTitles topText='Renta un auto' bottomText='Renta el carro de tus sueños con nosotros' marginBottom='mb-3' />
              <Paragraph paragraph='Explora nuevos destinos con total libertad y comodidad. Con nuestra amplia variedad de vehículos, puedes elegir el auto perfecto para tu viaje, ya sea para un paseo corto o una aventura larga. ¡Haz de cada kilómetro una experiencia inolvidable!' styles='text-gray-700' />
            </div>
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
          {
            showIframe && (
              <iframe
                src="https://volamosviajes.carrentalnet.com/en-us/widgets/search"
                width="500"
                height="500"
                className="rounded-sm border-2"
                title="Car Rental Search"
              />
            )
          }
        </div>
      </div>

      <div
        className={classNames(
          "py-1 w-full z-10 transition-colors duration-300 bg-gradient-to-r from-primary via-secondary  to-secondary px-4 hover:cursor-pointer",
        )}
        style={{ borderBottom: "1px solid #ccc", }}
        onClick={handleCarouselClick} // Add the onClick handler
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
