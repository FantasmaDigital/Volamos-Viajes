import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { FRONT_URI } from "../constants/URIS";

const WhatsAppBtn: React.FC = () => {
    const props = {
        text: "Contáctanos en WhatsApp",
        number: "+50370200976", // Asegúrate de que este número esté correcto
        company: "Volamos Viajes",
        message: "¿Tienes preguntas sobre nuestros destinos? 🤔🌍 \n¡Estamos aquí para ayudarte! 💬🙂",
        avatar: `${FRONT_URI}/favicon.ico`, // Verifica que la ruta sea correcta
    };

    return (
        <FloatingWhatsApp
            phoneNumber={props.number}
            accountName={props.company}
            chatMessage={props.message}
            avatar={props.avatar}
            style={{ 
                bottom: '30px',  // Ajuste según el diseño
                left: '30px',    // Ajuste según el diseño
                zIndex: 1000,    // Para que el botón esté por encima de otros elementos
            }}
        />
    );
};

export default WhatsAppBtn;
