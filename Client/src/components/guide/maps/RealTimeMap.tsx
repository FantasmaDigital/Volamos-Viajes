import { currentRouteValidation, handlePlaceChange } from "../../../utils/functions/guide/Maps";
import { findRestaurantsOnRoute, handleCheckboxChange } from "../../../utils/functions/guide/ExtraPoints";
import { LatLng, Restaurant } from "../../../interface/guide/extra.points";
import SearchForm from "./real-time-map/SearchForm";
import Map from "./real-time-map/Map";
import SelectedRestaurants from "./real-time-map/SelectedRestaurants";
import { useCallback, useEffect, useRef, useState } from "react";

declare const google: any;

const RealTimeMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [travelMode, setTravelMode] = useState<string>("WALKING");
  const [defaultRoute] = useState<LatLng | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurants] = useState<any[]>([]);
  const [restaurantsInStorage, setRestaurantsInStorage] = useState<any[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showAllRestaurants, setShowAllRestaurants] = useState<boolean>(false);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const [markers, setMarkers] = useState<{ placeId: string; marker: any }[]>([]);
  const [currentPointIndex, setCurrentPointIndex] = useState(0); 
  const points = [
    startPoint,
    ...restaurantsInStorage.map((restaurant) => restaurant.location),
    endPoint, // Calle Arce
  ];
  let userMarker:any = null;

  const centerOnStartPoint = (map:any, startPoint:any) => {
    if (map && startPoint) {
      map.setCenter(new google.maps.LatLng(startPoint.lat, startPoint.lng));
      map.setZoom(20); // Ajusta el zoom si es necesario
    }
  };

  useEffect(() => {
    if (mapRef.current && !map) {
      const initialLocation = defaultRoute || { lat: 40.7128, lng: -74.006 }; // Nueva York como valor predeterminado
      const newMap = new google.maps.Map(mapRef.current, {
        center: initialLocation,
        zoom: 17,
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
  
      // Geolocalización
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
  
            setStartPoint(newLocation);
  
            newMap.setCenter(newLocation);
  
            if (userMarker) {
              userMarker.setMap(null); // Elimina el marcador anterior
            }
  
            userMarker = new google.maps.Marker({
              position: newLocation,
              map: newMap,
              title: "Tu ubicación actual",
              animation: google.maps.Animation.DROP, // Animación de caída
            });
          },
          (error) => console.error("Error en la geolocalización: ", error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    }
  }, [mapRef, map, defaultRoute]);
  
  const calculateRoute = useCallback(() => {
    currentRouteValidation({
      startPoint,
      endPoint,
      directionsRenderer,
      setEstimatedTime,
      travelMode,
    });
  }, [startPoint, endPoint, directionsRenderer, travelMode]);

  useEffect(() => {
    calculateRoute();
  }, [startPoint, endPoint, travelMode]);

  useEffect(() => {
    if (startInputRef.current) {
      handlePlaceChange(startInputRef, setStartPoint);
    }
    if (endInputRef.current) {
      handlePlaceChange(endInputRef, setEndPoint);
    }
  }, []);

  const markSelectedRestaurants = () => {
    // Primero, iterar sobre los restaurantes en storage para agregar los marcadores
    restaurantsInStorage.forEach((restaurant) => {
      const existingMarker = markers.find(
        (marker) => marker.placeId === restaurant.id
      );

      // Si el marcador ya existe, no crearlo nuevamente
      if (!existingMarker) {
        const newMarker = new google.maps.Marker({
          position: restaurant.location,
          map,
          title: restaurant.name,
        });

        setMarkers((prev) => [
          ...prev,
          { placeId: restaurant.id, marker: newMarker },
        ]);
      }
    });

    if (startPoint && endPoint) {
      const waypoints = restaurantsInStorage
        .map((restaurant) => {
          return {
            location: restaurant.location,
            stopover: true,
          };
        })
        .filter((waypoint) => waypoint !== null);

      // Recalcular la ruta
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: startPoint,
        destination: endPoint,
        travelMode,
        waypoints: waypoints as google.maps.DirectionsWaypoint[], // Añadir las paradas intermedias
        optimizeWaypoints: true, // Opcional: optimiza el orden de las paradas
      };

      directionsService.route(
        request,
        (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            // Calcular el tiempo estimado de la ruta
            const duration = result.routes[0].legs.reduce(
              (acc: number, leg: google.maps.DirectionsLeg) =>
                acc + (leg.duration ? leg.duration.value : 0),
              0
            );

            setEstimatedTime(
              new Date(duration * 1000).toISOString().substr(11, 8)
            ); // Convertir segundos a formato de tiempo
          } else {
            setEstimatedTime(
              new Date(0 * 1000).toISOString().substr(11, 8)
            );
            console.error("Error al calcular la ruta:", status);
          }
        }
      );
    }
  };

  const goToNextPoint = () => {
    if (currentPointIndex < points.length - 1) {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: points[currentPointIndex],
        destination: points[currentPointIndex + 1],
        travelMode,
        waypoints: [],
        optimizeWaypoints: false,
      };

      directionsService.route(
        request,
        (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            setCurrentPointIndex((prevIndex) => prevIndex + 1); // Mover al siguiente punto
          } else {
            console.error(`Error al calcular la ruta entre puntos [${currentPointIndex}] y [${currentPointIndex + 1}]:`, status);
          }
        }
      );
    } else {
      console.log("Todos los puntos han sido visitados.");
    }
  };

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
        onClick={()=>centerOnStartPoint(map, startPoint)}
      >
        Acercar al punto A
      </button>
      <button
        className={`absolute bottom-4 right-4 p-2 rounded  ${currentPointIndex < points.length - 1
            ? 'bg-green-500 text-white cursor-pointer'
            : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        onClick={goToNextPoint}
        disabled={currentPointIndex >= points.length - 1} // Deshabilitar en el último punto
        aria-disabled={currentPointIndex >= points.length - 1}
        aria-label="Go to the next point"
      >
        {currentPointIndex < points.length - 1 ? 'Next Point' : 'End of Route'}
      </button>
    </div>
  );
};

export default RealTimeMap;
