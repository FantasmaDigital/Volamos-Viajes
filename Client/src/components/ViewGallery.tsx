import React, { useCallback, useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Destination } from "../interface/destination.interface";
import { ARROW_LEFT, ARROW_RIGHT } from "../constants/Icons";
import TitleAndStars from "./TitleAndStars";
import Paragraph from "../utils/Paragraph";

// Usar React.memo para evitar renders innecesarios
const ImageItem: React.FC<{ src: string, alt: string, onClick: () => void }> = React.memo(({ src, alt, onClick }) => {
    return (
        <img
            src={src}
            alt={alt}
            onClick={onClick}
            className="rounded-md shadow-xl object-cover w-full h-[12rem] cursor-pointer"
            loading="lazy" // Cargar perezosamente
        />
    );
});

interface PropsViewGallery {
    destination: Destination;
}

const ViewGallery: React.FC<PropsViewGallery> = ({ destination }) => {
    const [viewImage, setViewImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [direction, setDirection] = useState<"left" | "right">("right");
    const [loading, setLoading] = useState<boolean>(false); // Estado de carga de imagen

    const setNewImage = useCallback((index: number, dir: "left" | "right") => {
        if (index >= 0 && index < destination.images.length) {
            setLoading(true); // Inicia el estado de carga cuando se cambia la imagen
            setCurrentIndex(index);
            setViewImage(destination.images[index]);
            setDirection(dir);
        }
    }, [destination.images.length]);

    const handleNext = useCallback(() => {
        const newIndex = (currentIndex + 1) % destination.images.length;
        setNewImage(newIndex, "right");
    }, [currentIndex, destination.images.length, setNewImage]);

    const handlePrev = useCallback(() => {
        const newIndex = (currentIndex - 1 + destination.images.length) % destination.images.length;
        setNewImage(newIndex, "left");
    }, [currentIndex, destination.images.length, setNewImage]);

    // Manejo de eventos de teclado solo una vez al principio
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrev();
            } else if (e.key === "ArrowRight") {
                handleNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handlePrev, handleNext]);

    // Usamos useMemo para evitar que se recalcule las imágenes innecesariamente
    const images = useMemo(() => destination.images, [destination.images]);

    // Simulamos el final de la carga de la imagen con un timeout (ajústalo según el tamaño real de las imágenes)
    useEffect(() => {
        if (viewImage) {
            const timer = setTimeout(() => setLoading(false), 500); // Ajuste de tiempo de espera
            return () => clearTimeout(timer);
        }
    }, [viewImage]);

    return (
        <>
            <div className="w-[95%] m-auto pb-5">
                <TitleAndStars name={destination.name} />
                <Paragraph
                    paragraph={`Explora la belleza única de ${destination.name.split(',')[0]}, un destino lleno de historia, cultura y vistas impresionantes. Ya sea que busques relajarte en sus paisajes, disfrutar de su gastronomía o sumergirte en su vida local, este lugar promete una experiencia inolvidable para todo tipo de viajeros.`}
                />
            </div>
            <div className="relative w-[95%] m-auto mb-10">
                {viewImage && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-opacity-60 text-white z-10"
                        onClick={() => setViewImage(null)}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrev();
                            }}
                            className="absolute left-5 text-2xl z-40 bg-black bg-opacity-50 p-2 rounded-full"
                        >
                            {ARROW_LEFT()}
                        </button>

                        {/* Animación con transición de Spring mientras la imagen está cambiando */}
                        <motion.img
                            src={viewImage}
                            alt="Selected View"
                            key={viewImage}
                            className="rounded-md shadow-2xl z-20 object-cover w-[800px] h-[400px]"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            className="absolute right-5 text-2xl z-20 bg-black bg-opacity-50 p-2 rounded-full"
                        >
                            {ARROW_RIGHT()}
                        </button>
                    </div>
                )}

                {/* Indicador de carga */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-opacity-60 z-20">
                        <motion.div
                            className="spinner-border text-white"
                            animate={{ rotate: 360 }}
                            transition={{ loop: Infinity, duration: 1, ease: "linear" }}
                        />
                    </div>
                )}

                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ${viewImage ? 'opacity-30' : 'opacity-100'}`}>
                    {images.map((image, index) => (
                        <ImageItem
                            key={index}
                            src={image}
                            alt={destination.name}
                            onClick={() => setNewImage(index, "right")}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ViewGallery;
