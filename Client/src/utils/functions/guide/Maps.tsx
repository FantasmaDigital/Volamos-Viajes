import { CurrentRouteValidationProps, GetCurrentLocationProps, HandleSearchStartPointProps, LatLng } from "../../../interface/guide/extra.points";

declare const google: any;

export const handleSearchStartPoint: React.FC<HandleSearchStartPointProps> = ({
  map,
  startPoint,
}) => {
  if (startPoint && map) {
    map.panTo(startPoint);
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

export const getCurrentLocation: React.FC<GetCurrentLocationProps> = ({
  setDefaultRoute,
}) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setDefaultRoute(currentLocation);
      },
      (error) => {
        console.error("Error al obtener la ubicación: ", error);
        setDefaultRoute({ lat: 40.7128, lng: -74.006 });
      }
    );
  } else {
    console.error("La geolocalización no está disponible en este navegador.");
    setDefaultRoute({ lat: 40.7128, lng: -74.006 });
  }
  return null;
};

export const currentRouteValidation: React.FC<CurrentRouteValidationProps> = ({
  startPoint,
  endPoint,
  directionsRenderer,
  setEstimatedTime,
  travelMode,
}) => {
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
  return null;
};

export const handlePlaceChange = (
  inputRef: React.RefObject<HTMLInputElement>,
  setter: (location: LatLng) => void
) => {
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
