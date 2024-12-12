import React, { useEffect } from "react";
import { animated } from "@react-spring/web";
import { Helmet } from "react-helmet";
import Header from "../../components/Navbar";
import HeroSection from "../../components/HeroSection";
import Category from "../../components/Category";
import EasySteps from "../../components/EasySteps";
import Testimonials from "../../components/Testimonials";
import Brands from "../../components/Brands";
import Footer from "../../components/Footer";
import TopDestinations from "../../components/TopDestinations";
import IntroSection from "../../components/IntroSection";
import ScrollToTop from "../../components/ScrollTopBtn";
import Newsletter from "../../components/Newsletter";
import { useScrollAnimation } from "../../utils/functions/useScrollAnimation";
import { scrollToTop } from "../../utils/functions/topScroll";
import WhatsAppBtn from "../../components/WhatsAppBtn";
import PromotionPackage from "../../components/PromotionPackage";
import PromoPopUp from "../../utils/PromoPopUp";

const Home: React.FC = () => {
  useEffect(() => {
    scrollToTop()
  }, [])
  const { ref: brandsRef, springProps: brandsSpring } = useScrollAnimation(100);
  const { ref: categoriesRef, springProps: categoriesSpring } = useScrollAnimation(100);
  const { ref: promotionpkgRef, springProps: promotionpkgSpring } = useScrollAnimation(100);
  const { ref: testimonialsRef, springProps: testimonialsSpring } = useScrollAnimation(100);
  const { ref: footerRef, springProps: footerSpring } = useScrollAnimation(100);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white overflow-hidden">
      <Helmet>
        {/* Meta etiquetas generales */}
        <title>Volamos Viajes | Reserva Fácil y Rápida para tus Próximas Vacaciones</title>
        <meta name="description" content="Explora nuestras ofertas exclusivas de paquetes de viaje, destinos populares y promociones increíbles. Planea tus vacaciones soñadas con Volamos Viajes." />
        <meta name="keywords" content="viajes, vacaciones, destinos, ofertas exclusivas, paquetes de viaje, reservas fáciles, turismo, promociones de viajes, mejores ofertas" />
        <meta name="author" content="Volamos Viajes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="index, follow" />

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
        <link rel="canonical" href="https://volamosviajes.com/" />
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
      <PromoPopUp />

      <Header color="white" />
      <main className="w-full flex flex-col items-center">
        <HeroSection />
        {/* Section con Brands */}
        <section className="w-full flex flex-col">
          <animated.div style={brandsSpring} ref={brandsRef} className="w-full bg-gray-50">
            <Brands />
          </animated.div>
          <div className="w-full" ref={categoriesRef}>
            <Category />
          </div>
        </section>

        {/* EasySteps con animación */}
        <section className="w-full bg-white">
          <animated.div style={categoriesSpring}>
            <EasySteps />
          </animated.div>
        </section>

        {/* IntroSection con sombra */}
        <section className="w-full shadow-[0px_0px_19px_7px_rgba(204,_204,_204,_1)] z-10">
          <IntroSection />
        </section>

        {/* TopDestinations */}
        <section className="w-full flex flex-col gap-10">
          <TopDestinations />
        </section>

        <animated.div style={promotionpkgSpring} ref={promotionpkgRef} className='w-full'>
          <PromotionPackage />
        </animated.div>

        {/* Testimonials con zoom-in y Newsletter */}
        <section
          className="w-full flex flex-col gap-10"
          style={{
            backgroundImage: 'url("/img/background/testimonial.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <animated.div style={testimonialsSpring} ref={testimonialsRef}>
            <Testimonials />
          </animated.div>
          <Newsletter />
        </section>
      </main>

      {/* Botones fijos y footer */}
      <animated.div style={footerSpring} ref={footerRef} className='w-full'>
        <Footer />
      </animated.div>

      <WhatsAppBtn />
      <ScrollToTop />
    </div>
  );
};

export default React.memo(Home);
