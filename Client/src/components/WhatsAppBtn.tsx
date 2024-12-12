import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { FRONT_URI } from "../constants/URIS";

const WhatsAppBtn: React.FC = () => {
    const props = {
        text: "Contáctanos en WhatsApp",
        number: "+50370200976",
        company: "Volamos Viajes", // Agregamos el nombre de la empresa
        message: "¿Tienes preguntas sobre nuestros destinos? 🤔🌍 \n¡Estamos aquí para ayudarte! 💬🙂",
        avatar: `${/favicon.ico`
    };

    return (
        <FloatingWhatsApp 
            phoneNumber={props.number}
            accountName={props.company}
            chatMessage={props.message}
            avatar={props.avatar}
            style={{ 
                bottom: '30px', // Ajusta la distancia desde el fondo
                left: '30px',   // Ajusta la distancia desde el borde izquierdo
                zIndex: 1000,   // Asegura que el botón quede por encima de otros elementos
            }}
        />
    );
};

export default WhatsAppBtn;
