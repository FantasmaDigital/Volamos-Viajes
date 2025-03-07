import React from "react";
import { Helmet } from "react-helmet-async";
const HelmetHome: React.FC = () => {
  return (
    <Helmet>
      {/* Meta etiquetas generales */}
      <title>Volamos Viajes | Reserva Fácil y Rápido para tus Próximas Vacaciones</title>
      <meta name="description" content="Explora nuestras ofertas exclusivas de paquetes de viaje, destinos populares y promociones increíbles. Planea tus vacaciones soñadas con Volamos Viajes." />
      <meta name="keywords" content="viajes, vacaciones, destinos, ofertas exclusivas, paquetes de viaje, reservas fáciles, turismo, promociones de viajes, mejores ofertas" />
      <meta name="author" content="Volamos Viajes" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

      {/* Meta etiquetas Open Graph para redes sociales */}
      <meta property="og:title" content="Volamos Viajes | Reserva Fácil y Rápida para tus Próximas Vacaciones" />
      <meta property="og:description" content="Explora nuestras ofertas exclusivas de paquetes de viaje, destinos populares y promociones increíbles. Planea tus vacaciones soñadas con Volamos Viajes." />
      <meta property="og:image" content="https://volamosviajes.com/img/destinations/disney-paris-1.jpg" />
      <meta property="og:image:alt" content="Disfruta de tus vacaciones con Volamos Viajes." />
      <meta property="og:url" content="https://volamosviajes.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />

      {/* Meta etiquetas para Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Volamos Viajes | Reserva Fácil y Rápida para tus Próximas Vacaciones" />
      <meta name="twitter:description" content="Explora nuestras ofertas exclusivas de paquetes de viaje, destinos populares y promociones increíbles. Planea tus vacaciones soñadas con Volamos Viajes." />
      <meta name="twitter:image" content="https://volamosviajes.com/img/destinations/disney-paris-1.jpg" />
      <meta name="twitter:image:alt" content="Disfruta de tus vacaciones con Volamos Viajes." />
      <meta name="twitter:site" content="@VolamosViajes" />
      <meta name="twitter:creator" content="@VolamosViajes" />

      {/* Meta etiquetas adicionales */}
      <meta property="og:site_name" content="Volamos Viajes" />
      <meta name="theme-color" content="#0e3d5e" />
      <meta name="apple-mobile-web-app-title" content="Volamos Viajes" />
      <meta name="application-name" content="Volamos Viajes" />
      <meta name="msapplication-TileColor" content="#1f567a" />
      <meta name="msapplication-TileImage" content="https://volamosviajes.com/img/logo.png" />

      {/* Favicon y recursos */}
      <link rel="icon" href="https://volamosviajes.com/favicon.ico" type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="180x180" href="https://volamosviajes.com/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://volamosviajes.com/img/favicon-32x32.png" />
      <link rel="manifest" href="https://volamosviajes.com/site.webmanifest" />
    </Helmet>
  )
}

export default HelmetHome;