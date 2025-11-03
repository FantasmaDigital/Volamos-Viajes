import React, { createContext, useContext, useState, useEffect } from "react";
import { LatLng } from "../../interface/guide/extra.points";

// Definimos el tipo para el contexto
interface LocationContextType {
    defaultRoute: LatLng | null;
    setDefaultRoute: React.Dispatch<React.SetStateAction<LatLng | null>>;
    placeOption: any[]; // Puedes reemplazar `any[]` con el tipo adecuado para tus restaurantes
    setPlaceOption: React.Dispatch<React.SetStateAction<any[]>>;
    getCurrentLocation: (callback: { setDefaultRoute: React.Dispatch<React.SetStateAction<LatLng | null>> }) => void;
}

// Creamos el contexto
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Componente proveedor que envolverá a la aplicación o componentes donde quieras usar el contexto
export const LocationProvider: React.FC<{ children: any }> = ({ children }) => {
    const [defaultRoute, setDefaultRoute] = useState<LatLng | null>(null);
    const [placeOption, setPlaceOption] = useState<any[]>([]);
    const fallbackRoute = { lat: 40.7128, lng: -74.006 };

    // Función para obtener la ubicación actual (puedes ajustarla a tus necesidades)
    const getCurrentLocation = ({ setDefaultRoute }: { setDefaultRoute: React.Dispatch<React.SetStateAction<LatLng | null>> }) => {
        setDefaultRoute(fallbackRoute);
    };

    useEffect(() => {
        getCurrentLocation({ setDefaultRoute });
    }, []);

    return (
        <LocationContext.Provider value={{ defaultRoute, setDefaultRoute, placeOption, setPlaceOption, getCurrentLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation debe ser usado dentro de un LocationProvider");
    }
    return context;
};
