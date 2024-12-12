import React, { useState } from "react";
import styles from "../style/HeroSection.module.css";
import Paragraph from "../utils/Paragraph";
import { sanitizeInput } from "../utils/functions/sanitizeInput";
import emailjs from "emailjs-com"; 
import { Alert } from "@mui/material";

const HeroSection: React.FC = () => {
  const [showMessage, setShowMessage] = useState<any>(null);
  const [severity, setSeverity] = useState<any>(null);

  const [formData, setFormData] = useState({
    email: "",
    destination: "",
  }); 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = sanitizeInput(formData.email);
    const sanitizedDestination = sanitizeInput(formData.destination);

    // Aquí va el código para enviar el correo
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID, // Reemplaza con tu ID de servicio de EmailJS
        import.meta.env.VITE_TEMPLATE_ID, // Reemplaza con tu ID de plantilla
        {
          email: sanitizedEmail,
          destination: sanitizedDestination,
        },
        import.meta.env.VITE_USER_ID // Reemplaza con tu ID de usuario de EmailJS
      )
      .then(
        () => {
          setShowMessage("¡Gracias por tu mensaje! En unos minutos, uno de nuestros asistentes se pondrá en contacto contigo para responder a tu consulta.");
          setSeverity("success");
          formData.email = "",
          formData.destination = "";
          setTimeout(() => {
            setShowMessage(null)
            setSeverity(null);
          }, 5000);
        },
        () => {
          setShowMessage("Hubo un problema al enviar tu mensaje. Por favor, inténtalo nuevamente más tarde.");
          setSeverity("error");
          setTimeout(() => {
            setShowMessage(null)
            setSeverity(null);
          }, 2500);
        }
      );
  };

  return (
    <div
      className="w-full shadow-[0px_0px_19px_7px_rgba(204,_204,_204,_1)] z-10 h-[45rem] sm:h-[30rem] md:h-[35rem] lg:h-[43rem] flex justify-center"
      style={{
        backgroundImage: 'url("/img/background/main-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        position: 'relative',
      }}
    >
      <section className={`${styles.heroContainer}`}>
        <div className={`${styles.textContent}`}>
          <img src="/img/others/v-decorate.png" alt="Decoración" className="mb-5 md:mb-10" />
          <h1 className={`${styles.title} text-white text-4xl sm:text-5xl font-bold leading-tight`}>
            Viaja, disfruta y vive una vida nueva y completa
          </h1>
        </div>

        <Paragraph paragraph="Cuéntanos, ¿cuál es tu siguiente destino? Nos encantaría saberlo." styles="mt-2 md:mt-6 mb-2 text-white" />

        <div className="gap-4 glass px-4 py-3 max-w-2xl w-full">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row md:flex-row gap-4">
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-none transition duration-300"
              placeholder="Correo electronico"
              required
            />
            <input
              id="destination"
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-none transition duration-300"
              placeholder="Destino"
              required
            />
            <input
              type="submit"
              value="Enviar"
              className="bg-primary px-5 py-2 md:py-0 rounded-sm text-white hover:bg-secondary hover:cursor-pointer"
            />
          </form>
          {
            showMessage && (
              <div className="pt-2">
                <Alert severity={severity}>{showMessage}</Alert>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
