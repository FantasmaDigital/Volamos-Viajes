import React from "react";

interface HandleSearchStartPointProps {
    startPoint: any;
    map: any;
}

interface GetCurrentLocationProps{
    setDefaultRoute:any;
}

export const handleSearchStartPoint: React.FC<HandleSearchStartPointProps> = ({ startPoint, map }) => {
    if (startPoint && map) {
        // Centrar el mapa directamente en el punto A
        map.panTo(startPoint);

        // Opcional: Animación para acercar el zoom
        const targetZoom = 20; // Nivel de zoom deseado
        const currentZoom = map.getZoom() || 2;
        const step = (targetZoom - currentZoom) / 10; // Incremento del zoom en 10 pasos
        let count = 0;

        const interval = setInterval(() => {
            if (count < 10) {
                map.setZoom(currentZoom + step * count);
                count++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Intervalo de 50 ms por cada paso
    }
    return null;
};

export const getCurrentLocation:React.FC<GetCurrentLocationProps> = ({setDefaultRoute}) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log("Ubicación actual:", currentLocation);
                setDefaultRoute(currentLocation); // Establecer la ubicación actual como punto de inicio
            },
            (error) => {
                console.error("Error al obtener la ubicación: ", error);
                // Establecer una ubicación predeterminada si la geolocalización falla
                setDefaultRoute({ lat: 40.7128, lng: -74.0060 }); // Nueva York como fallback
            }
        );
    } else {
        console.error("La geolocalización no está disponible en este navegador.");
        setDefaultRoute({ lat: 40.7128, lng: -74.0060 }); // Nueva York como fallback
    }
    return null;
};