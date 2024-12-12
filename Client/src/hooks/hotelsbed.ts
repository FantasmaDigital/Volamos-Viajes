// src/services/hotelsbed.ts
import axios from "axios";

const HOTELS_API_BASE = "https://api.test.hotelbeds.com/hotel-content-api/1.0"; // Cambia a la URL base de producción si es necesario
const API_KEY = "361f86aae07789362ec4cb6ea65caf55"; // Sustituye con tu clave API
const SECRET = "a2d6537346"; // Sustituye con tu clave secreta

// Crear cliente Axios
const hotelsApi = axios.create({
  baseURL: HOTELS_API_BASE,
  headers: {
    "Content-Type": "application/json",
    "Api-Key": API_KEY,
    "X-Signature": SECRET, 
  },
});

// Método para obtener hoteles
export const fetchHotels = async (params: Record<string, string>) => {
  try {
    const response = await hotelsApi.get("/hotels", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los hoteles:", error);
    throw error;
  }
};

export default hotelsApi;
