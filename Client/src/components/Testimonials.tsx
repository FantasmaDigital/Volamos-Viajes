import React, { useEffect, useState } from "react";
import MainTitles from "../utils/MainTitles";
import { STAR, ARROW_LEFT, ARROW_RIGHT } from "../constants/Icons";

const testimonials = [
  {
    name: "Pedro L.",
    location: "Tegucigalpa, Honduras",
    quote: "Es lo mejor que nos a ofrecido la vida",
    profileImg: "/img/avatar/default-avatar.png",
  },
  {
    name: "Rox. Corado",
    location: "San Salvador, El Salvador",
    quote: "Lo recomiendo son lo mejor desde el dia 1 que lo solicite estuviron pendiente antes, durante y despues. Mil gracias por todo 🙏🙏🙏💞 excelente servicio",
    profileImg: "/img/avatar/default-avatar.png",
  },
  {
    name: "Joa. Valencia",
    location: "Managua, Nicaragua",
    quote: "Buena atencion y buenas ofertas",
    profileImg: "/img/avatar/default-avatar.png",
  },
];

const Testimonials: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 665);
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="pt-16 pb-60 w-[90%] sm:w-[80%] md:w-[90%] mx-auto">
      <div className="text-center m-auto flex flex-col justify-center">
        <MainTitles
          topText="Testimonios"
          bottomText="Lo que la gente dice sobre nosotros"
          textColor="text-white"
          marginBottom="mb-5"
          textCenter = {true}
        />
        <p className="text-white">
          Escucha lo que nuestros clientes satisfechos tienen que decir sobre sus
          experiencias con nosotros.
        </p>
      </div>
      <div
        className={`mt-12 px-4 md:px-8 lg:px-12 ${isMobile ? "relative overflow-hidden" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}`}
      >
        {isMobile ? (
          <div className="relative flex items-center justify-center">
            <button
              className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
              onClick={handlePrev}
              aria-label="Anterior testimonio"
            >
              {ARROW_LEFT()}
            </button>
            <div
              className="flex gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 50}%)`, width: `${testimonials.length * 50}%` }}
            >
              {testimonials.concat(testimonials).map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-6 rounded-xl shadow-xl glass translate-x-1/2 w-1/2"
                >
                  <div className="flex items-center gap-4 max-w-md w-full">
                    <img
                      src={testimonial.profileImg}
                      alt={`Foto de perfil de ${testimonial.name}`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                    />
                    <div className="flex flex-col justify-center h-full gap-1">
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      {/* <p className="text-white">
                        {testimonial.location}
                      </p> */}
                      <div className="flex flex-row">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span className="text-yellow-400" key={index}>
                            {STAR()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-white italic">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
            <button
              className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
              onClick={handleNext}
              aria-label="Siguiente testimonio"
            >
              {ARROW_RIGHT()}
            </button>
          </div>
        ) : (
          testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass hover:scale-105 cursor-pointer p-6 rounded-xl shadow-xl transition-transform duration-500"
            >
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.profileImg}
                  alt={`Foto de perfil de ${testimonial.name}`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="flex flex-col justify-center h-full gap-1">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  {/* <p className="text-white">{testimonial.location}</p> */}
                  <div className="flex flex-row">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span className="text-yellow-400" key={starIndex}>
                        {STAR()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-white italic">"{testimonial.quote}"</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Testimonials;