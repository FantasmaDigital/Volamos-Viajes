import { useState } from "react";
import { LatLng } from "../../../../interface/guide/extra.points";
import { clearStorage } from "../../../../utils/functions/guide/ExtraPoints";

interface SearchFormProps {
    startPoint: LatLng | null,
    endPoint: LatLng | null,
    setRestaurants: React.Dispatch<React.SetStateAction<any[]>>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    map: any,
    directionsRenderer: google.maps.DirectionsRenderer
    startInputRef: React.RefObject<HTMLInputElement>,
    endInputRef: React.RefObject<HTMLInputElement>,
    travelMode: string,
    setTravelMode: React.Dispatch<React.SetStateAction<string>>,
    findRestaurantsOnRoute: (params: {
        map: any;
        directionsRenderer: any;
        startPoint: LatLng;
        endPoint: LatLng;
        setRestaurants: (restaurants: any[]) => void;
    }) => void,
}

const SearchForm: React.FC<SearchFormProps> = ({
    startInputRef,
    endInputRef,
    travelMode,
    setTravelMode,
    map,
    directionsRenderer,
    startPoint,
    endPoint,
    setRestaurants,
    setShowForm,
    findRestaurantsOnRoute
}) => {
    // Estado para mostrar el mensaje de error
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = () => {
        if (startPoint && endPoint) {
            if (travelMode === "TRANSIT") {
                const request: google.maps.DirectionsRequest = {
                    origin: startPoint,
                    destination: endPoint,
                    travelMode: google.maps.TravelMode.TRANSIT,
                };

                const directionsService = new google.maps.DirectionsService();

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);

                        // Calculamos el tiempo estimado
                        if (result) {
                            const leg = result.routes[0].legs[0];
                            const transitDetails = leg.steps.find(step => step.transit);
                            transitDetails && transitDetails.duration ? transitDetails.duration.text : "0";
                            // console.log(`Tiempo estimado de viaje en transporte público: ${travelTime}`);
                        }
                    } else {
                        console.error("No se pudo calcular la ruta en transporte público.");
                        setErrorMessage("No se pudo encontrar una ruta de transporte público entre los puntos proporcionados.");
                    }
                });
            } else {
                findRestaurantsOnRoute({
                    map,
                    directionsRenderer,
                    startPoint,
                    endPoint,
                    setRestaurants,
                });
            }

            setShowForm(false);
            clearStorage();
        } else {
            console.error("Punto de inicio o destino es nulo");
            setErrorMessage("Por favor, asegúrese de ingresar tanto el punto de inicio como el destino.");
        }
    };

    return (
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

            {/* Mostrar el mensaje de error si existe */}
            {errorMessage && (
                <div className="mt-4 p-2 text-red-500 border border-red-300 bg-red-100 rounded-md">
                    {errorMessage}
                </div>
            )}

            <button
                onClick={handleSubmit}
                className="w-full mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
                Siguiente
            </button>
        </div>
    );
}

export default SearchForm;
