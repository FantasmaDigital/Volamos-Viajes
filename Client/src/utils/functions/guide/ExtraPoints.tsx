import React from "react";

interface DirectionsResult {
  routes: {
    overview_path: google.maps.LatLng[];
    legs: {
      duration: {
        text: string;
      };
    }[];
  }[];
}

interface PlacesServiceResult {
  place_id: string;
}

interface NearbySearchRequest {
  location: LatLng;
  radius: number;
  type: string;
}

type LatLng = {
  lat: number;
  lng: number;
};

declare const google: any;

export const findRestaurantsOnRoute = ({
  map,
  directionsRenderer,
  startPoint,
  endPoint,
  setRestaurants,
}: {
  map: any;
  directionsRenderer: any;
  startPoint: LatLng;
  endPoint: LatLng;
  setRestaurants: (restaurants: any[]) => void;
}) => {
  if (!map || !startPoint || !endPoint) return;

  const directionsService = new google.maps.DirectionsService();

  const request = {
    origin: startPoint,
    destination: endPoint,
    travelMode: google.maps.TravelMode.DRIVING, // Puedes cambiar a WALKING o otro modo
  };

  directionsService.route(
    request,
    (result: DirectionsResult, status: string) => {
      if (status === google.maps.DirectionsStatus.OK && result?.routes[0]) {
        directionsRenderer.setDirections(result);

        const path = result.routes[0].overview_path;
        const placesService = new google.maps.places.PlacesService(map);

        const nearbyRestaurants: PlacesServiceResult[] = [];
        const searchRadius = 500; // Radio de búsqueda en metros

        let completedRequests = 0;
        path.forEach((point, index) => {
          if (index % 10 !== 0) return; // Reduce la cantidad de consultas para optimizar

          const location = {
            lat: point.lat(),
            lng: point.lng(),
          };

          const request: NearbySearchRequest = {
            location,
            radius: searchRadius,
            type: "restaurant",
          };

          placesService.nearbySearch(
            request,
            (results: PlacesServiceResult[], status: string) => {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                nearbyRestaurants.push(...results);
              }
              completedRequests++;

              // Si se completaron todas las consultas, actualizar los restaurantes
              if (completedRequests === Math.ceil(path.length / 10)) {
                setRestaurants(
                  Array.from(
                    new Map(
                      nearbyRestaurants.map((r) => [r.place_id, r])
                    ).values()
                  )
                );
              }
            }
          );
        });
      } else {
        console.error("Error al calcular la ruta:", status);
      }
    }
  );
};
