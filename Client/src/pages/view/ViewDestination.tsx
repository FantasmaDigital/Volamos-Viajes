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
            <Footer isMain={false}/>
            <WhatsAppBtn />
            <ScrollToTop />
        </div>
    );
};

export default ViewDestination;
