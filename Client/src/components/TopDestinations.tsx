import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ARROW_LEFT, ARROW_RIGHT } from "../constants/Icons";
import destinations from "../constants/arrays/destination";
import CardTopDestination from "./CardTopDestination";
import MainTitles from "../utils/MainTitles";

const MemoizedCardTopDestination = React.memo(CardTopDestination);

const TopDestinations: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    const totalItems = destinations.length;
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    // Detectar si estamos en móvil o tablet
    useEffect(() => {
        const updateDeviceType = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width > 768 && width <= 1024);
        };
        window.addEventListener("resize", updateDeviceType);
        updateDeviceType();
        return () => window.removeEventListener("resize", updateDeviceType);
    }, []);

    const extendedDestinations = useMemo(
        () => destinations.concat(destinations, destinations),
        []
    );

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalItems - 1 : prevIndex - 1
        );
    }, [totalItems]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalItems - 1 ? 0 : prevIndex + 1
        );
    }, [totalItems]);

    return (
        <div id="destinations" className="w-full" ref={ref}>
            <div className="w-[90%] lg:w-[85%] m-auto h-full py-16 relative overflow-hidden">
                {/* Títulos */}
                <motion.div
                    className="w-full flex flex-col md:flex-row justify-between items-center mb-1 lg:mb-5"
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col text-center w-full lg:w-[80%] m-auto">
                        <MainTitles
                            topText="Planea tu mejor viaje"
                            bottomText="Aprovecha al máximo tu experiencia de viaje"
                            marginBottom="mb-3"
                        />
                    </div>
                    <div className="hidden md:flex flex-row gap-8 text-2xl items-center justify-center px-4">
                        <button
                            className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full"
                            onClick={handlePrev}
                            aria-label="Destino anterior"
                        >
                            {ARROW_LEFT()}
                        </button>
                        <button
                            className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full"
                            onClick={handleNext}
                            aria-label="Siguiente destino"
                        >
                            {ARROW_RIGHT()}
                        </button>
                    </div>
                </motion.div>

                {/* Slider */}
                <motion.div
                    className="relative w-full h-full my-0 md:my-4"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div
                        id="slider"
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{
                            transform: `translateX(-${(currentIndex + totalItems) * (isMobile ? 100 : isTablet ? 50 : 33.33)}%)`,
                        }}
                    >
                        {extendedDestinations.map((destination, index) => {
                            const adjustedIndex = index % totalItems;
                            const isCenter = adjustedIndex === (currentIndex + 1) % totalItems;

                            return (
                                <motion.div
                                    key={index}
                                    className={`flex-shrink-0 bg-cardBackground rounded-md ${isCenter ? "scale-[1.01]" : "scale-90"}`}
                                    style={{
                                        width: isMobile ? "100%" : isTablet ? "50%" : "33.33%",
                                        transformOrigin: "center",
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: isCenter ? 1.05 : 0.9 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <MemoizedCardTopDestination
                                        destination={destination}
                                        isSelected={isCenter}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Controles móviles */}
                {isMobile && (
                    <motion.div
                        className="flex flex-row gap-8 text-2xl items-center justify-center mt-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <button
                            className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full"
                            onClick={handlePrev}
                            aria-label="Destino anterior"
                        >
                            {ARROW_LEFT()}
                        </button>
                        <button
                            className="text-white hover:scale-110 transition-all duration-200 bg-secondary hover:bg-primary p-3 rounded-full"
                            onClick={handleNext}
                            aria-label="Siguiente destino"
                        >
                            {ARROW_RIGHT()}
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TopDestinations;
