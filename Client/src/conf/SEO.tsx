import React from "react";
import { Helmet } from "react-helmet-async";

interface IHelmetConfig {
  pageTitle?: string;
  pageDescription?: string;
  pagePath?: string;
  pageImage?: string;
  pageKeywords?: string[];
  canonicalUrl?: string;
  includeCanonical?: boolean;
}

const SEO: React.FC<IHelmetConfig> = ({
  pageTitle = "✈️ Volamos Viajes | Tu Agencia de Viajes en El Salvador",
  pageDescription = "Reserva paquetes vacacionales con hasta 60% de descuento. Vuelos, hoteles y experiencias en los mejores destinos. Agencia ubicada en San Salvador, El Salvador.",
  pagePath = "/",
  pageImage = "https://volamosviajes.com/img/destinations/disney-paris-1.jpg",
  pageKeywords = ["viajes El Salvador", "paquetes turísticos San Salvador", "ofertas de vuelos", "agencias de viaje SV"],
  includeCanonical = true
}) => {
  const baseUrl = "https://volamosviajes.com";
  const fullUrl = `${baseUrl}${pagePath}`;
  const fullImageUrl = pageImage.startsWith("http") ? pageImage : `${baseUrl}${pageImage}`;
  
  // Configuración de colores corporativos
  const colors = {
    primary: '#0e3d5e',           // Azul Profundo
    secondary: '#1f567a',         // Azul Medio
    accent: '#e3462d',            // VVorange
    background: '#f4f6f9',        // Fondo General Gris Claro
    text: '#333333'               // Texto principal
  };

  // Datos estructurados principales
  const mainEntity = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Volamos Viajes",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon-32x32.png`,
    "description": pageDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "San Salvador, El Salvador",
      "addressLocality": "San Salvador",
      "addressRegion": "SV",
      "postalCode": "01101",
      "addressCountry": "SV"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+50370200976",
      "contactType": "customer service",
      "contactOption": "WhatsApp",
      "availableLanguage": ["Spanish"],
      "areaServed": "SV"
    },
    "sameAs": [
      "https://www.facebook.com/Volamosviajes/",
      "https://www.instagram.com/volamosviajes/",
      "https://www.tiktok.com/@volamosviajes"
    ]
  };

  return (
    <Helmet prioritizeSeoTags>
      {/* Metadatos básicos */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(", ")} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      
      {/* Esquema de colores */}
      <meta name="theme-color" content={colors.primary} />
      <meta name="msapplication-TileColor" content={colors.primary} />
      <meta name="msapplication-navbutton-color" content={colors.primary} />
      <meta name="apple-mobile-web-app-status-bar-style" content={colors.primary} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_SV" />
      <meta property="og:site_name" content="Volamos Viajes" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Canonical */}
      {includeCanonical && <link rel="canonical" href={fullUrl} />}
      
      {/* Datos estructurados */}
      <script type="application/ld+json">
        {JSON.stringify(mainEntity)}
      </script>
      
      {/* Favicon y assets */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={colors.primary} />
      
      {/* Geolocalización */}
      {/* <meta name="geo.region" content="SV" />
      <meta name="geo.placename" content="San Salvador" />
      <meta name="geo.position" content="13.6929;-89.2182" />
      <meta name="ICBM" content="13.6929, -89.2182" /> */}
      
      {/* Preconexiones */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;