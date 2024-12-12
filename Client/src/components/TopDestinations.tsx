import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ARROW_LEFT, ARROW_RIGHT } from "../constants/Icons";
import destinations from "../constants/arrays/destination";
import CardTopDestination from "./CardTopDestination";
import Titles from "../utils/Titles";
import Paragraph from "../utils/Paragraph";

const MemoizedCardTopDestination = React.memo(CardTopDestination);

const TopDestinations: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = destinations.length;
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

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

    useEffect(() => {
        if (currentIndex !== undefined) {
            const slider = document.getElementById("slider");
            if (slider) {
                slider.style.transition = "transform 0.5s ease";
                const widthPercentage = isMobile ? 100 : isTablet ? 50 : 33.33;
                slider.style.transform = `translateX(-${(currentIndex + totalItems) * widthPercentage}%)`;
            }
        }
    }, [currentIndex, totalItems, isMobile, isTablet]);

    return (
        <div id="destinations" className="w-full">
            <div className="w-[90%] lg:w-[85%] m-auto h-full py-16 relative overflow-hidden">
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-5">
                    <div className="flex flex-col text-center md:text-start">
                        <Titles text="Planea tu mejor viaje" styles="text-text" />
                        <Paragraph paragraph="Aprovecha al máximo tu experiencia de viaje" styles="text-gray-600" />
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
                </div>

                <div className="relative w-full h-full my-0 md:my-4">
                    <div
                        id="slider"
                        className="flex transition-transform duration-500 ease-in-out h-full"
                    >
                        {extendedDestinations.map((destination, index) => {
                            const adjustedIndex = index % totalItems;
                            const isCenter = adjustedIndex === (currentIndex + 1) % totalItems;

                            return (
                                <div
                                    key={index}
                                    className={`flex-shrink-0 transition-transform duration-500 bg-cardBackground rounded-md ${isCenter ? "scale-[1.01]" : "scale-90"
                                        }`}
                                    style={{
                                        width: isMobile ? "100%" : isTablet ? "50%" : "33.33%",
                                        transformOrigin: "center",
                                    }}
                                >
                                    <MemoizedCardTopDestination
                                        destination={destination}
                                        isSelected={isCenter}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Controles móviles */}
                {isMobile && (
                    <div className="flex flex-row gap-8 text-2xl items-center justify-center mt-5">
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
                )}
            </div>
        </div>
    );
};

export default TopDestinations;
