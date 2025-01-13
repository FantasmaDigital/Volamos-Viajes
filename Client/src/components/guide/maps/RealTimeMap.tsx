import React, { useEffect, useRef, useState, useCallback } from "react";
import { getCurrentLocation, handleSearchStartPoint } from "../../../utils/functions/guide/Maps";

declare const google: any;

type LatLng = {
  lat: number;
  lng: number;
};

const RealTimeMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [travelMode, setTravelMode] = useState<string>("WALKING");
  const [defaultRoute, setDefaultRoute] = useState<LatLng | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<any>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const initialLocation = defaultRoute || { lat: 40.7128, lng: -74.0060 }; // Nueva York como valor predeterminado
      const newMap = new google.maps.Map(mapRef.current, {
        center: initialLocation, // Default center
        zoom: 15, // Default zoom
      });
      setMap(newMap);

      const renderer = new google.maps.DirectionsRenderer({
        map: newMap,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: "#007BFF",
          strokeWeight: 6,
        },
      });
      setDirectionsRenderer(renderer);
    }
  }, [mapRef, map, defaultRoute]);

  const handlePlaceChange = (inputRef: React.RefObject<HTMLInputElement>, setter: (location: LatLng) => void) => {
    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setter(location);
      }
    });
  };

  useEffect(() => {
    getCurrentLocation({setDefaultRoute});
  }, []);

  const calculateRoute = useCallback(() => {
    if (startPoint && endPoint && directionsRenderer) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPoint,
          destination: endPoint,
          travelMode: google.maps.TravelMode[travelMode],
        },
        (result: any, status: string) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);

            // Obtener el tiempo estimado del primer tramo
            const leg = result.routes[0].legs[0];
            const duration = leg.duration.text; // Ejemplo: "15 mins"
            setEstimatedTime(duration);
          } else {
            console.error("Error calculating route: ", status);
            setEstimatedTime(null); // Reinicia si no hay ruta
          }
        }
      );
    }
  }, [startPoint, endPoint, directionsRenderer, travelMode]);

  useEffect(() => {
    calculateRoute();
  }, [startPoint, endPoint, travelMode]);

  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startInputRef.current) {
      handlePlaceChange(startInputRef, setStartPoint);
    }
    if (endInputRef.current) {
      handlePlaceChange(endInputRef, setEndPoint);
    }
  }, []);

  return (
    <div className="flex flex-row h-screen">
      {/* Formulario a la izquierda */}
      <div className="w-96 py-5 px-6 bg-gray-100 shadow-md z-10">
        <h3 className="text-lg font-bold mb-4">Planificador de Rutas</h3>
        <div className="mb-4">
          <label htmlFor="start" className="font-bold block mb-1">
            Punto de partida:
          </label>
          <input
            id="start"
            type="text"
            ref={startInputRef}
            placeholder="Ingresa el punto A"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="end" className="font-bold block mb-1">
            Punto de destino:
          </label>
          <input
            id="end"
            type="text"
            ref={endInputRef}
            placeholder="Ingresa el punto B"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="mode" className="font-bold block mb-1">
            Modo de transporte:
          </label>
          <select
            id="mode"
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="WALKING">Caminando</option>
            <option value="DRIVING">Conduciendo</option>
            <option value="BICYCLING">Bicicleta</option>
            <option value="TRANSIT">Transporte público</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (startPoint) {
              handleSearchStartPoint({ startPoint, map });
            } else {
              console.error("Start point is null");
            }
          }}
          className="w-full mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          Buscar destino
        </button>

        {estimatedTime && (
          <div className="mt-4">
            <p className="text-lg font-bold">
              Tiempo estimado de llegada:
            </p>
            <p className="text-blue-500">{estimatedTime}</p>
          </div>
        )}

      </div>

      {/* Mapa */}
      <div ref={mapRef} className="w-full h-full"></div>
    </div>

  )
}

export default RealTimeMap;
