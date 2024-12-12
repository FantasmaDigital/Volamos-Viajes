// Footer.tsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import HeroLogo from './HeroLogo';
import { scrollToTop } from '../utils/functions/topScroll';
import { WA_URI } from '../constants/URIS';
import { useNavigate } from "react-router-dom";

export const WhatsAppTexts = {
    support: "Necesito soporte técnico. ¿Podrían ayudarme?",
    faq: "Tengo algunas preguntas frecuentes.",
    directContact: "Me gustaría contactar directamente con un representante.",
    promotions: "¿Cuáles son las promociones disponibles?",
    lowFareTips: "¿Tienen algún consejo sobre tarifas bajas?"
};

const Footer: React.FC<{isMain?:boolean}> = ({isMain=true}) => {
    const navigateTo = useNavigate();

    const smoothScrollToSection = (sectionId: string) => {
        const currentPath = window.location.pathname;

        // Si no estamos en la página principal, redirigir primero
        if (currentPath !== "/") {
            navigateTo("/", { replace: true });
        }

        setTimeout(() => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, currentPath !== "/" ? 300 : 0); // Dar tiempo suficiente para la redirección
    };

    return (
        <footer className={`bg-primary ${isMain ? 'pt-48' : 'pt-12'} pb-6 px-6 md:px-20 lg:px-32 text-center md:text-left text-background w-full`}>
            <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">
                {/* Logo y Descripción */}
                <div className="col-span-1 md:col-span-2 flex flex-col justify-center items-center md:items-start md:justify-start">
                    <HeroLogo callback={scrollToTop} color='white'/>
                    <p className="text-accentBackground mt-4">
                        Reserva tu viaje en minutos, obtén control total por mucho más tiempo.
                    </p>
                </div>

                {/* Enlaces - Empresa */}
                <div className='mt-2 md:mt-0'>
                    <h2 className="font-semibold text-lg text-background">Empresa</h2>
                    <ul className="mt-4 space-y-4">
                        <li><a href="#" className="hover:text-secondary">Acerca de</a></li>
                        <li><button onClick={() => smoothScrollToSection('category')} className="hover:text-secondary">Categorías</button></li>
                        <li><button onClick={() => smoothScrollToSection('rentacar')} className="hover:text-secondary">Autos</button></li>
                        <li><button onClick={() => smoothScrollToSection('destinations')} className="hover:text-secondary">Destinos</button></li>
                    </ul>
                </div>

                {/* Enlaces - Contacto */}
                <div className='mt-2 md:mt-0'>
                    <h2 className="font-semibold text-lg text-background">Contacto</h2>
                    <ul className="mt-4 space-y-4">
                        <li><a href={`${WA_URI}&text=${encodeURIComponent(WhatsAppTexts.support)}`} className="hover:text-secondary">Soporte</a></li>
                        <li><a href="#" className="hover:text-secondary">Preguntas Frecuentes</a></li>
                        <li><a href={`${WA_URI}&text=${encodeURIComponent(WhatsAppTexts.directContact)}`} className="hover:text-secondary">Contacto directo</a></li>
                    </ul>
                </div>

                {/* Enlaces - Más */}
                <div className='mt-2 md:mt-0'>
                    <h2 className="font-semibold text-lg text-background">Más</h2>
                    <ul className="mt-4 space-y-4">
                        <li><a href={`${WA_URI}&text=${encodeURIComponent(WhatsAppTexts.promotions)}`} className="hover:text-secondary">Promociones</a></li>
                        <li><a href="#" className="hover:text-secondary">Tarifas de aerolíneas</a></li>
                        <li><a href={`${WA_URI}&text=${encodeURIComponent(WhatsAppTexts.lowFareTips)}`} className="hover:text-secondary">Consejos de tarifas bajas</a></li>
                    </ul>
                </div>

                {/* Iconos sociales */}
                <div className="flex justify-center md:justify-start space-x-6 mt-6 md:mt-0">
                    <a href="https://www.facebook.com/Volamosviajes/" target="_blank" className="text-accentBackground hover:text-secondary"><FaFacebookF /></a>
                    <a href="https://www.instagram.com/volamosviajes/?hl=es-la" target="_blank" className="text-accentBackground hover:text-secondary"><FaInstagram /></a>
                    <a href="https://www.tiktok.com/@volamosviajes" target="_blank" className="text-accentBackground hover:text-secondary"><FaTiktok /></a>
                    {/* <a href="#" target="_blank" className="text-accentBackground hover:text-secondary"><FaTwitter /></a> */}
                </div>
            </div>

            <hr className='mt-12 mb-6 border-accentBackground' />

            <p className="text-accentBackground text-sm text-center mt-6">
                © {new Date().getFullYear()} Volamos Viajes. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;
