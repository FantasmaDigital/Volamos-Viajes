import React from "react";
import { Helmet } from "react-helmet";

const HelmetSignUp: React.FC = () => {
    return (
        <Helmet>
            {/* Meta etiquetas generales */}
            <title>Registro | Volamos Viajes - Crea tu cuenta y empieza a planificar tus vacaciones</title>
            <meta
                name="description"
                content="Crea tu cuenta en Volamos Viajes y accede a nuestras ofertas exclusivas de paquetes, destinos y promociones para tus próximas vacaciones. ¡Comienza ahora!"
            />
            <meta
                name="keywords"
                content="registro, crear cuenta, viajes, vacaciones, paquetes, ofertas, Volamos Viajes, nuevos usuarios, inscripción"
            />
            <meta name="author" content="Volamos Viajes" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="robots" content="index, follow" />

            {/* Meta etiquetas Open Graph para redes sociales */}
            <meta property="og:title" content="Registro | Volamos Viajes - Crea tu cuenta y empieza a planificar tus vacaciones" />
            <meta
                property="og:description"
                content="Crea tu cuenta en Volamos Viajes y accede a nuestras ofertas exclusivas de paquetes, destinos y promociones para tus próximas vacaciones. ¡Comienza ahora!"
            />
            <meta property="og:image" content="https://volamosviajes.com/img/logo.png" />
            <meta property="og:image:alt" content="Crear cuenta en Volamos Viajes" />
            <meta property="og:url" content="https://volamosviajes.com/signup" />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="es_ES" />

            {/* Meta etiquetas para Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Registro | Volamos Viajes - Crea tu cuenta y empieza a planificar tus vacaciones" />
            <meta
                name="twitter:description"
                content="Crea tu cuenta en Volamos Viajes y accede a nuestras ofertas exclusivas de paquetes, destinos y promociones para tus próximas vacaciones. ¡Comienza ahora!"
            />
            <meta name="twitter:image" content="https://volamosviajes.com/img/logo.png" />
            <meta name="twitter:image:alt" content="Crear cuenta en Volamos Viajes" />
            <meta name="twitter:site" content="@VolamosViajes" />
            <meta name="twitter:creator" content="@VolamosViajes" />

            {/* Meta etiquetas adicionales */}
            <link rel="canonical" href="https://volamosviajes.com/signup" />
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

export default HelmetSignUp;