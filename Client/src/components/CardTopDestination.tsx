import React, { useState } from "react";
import { Destination } from "../interface/destination.interface";
import { Link } from "react-router-dom";

interface CardProps {
    destination: Destination;
    isSelected?: boolean;
}

const CardTopDestionation: React.FC<CardProps> = ({ destination, isSelected = false }) => {
    const [newImage, setNewImage] = useState<string>(destination.images[2])

    const cleanDestinationName = (name: string) => {
        // Convertir a minúsculas, reemplazar espacios por guiones y eliminar tildes y caracteres especiales
        return name
          .toLowerCase() // Convertir a minúsculas
          .normalize("NFD") // Descomponer los caracteres acentuados
          .replace(/[\u0300-\u036f]/g, "") // Eliminar los caracteres de acentuación
          .replace(/[^a-z0-9\s\-]/g, "") // Eliminar caracteres especiales, solo dejamos letras, números, espacios y guiones
          .split(' ')[0]; // Tomar solo el primer término (antes del primer espacio)
    };

    return (
        <div className="w-full flex flex-col h-full shadow-2xl p-3 rounded-lg">
            <Link to={`./view/${cleanDestinationName(destination.name)}`} state={{destination}}>
            {
                isSelected ? (
                    <img src={newImage} alt={destination.name}
                        onMouseEnter={() => setNewImage(destination.images[1])}
                        onMouseLeave={() => setNewImage(destination.images[2])}
                        className="transition-all duration-600 ease-in-out rounded-lg"
                        style={{
                            aspectRatio: "1.5 / 1",
                        }}
                    />
                ) : (
                    <img src={newImage} alt={destination.name}
                        className="transition-all duration-600 rounded-lg bg-cover"
                        style={{
                            aspectRatio: "1.5 / 1",
                        }}
                    />
                )
            }
            </Link>
            <div className="w-full pt-2">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
            </div>
        </div>
    )
}

export default CardTopDestionation;