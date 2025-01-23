import { LatLng, Restaurant } from "../../../../interface/guide/extra.points";
import SearchForm from "./SearchForm";
import SelectedRestaurants from "./SelectedRestaurants";
import Map from "./Map";
import { centerOnStartPoint } from "../../../../utils/functions/guide/Maps";

interface JoinRTMapProps {
    showForm: boolean,
    startPoint: LatLng | null,
    endPoint: LatLng | null,
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>,
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
    map: any,
    directionsRenderer: google.maps.DirectionsRenderer,
    startInputRef: React.RefObject<HTMLInputElement>,
    endInputRef: React.RefObject<HTMLInputElement>,
    travelMode: string,
    setTravelMode: React.Dispatch<React.SetStateAction<string>>,
    findRestaurantsOnRoute: (params: any) => void
    restaurants: Restaurant[],
    restaurantsInStorage: Restaurant[],
    handleCheckboxChange: (params: any) => void
    showAllRestaurants: any,
    setShowAllRestaurants: React.Dispatch<React.SetStateAction<boolean>>,
    selectedRestaurants: string[],
    markers: any,
    setMarkers: any,
    setRestaurantsInStorage: React.Dispatch<React.SetStateAction<Restaurant[]>>,
    markSelectedRestaurants: (restaurants: Restaurant[]) => void,
    estimatedTime: any,
    mapRef: React.RefObject<HTMLDivElement>,
    goToNextPoint: any,
    currentPoint: any
}

const JoinRTMap: React.FC<JoinRTMapProps> = (
    { showForm, startPoint, endPoint, setRestaurants, setShowForm, map, directionsRenderer, startInputRef, endInputRef, travelMode, setTravelMode, findRestaurantsOnRoute, restaurants, restaurantsInStorage, handleCheckboxChange, showAllRestaurants, setShowAllRestaurants, selectedRestaurants, markers, setMarkers, setRestaurantsInStorage, markSelectedRestaurants, estimatedTime, mapRef, goToNextPoint, currentPoint }
) => {
    return (
        <div className="flex flex-row h-screen relative">
            {/* Contenedor lateral */}
            {showForm ? (
                <SearchForm
                    startPoint={startPoint}
                    endPoint={endPoint}
                    setRestaurants={setRestaurants}
                    setShowForm={setShowForm}
                    map={map}
                    directionsRenderer={directionsRenderer}
                    startInputRef={startInputRef}
                    endInputRef={endInputRef}
                    travelMode={travelMode}
                    setTravelMode={setTravelMode}
                    findRestaurantsOnRoute={findRestaurantsOnRoute}
                />
            ) : (
                <SelectedRestaurants
                    showAllRestaurants={showAllRestaurants}
                    restaurants={restaurants}
                    startPoint={startPoint}
                    endPoint={endPoint}
                    selectedRestaurants={selectedRestaurants}
                    restaurantsInStorage={restaurantsInStorage}
                    handleCheckboxChange={(restaurant: Restaurant) =>
                        handleCheckboxChange({
                            restaurant,
                            map,
                            markers,
                            setMarkers,
                            setRestaurantsInStorage
                        })
                    }

                    setShowAllRestaurants={setShowAllRestaurants}
                    markSelectedRestaurants={markSelectedRestaurants}
                    estimatedTime={estimatedTime}
                />
            )}
            {/* Mapa */}
            <Map mapRef={mapRef} showAllRestaurants={showAllRestaurants} />

            {/* Botón para centrar el mapa en el punto A */}
            <button
                className="absolute bottom-4 left-4 bg-blue-500 text-white p-2 rounded"
                onClick={() => centerOnStartPoint(map, startPoint)}
            >
                Acercar al punto A
            </button>
            <button
                className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded"
                onClick={goToNextPoint}
                disabled={currentPoint === 'destination'} // Deshabilitar cuando estemos en el destino final
            >
                Ir al siguiente punto
            </button>
        </div>
    )
}

export default JoinRTMap;