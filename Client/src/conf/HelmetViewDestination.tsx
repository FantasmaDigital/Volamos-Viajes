import React from "react";
import { Helmet } from "react-helmet";

const HelmetViewDestination: React.FC<{ destination: any }> = ({ destination }) => {
    return (
        <Helmet>
            <title>{destination.name} | Volamos Viajes</title>
            <meta name="description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
            <meta name="keywords" content={`viajes, vacaciones, destinos, paquetes de viaje, turismo, promociones de viajes, ${destination.name}`} />
            <meta name="author" content="Volamos Viajes" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph */}
            <meta property="og:title" content={`${destination.name} | Volamos Viajes`} />
            <meta property="og:description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
            <meta property="og:image" content={destination.images[2]} />
            <meta property="og:image:alt" content={`Disfruta de tus vacaciones en ${destination.name}`} />
            <meta property="og:url" content={`https://volamosviajes.com/${destination.name}`} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="es_ES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${destination.name} | Volamos Viajes`} />
            <meta name="twitter:description" content={`Explora ${destination.name} y descubre todo lo que este destino tiene para ofrecer. Paquetes de viaje, ofertas exclusivas y mucho más.`} />
            <meta name="twitter:image" content={destination.images[2]} />
            <meta name="twitter:image:alt" content={`Disfruta de tus vacaciones en ${destination.name}`} />
            <meta name="twitter:site" content="@VolamosViajes" />
            <meta name="twitter:creator" content="@VolamosViajes" />

            {/* Additional meta tags */}
            <meta property="og:site_name" content="Volamos Viajes" />
            <meta name="theme-color" content="#0e3d5e" />
            <meta name="apple-mobile-web-app-title" content="Volamos Viajes" />
            <meta name="application-name" content="Volamos Viajes" />
            <meta name="msapplication-TileColor" content="#1f567a" />
            <meta name="msapplication-TileImage" content="https://volamosviajes.com/img/logo.png" />

            {/* Favicon and resources */}
            <link rel="icon" href="https://volamosviajes.com/favicon.ico" type="image/x-icon" />
            <link rel="apple-touch-icon" sizes="180x180" href="https://volamosviajes.com/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="https://volamosviajes.com/img/favicon-32x32.png" />
            <link rel="manifest" href="https://volamosviajes.com/site.webmanifest" />
        </Helmet>
    )
}

export default HelmetViewDestination;