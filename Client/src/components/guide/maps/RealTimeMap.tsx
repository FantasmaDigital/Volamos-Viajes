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
  const [userLocation, setUserLocation] = useState<LatLng | null>(null); // Para almacenar la ubicación actual del usuario
  const [currentPoint, setCurrentPoint] = useState<'start' | 'restaurant' | 'destination'>('start');


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
            setUserLocation(newLocation);
            newMap.setCenter(newLocation);

            // Aquí podemos implementar la lógica para verificar si el usuario está siguiendo la ruta
            // O si se ha desviado del camino
            if (startPoint && endPoint) {
              const distanceToRoute = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(newLocation.lat, newLocation.lng),
                new google.maps.LatLng(startPoint.lat, startPoint.lng)
              );

              // Si el usuario está demasiado alejado, recalcular la ruta
              if (distanceToRoute > 50) {
                calculateRoute(); // Recalcular la ruta si se desvía demasiado
              }
            }
          },
          (error) => console.error("Error en la geolocalización: ", error),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      }
    }
  }, [mapRef, map, defaultRoute, startPoint, endPoint]);

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
    if (currentPoint === 'start' && restaurantsInStorage.length > 0) {
      // Ruta inicial: Colonia Escalón -> Burger King
      const firstRestaurant = restaurantsInStorage[0];
      const directionsService = new google.maps.DirectionsService();
      const requestToRestaurant = {
        origin: startPoint,
        destination: firstRestaurant.location,
        travelMode,
        waypoints: [],
        optimizeWaypoints: false,
      };

      directionsService.route(
        requestToRestaurant,
        (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            setCurrentPoint('restaurant'); // Ahora estamos en el restaurante
          } else {
            console.error("Error al calcular la ruta al restaurante:", status);
          }
        }
      );
    } else if (currentPoint === 'restaurant' && endPoint) {
      // Ruta siguiente: Burger King -> Calle Arce
      const directionsService = new google.maps.DirectionsService();
      const requestToDestination = {
        origin: restaurantsInStorage[0].location, // Burger King
        destination: endPoint, // Calle Arce
        travelMode,
        waypoints: [],
        optimizeWaypoints: false,
      };

      directionsService.route(
        requestToDestination,
        (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            setCurrentPoint('destination'); // Ahora estamos en el destino final
          } else {
            console.error("Error al calcular la ruta al destino final:", status);
          }
        }
      );
    }
  };


  // Función para centrar el mapa en el punto A (startPoint)
  const centerOnStartPoint = () => {
    if (map && startPoint) {
      map.setCenter(new google.maps.LatLng(startPoint.lat, startPoint.lng));
      map.setZoom(20); // Ajusta el zoom si es necesario
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
        onClick={centerOnStartPoint}
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
  );
};

export default RealTimeMap;
