import React, { useEffect, useRef, useState, useCallback } from "react";

declare const google: any;

type LatLng = {
  lat: number;
  lng: number;
};

type MapProps = {
  endPoint: LatLng;
};

const RealTimeMap: React.FC<MapProps> = ({ endPoint }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);
  const [travelMode, setTravelMode] = useState<string>("WALKING");
  const [routesInfo, setRoutesInfo] = useState<string | null>(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center: endPoint,
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
  }, [mapRef, map]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (map) {
          map.setCenter(newPosition);
        }

        if (directionsRenderer && newPosition) {
          calculateRoute(newPosition, endPoint, directionsRenderer, travelMode);
        }
      },
      (error) => {
        console.error("Error watching position: ", error);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [map, directionsRenderer, travelMode, endPoint]);

  const calculateRoute = useCallback(
    (
      start: LatLng,
      end: LatLng,
      renderer: any,
      mode: string
    ) => {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: google.maps.TravelMode[mode],
          provideRouteAlternatives: true,
        },
        (result: any, status: string) => {
          if (status === "OK") {
            renderer.setDirections(result);
            setRoutesInfo(null); // Limpia errores previos
            findPlacesOnRoute(result.routes[0].overview_path); // Buscar lugares
          } else if (status === "ZERO_RESULTS") {
            setRoutesInfo("No se encontraron rutas para el modo seleccionado.");
          } else {
            setRoutesInfo(`Error: ${status}`);
          }
        }
      );
    },
    []
  );

  const findPlacesOnRoute = useCallback((routePath: LatLng[]) => {
    const placesService = new google.maps.places.PlacesService(map);
    let currentInfoWindow: google.maps.InfoWindow | null = null;

    routePath.forEach((location, index) => {
      if (index % 10 === 0) {
        placesService.nearbySearch(
          {
            location: location,
            radius: 150,
            type: "restaurant", // Change to desired type
          },
          (results: any[], status: string) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {

              results.forEach((place) => {
                const marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                });

                const photo = place.photos && place.photos[0]
                  ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 })
                  : "https://via.placeholder.com/200";

                const rating = place.rating || "No rating available";
                const reviews = place.user_ratings_total || "No reviews available";
                const address = place.vicinity || "Address not available";

                const infoContent = `
                  <div style="max-width: 200px; padding: 10px; display: inline-block;">
                    <strong>${place.name}</strong><br />
                    <img src="${photo}" alt="${place.name}" style="width: 100%; height: auto; margin-bottom: 10px; max-height: 150px; object-fit: cover;" />
                    <p style="margin: 0;">Rating: ${rating} / 5 (Total Reviews: ${reviews})</p>
                    <p style="margin: 0;"><strong>Address:</strong> ${address}</p>
                  </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                  content: infoContent,
                });

                marker.addListener("click", () => {
                  if (currentInfoWindow) {
                    currentInfoWindow.close();
                  }

                  infoWindow.open(map, marker);
                  currentInfoWindow = infoWindow;
                });
              });
            }
          }
        );
      }
    });
  }, [map]);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <p>
          <strong>Modo de transporte:</strong>
        </p>
        <select
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="WALKING">Caminando</option>
          <option value="DRIVING">Conduciendo</option>
          <option value="BICYCLING">Bicicleta</option>
          <option value="TRANSIT">Transporte público</option>
        </select>
        {routesInfo && (
          <div style={{ marginTop: "10px" }}>
            <p>
              <strong>Rutas de transporte público:</strong>
            </p>
            <pre style={{ whiteSpace: "pre-wrap" }}>{routesInfo}</pre>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          background: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <p>
          <strong>Restaurantes en la ruta:</strong>
        </p>
      </div>
    </div>
  );
};

export default RealTimeMap;
