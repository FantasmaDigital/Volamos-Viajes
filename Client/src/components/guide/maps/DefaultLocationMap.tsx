import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from '../../../context/guide/LocationContext';

declare const google: any;

interface DefaultLocationMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

const DefaultLocationMap: React.FC<DefaultLocationMapProps> = ({
  lat = 0,
  lng = 0,
  zoom = 15,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const locationContext = useLocation();
  const [markers, setMarkers] = useState<any[]>([]); // Para almacenar los marcadores
  const [places, setPlaces] = useState<any[]>([]); // Para almacenar los lugares encontrados
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(false);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
      });

      // Crear servicio de Places
      const service = new google.maps.places.PlacesService(map);

      // Limpiar los marcadores previos
      markers.forEach((marker) => marker.setMap(null));
      setMarkers([]); // Vaciar el array de marcadores
      setPlaces([]); // Limpiar los resultados previos

      const request = {
        location: { lat, lng },
        radius: 500, // Radio en metros
        type: locationContext.placeOption, // Tipo de lugar
      };

      // Realizar la búsqueda de lugares cercanos
      service.nearbySearch(request, (results: any[], status: string) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Agregar un marcador para cada lugar encontrado
          const newMarkers = results.map((place) => {
            const marker = new google.maps.Marker({
              position: place.geometry.location,
              map,
              title: place.name,
            });
            return marker;
          });
          setMarkers(newMarkers); // Guardar los nuevos marcadores
          setPlaces(results); // Guardar los resultados de la búsqueda

          // Ajustar el centro del mapa si las coordenadas cambian
          map.setCenter({ lat, lng });
        } else {
          console.error('No se encontraron lugares o hubo un error:', status);
        }
      });
    }
  }, [lat, lng, zoom, locationContext.placeOption]); // Dependencia de placeOption

  return (
    <div className={`flex`}>
      {/* Cuadro con resultados */}
      <div style={{ width: showAllPlaces ? "100%" : '300px', marginRight: '20px' }}>
        <h3>Resultados cercanos</h3>
        {places.length > 0 ? (
          <>
            <div>
              {places.slice(0, showAllPlaces ? 20 : 4).map((place, index) => (
                <div className={`flex justify-center items-center  flex-col`} key={index} style={{ marginBottom: '20px' }}>
                  <img
                    src={place.photos?.[0]?.getUrl() || 'https://via.placeholder.com/100'}
                    alt={place.name}
                    style={{ width: '100px', height: '100px', borderRadius: '8px' }}
                  />
                  <div>
                    <strong>{place.name}</strong>
                  </div>
                </div>
              ))}
            </div>
            <input type="submit" value="Ver mas" onClick={()=>setShowAllPlaces(!showAllPlaces)}/>
          </>
        ) : (
          <p>No se encontraron lugares cercanos.</p>
        )}
      </div>

      {/* Mapa */}
      <div ref={mapRef} style={{ width: showAllPlaces ? "0" : '100%', height: '400px' }} />
    </div>
  );
};

export default DefaultLocationMap;
