import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GALLERY, INFO } from "../../constants/Icons";
import { detailItems } from "../../constants/enums/details.enum";
import ViewInformation from "../../components/ViewInformation";
import ViewGallery from "../../components/ViewGallery";
import { useSpring, animated } from "react-spring";
import { scrollToTop } from "../../utils/functions/topScroll";
import Header from "../../components/Navbar";
import ScrollToTop from "../../components/ScrollTopBtn";
import Footer from "../../components/Footer";
import WhatsAppBtn from "../../components/WhatsAppBtn";
import { Helmet } from "react-helmet";

const ViewDestination: React.FC = () => {
    const location = useLocation();
    const { destination } = location.state || {};
    const [showModule, setShowModule] = useState<string>(detailItems.INFORMATION);

    useEffect(() => {
        scrollToTop()
    }, [])

    // Optimized function to handle module styling
    const setStyle = useMemo(() => {
        return (itemStyle: string) =>
            `font-semibold w-full h-full py-4 rounded-sm shadow-2xl text-center flex flex-row gap-1 justify-center items-center hover:bg-secondary hover:text-white text-gray-900 transition-all ease-in-out duration-300 hover:cursor-pointer hover:shadow-2xl ${showModule === itemStyle && 'bg-primary text-white'}`;
    }, [showModule]);

    // Dynamically rendering the selected module based on the showModule state
    const renderModule = useMemo(() => {
        switch (showModule) {
            case detailItems.INFORMATION:
                return <ViewInformation destination={destination} />;
            case detailItems.GALLERY:
                return <ViewGallery destination={destination} />;
            default:
                return <ViewInformation destination={destination} />;
        }
    }, [destination, showModule]);

    // Animaciones con React Spring
    const fadeIn = useSpring({
        opacity: 1,
        transform: "translateY(0)",
        from: { opacity: 0, transform: "translateY(30px)" },
        config: { tension: 300, friction: 35 }
    });

    return (
        <div className="w-full h-full bg-gray-100">
            {/* SEO Meta tags */}
            <Helmet>
                <title>{destination.name} | Volamos Viajes</title>
                <meta name="description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
                <meta name="keywords" content={`viajes, vacaciones, destinos, paquetes de viaje, turismo, promociones de viajes, ${destination.name}`} />
                <meta name="author" content="Volamos Viajes" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph */}
                <meta property="og:title" content={`${destination.name} | Volamos Viajes`} />
                <meta property="og:description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
                <meta property="og:image" content={destination.images[2]} />
                <meta property="og:image:alt" content={`Disfruta de tus vacaciones en ${destination.name}`} />
                <meta property="og:url" content={`https://volamosviajes.com/${destination.name}`} />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="es_ES" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${destination.name} | Volamos Viajes`} />
                <meta name="twitter:description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
                <meta name="twitter:image" content={destination.images[2]} />
                <meta name="twitter:image:alt" content={`Disfruta de tus vacaciones en ${destination.name}`} />
                <meta name="twitter:site" content="@VolamosViajes" />
                <meta name="twitter:creator" content="@VolamosViajes" />

                {/* Additional meta tags */}
                <link rel="canonical" href={`https://volamosviajes.com/${destination.name}`} />
                <meta property="og:site_name" content="Volamos Viajes" />
                <meta name="theme-color" content="#0e3d5e" />
                <meta name="apple-mobile-web-app-title" content="Volamos Viajes" />
                <meta name="application-name" content="Volamos Viajes" />
                <meta name="msapplication-TileColor" content="#1f567a" />
                <meta name="msapplication-TileImage" content="https://volamosviajes.com/img/logo.png" />

                {/* Favicon and resources */}
                <link rel="icon" href="https://volamosviajes.com/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="https://volamosviajes.com/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="https://volamosviajes.com/img/favicon-32x32.png" />
                <link rel="manifest" href="https://volamosviajes.com/site.webmanifest" />
            </Helmet>
            <Header color="white" />
            <div
                style={{
                    backgroundImage: `url(${destination.images[2]})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center bottom',
                }}
                className="relative h-[40rem] flex justify-center items-center pt-8"
            >
                <div className="absolute inset-0 bg-black opacity-50" />
                <div className="flex flex-col mb-32">
                    <h3 className="text-4xl py-10 font-bold text-white z-10 text-center text-shadow-custom">Explora</h3>
                    <h1 className="relative text-[4rem] md:text-9xl text-white great-vibes text-shadow-custom text-center">
                        {destination.name}
                    </h1>
                </div>
            </div>

            {/* Sección de Contenido */}
            <main className="py-8 px-0 md:px-0 space-y-8 w-full md:w-[90%] xl:w-[80%] m-auto -translate-y-[5rem] -my-[5rem]">
                <section className="bg-white p-2 rounded-lg shadow-2xl">
                    <div className="w-full">
                        <ul className="w-full flex flex-row justify-around gap-2">
                            {/* Elementos de la lista con animación */}
                            <animated.li
                                className={setStyle(detailItems.INFORMATION)}
                                onClick={() => setShowModule(detailItems.INFORMATION)}
                            >
                                <span className="font-semibold">{INFO()}</span> Información
                            </animated.li>

                            <animated.li
                                className={setStyle(detailItems.GALLERY)}
                                onClick={() => setShowModule(detailItems.GALLERY)}
                            >
                                <span className="font-semibold">{GALLERY()}</span> Galería
                            </animated.li>
                        </ul>
                    </div>

                    {/* Módulo con animación de transición */}
                    <div className="pt-5 pb-10">
                        <animated.div style={fadeIn}>
                            {renderModule}
                        </animated.div>
                    </div>
                </section>
            </main>
            <Footer isMain={false} />
            <WhatsAppBtn />
            <ScrollToTop />
        </div>
    );
};

export default ViewDestination;
