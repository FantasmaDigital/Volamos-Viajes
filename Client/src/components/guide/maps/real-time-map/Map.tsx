import { RefObject } from 'react';

interface MapProps {
  mapRef: RefObject<HTMLDivElement>;
  showAllRestaurants: boolean; // Usar un booleano en lugar de SetStateAction<boolean>
}

const Map: React.FC<MapProps> = ({ mapRef, showAllRestaurants }) => {
  return (
    <div
      ref={mapRef}
      className={`${
        showAllRestaurants ? 'w-0 opacity-0' : 'w-full opacity-100'
      } h-full transition-all duration-500 ease-in-out overflow-hidden`}
      style={{ transitionProperty: 'width, opacity' }}
    >
      {/* Agregar un "loader" mientras carga el mapa */}
      <div className={`${!mapRef.current ? 'flex items-center justify-center' : 'hidden'} h-full`}>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Map;
