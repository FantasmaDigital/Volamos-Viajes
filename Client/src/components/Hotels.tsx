// src/components/Hotels.tsx
import React, { useEffect, useState } from "react";

interface Hotel {
  code: string;
  address: string;
  name: string;
  category: string;
  city: string;
}

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Realizar la solicitud a nuestro backend
        const response = await fetch("http://localhost:4444/hotels?destination=LON&limit=10");
        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          // Mapear los hoteles desde la respuesta de la API
          const hotelList = data.hotels.map((hotel: any) => ({
            code: hotel.code,
            address: hotel.address.street,
            name: hotel.name.content,
            city: hotel.city.content,
          }));
          setHotels(hotelList);
        } else {
          throw new Error(data.message || "Hubo un error al obtener los hoteles.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHotels();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando hoteles...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <section className="py-12 px-8">
      <h2 className="text-2xl font-bold mb-6">Lista de Hoteles</h2>
      {hotels.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <li
              key={hotel.code}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <p className="text-gray-600">Direccion: {hotel.address}</p>
              <p className="text-gray-600">Ciudad: {hotel.city}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron hoteles.</p>
      )}
    </section>
  );
};

export default Hotels;
