import { DirectionsResult, LatLng, NearbySearchRequest, PlacesServiceResult, Restaurant } from "../../../interface/guide/extra.points";

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

export const handleCheckboxChange = ({
  restaurant,
  map,
  markers,
  setMarkers,
  setRestaurantsInStorage,
}:{
  restaurant: Restaurant
  map: any,
  markers: Array<{ placeId: string; marker: any }>,
  setMarkers: (markers: Array<{ placeId: string; marker: any }> | ((prev: Array<{ placeId: string; marker: any }>) => Array<{ placeId: string; marker: any }>)) => void,
  setRestaurantsInStorage: (restaurants: Restaurant[]) => void,
}) => {
  // Obtener los restaurantes seleccionados desde el localStorage
  const storedSelectedRestaurants = JSON.parse(localStorage.getItem('selectedRestaurants') || '[]');

  // Verificar si el restaurante ya está seleccionado
  const isSelected: boolean = storedSelectedRestaurants.some(
    (item: { id: string }) => item.id === restaurant.place_id
  );

  if (!isSelected) {
    // Crear el objeto con el formato correcto
    const restaurantToAdd = {
      id: restaurant.place_id,
      location: restaurant.geometry.location,
      name: restaurant.name,
      icon: restaurant.icon,
    };
    const updatedSelectedRestaurants = [...storedSelectedRestaurants, restaurantToAdd];
    localStorage.setItem('selectedRestaurants', JSON.stringify(updatedSelectedRestaurants));
    const newMarker = new google.maps.Marker({
      position: restaurant.geometry.location, // Coordenadas del restaurante
      map,  // El mapa donde se debe colocar el marcador
      title: restaurant.name,  // Título del marcador
    });
    setRestaurantsInStorage(updatedSelectedRestaurants);
    setMarkers([
      ...markers,
      { placeId: restaurant.place_id, marker: newMarker },
    ]);
  } else {
    const updatedSelectedRestaurants = storedSelectedRestaurants.filter(
      (item: { id: string }) => item.id !== restaurant.place_id
    );
    localStorage.setItem('selectedRestaurants', JSON.stringify(updatedSelectedRestaurants));
    setMarkers((prev: Array<{ placeId: string; marker: any }>) => {
      const markerToRemove = prev.find(
      (marker) => marker.placeId === restaurant.place_id
      );
      if (markerToRemove) {
      markerToRemove.marker.setMap(null);
      }
      return prev.filter((marker) => marker.placeId !== restaurant.place_id);
    });
    setRestaurantsInStorage(updatedSelectedRestaurants);
    // markSelectedRestaurants()
  }
};

export const clearStorage = () =>{
  localStorage.removeItem('selectedRestaurants');
}
