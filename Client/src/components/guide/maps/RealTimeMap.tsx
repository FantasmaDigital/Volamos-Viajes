import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  currentRouteValidation,
  getCurrentLocation,
  handlePlaceChange,
} from "../../../utils/functions/guide/Maps";
import { findRestaurantsOnRoute } from "../../../utils/functions/guide/ExtraPoints";

type LatLng = {
  lat: number;
  lng: number;
};

declare const google: any;

const RealTimeMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [startPoint, setStartPoint] = useState<LatLng | null>(null);
  const [endPoint, setEndPoint] = useState<LatLng | null>(null);
  const [travelMode, setTravelMode] = useState<string>("WALKING");
  const [defaultRoute, setDefaultRoute] = useState<LatLng | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [selectedRestaurants, setSelectedRestaurants] = useState<any[]>([]);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showAllRestaurants, setShowAllRestaurants] = useState<boolean>(false);
  const startInputRef = useRef<HTMLInputElement>(null);
  const endInputRef = useRef<HTMLInputElement>(null);
  const [markers, setMarkers] = useState<{ placeId: string; marker: any }[]>(
    []
  );

  useEffect(() => {
    if (mapRef.current && !map) {
      const initialLocation = defaultRoute || { lat: 40.7128, lng: -74.006 }; // Nueva York como valor predeterminado
      const newMap = new google.maps.Map(mapRef.current, {
        center: initialLocation,
        zoom: 15,
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

  useEffect(() => {
    getCurrentLocation({ setDefaultRoute });
  }, []);

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

  const handleRestaurantSelect = (restaurant: any) => {
    const isSelected = selectedRestaurants.includes(restaurant.place_id);

    if (isSelected) {
      // Eliminar del estado de restaurantes seleccionados
      setSelectedRestaurants((prev) =>
        prev.filter((id) => id !== restaurant.place_id)
      );

      // Eliminar el marcador del mapa
      const markerToRemove = markers.find(
        (marker) => marker.placeId === restaurant.place_id
      );

      if (markerToRemove) {
        markerToRemove.marker.setMap(null); // Quitar marcador del mapa
        setMarkers((prev) =>
          prev.filter((marker) => marker.placeId !== restaurant.place_id)
        );
      }
    } else {
      // Agregar al estado de restaurantes seleccionados
      setSelectedRestaurants((prev) => [...prev, restaurant.place_id]);

      // Agregar un marcador al mapa
      const newMarker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map,
        title: restaurant.name,
      });

      // Almacenar el marcador en el estado
      setMarkers((prev) => [
        ...prev,
        { placeId: restaurant.place_id, marker: newMarker },
      ]);
    }
  };

  const markSelectedRestaurants = () => {
    selectedRestaurants.forEach((restaurantId) => {
      const restaurant = restaurants.find(
        (rest) => rest.place_id === restaurantId
      );
      if (restaurant) {
        const existingMarker = markers.find(
          (marker) => marker.placeId === restaurant.place_id
        );

        // Si el marcador ya existe, no crearlo nuevamente
        if (!existingMarker) {
          const newMarker = new google.maps.Marker({
            position: restaurant.geometry.location,
            map,
            title: restaurant.name,
          });

          setMarkers((prev) => [
            ...prev,
            { placeId: restaurant.place_id, marker: newMarker },
          ]);
        }
      }
    });

    if (startPoint && endPoint) {
      const waypoints = selectedRestaurants
        .map((restaurantId) => {
          const restaurant = restaurants.find(
            (rest) => rest.place_id === restaurantId
          );
          return restaurant
            ? { location: restaurant.geometry.location, stopover: true }
            : null;
        })
        .filter((waypoint) => waypoint !== null);

      // Ahora, recalcular la ruta
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
        (
          result: google.maps.DirectionsResult,
          status: google.maps.DirectionsStatus
        ) => {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const duration = result.routes[0].legs.reduce(
              (acc: number, leg: google.maps.DirectionsLeg) =>
                acc + (leg.duration ? leg.duration.value : 0),
              0
            );
            setEstimatedTime(
              new Date(duration * 1000).toISOString().substr(11, 8)
            ); // Convertir segundos a formato de tiempo
          } else {
            console.error("Error al calcular la ruta:", status);
          }
        }
      );
    }
  };

  useEffect(() => {
    if (selectedRestaurants.length > 0) {
      localStorage.setItem('selectedRestaurants', JSON.stringify(selectedRestaurants));
    }
  }, [selectedRestaurants]);
  
  const handleCheckboxChange = (restaurantId: string) => {
    setSelectedRestaurants((prevSelected) => {
      const newSelected = prevSelected.includes(restaurantId)
        ? prevSelected.filter((id) => id !== restaurantId) // Unselect the restaurant
        : [...prevSelected, restaurantId]; // Select the restaurant

      return newSelected;
    });
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Contenedor lateral */}
      {showForm ? (
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
                if (endPoint) {
                  findRestaurantsOnRoute({
                    map,
                    directionsRenderer,
                    startPoint,
                    endPoint,
                    setRestaurants,
                  });
                } else {
                  console.error("End point is null");
                }
                setShowForm(false);
              } else {
                console.error("Start point is null");
              }
            }}
            className="w-full mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Siguiente
          </button>
        </div>
      ) : (
        <div
          className={`${
            showAllRestaurants ? "w-full" : "w-96"
          } py-5 px-6 bg-gray-100 shadow-md z-10`}
        >
          <h3 className="text-lg font-bold mb-4">Resultados</h3>
          <div className="mb-4">
            <p className="font-bold">
              Punto A: {`Lat: ${startPoint?.lat}, Lng: ${startPoint?.lng}`}
            </p>
            <p className="font-bold">
              Punto B: {`Lat: ${endPoint?.lat}, Lng: ${endPoint?.lng}`}
            </p>

            {selectedRestaurants.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold">Restaurantes a visitar:</h4>
                <ul>
                  {selectedRestaurants.map((restaurantId) => {
                    const restaurant = restaurants.find(
                      (rest) => rest.place_id === restaurantId
                    );
                    return (
                      restaurant && (
                        <li
                          key={restaurant.place_id}
                          className="flex items-center text-gray-700 mb-2"
                        >
                          {restaurant.photo &&
                          restaurant.photo[0]?.photo_url ? (
                            <>
                              <img
                                src={
                                  restaurant.photos?.[0]?.getUrl() ||
                                  "https://via.placeholder.com/100"
                                }
                                alt={restaurant.name}
                                className="w-16 h-16 rounded-md object-cover"
                              />
                              <span className="cursor-pointer hover:underline truncate w-32">
                                {restaurant.name}
                              </span>
                            </>
                          ) : (
                            <div className="w-16 h-16 bg-gray-300 rounded-full mr-3"></div> // Si no hay imagen, muestra un placeholder
                          )}
                          <span>{restaurant.name}</span>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {restaurants.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold text-lg">Restaurantes Cercanos:</h4>
              <ul
                className={
                  showAllRestaurants
                    ? "flex flex-row flex-wrap"
                    : "flex flex-col"
                }
              >
                {restaurants
                  .slice(0, showAllRestaurants ? 20 : 4)
                  .map((restaurant, index) => (
                    <li
                      key={index}
                      className="text-gray-700 max-w-xs max-h-28 p-2 border border-gray-300 rounded-md shadow-md flex-shrink-0"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedRestaurants.includes(
                            restaurant.place_id
                          )}
                          onChange={() => handleCheckboxChange(restaurant.place_id)}
                        />
                        <img
                          src={
                            restaurant.photos?.[0]?.getUrl() ||
                            "https://via.placeholder.com/100"
                          }
                          alt={restaurant.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        <span className="cursor-pointer hover:underline truncate w-32">
                          {restaurant.name}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>

              <button
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                className="mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Ver más
              </button>
              <button
                onClick={markSelectedRestaurants}
                className="mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Marcar destinos
              </button>
            </div>
          )}
          {estimatedTime && (
            <div className="mt-4">
              <p className="text-lg font-bold">Tiempo estimado de llegada:</p>
              <p className="text-blue-500">{estimatedTime}</p>
            </div>
          )}
        </div>
      )}

      {/* Mapa */}
      <div
        ref={mapRef}
        className={`${showAllRestaurants ? "w-0" : "w-full"} h-full`}
      ></div>
    </div>
  );
};

export default RealTimeMap;
