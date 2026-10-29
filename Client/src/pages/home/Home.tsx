import React, { useEffect } from "react";
import { animated } from "@react-spring/web";
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
import { SpeedInsights } from '@vercel/speed-insights/react';
import SEO from "../../conf/SEO";
import AppDownloadSection from "../../components/AppDownloadSection";

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
      {/* Componente SEO con propiedades personalizadas para la página de inicio */}
      <SEO
        pageTitle="✈️ Volamos Viajes | Paquetes de Viaje con Descuento desde El Salvador"
        pageDescription="Reserva tus vacaciones con hasta 60% de descuento. Ofertas exclusivas en paquetes todo incluido a Cancún, Riviera Maya, Europa y más. Agencia de viajes en San Salvador."
        pagePath="/"
        pageKeywords={[
          "viajes desde El Salvador",
          "paquetes turísticos baratos",
          "ofertas de vuelos San Salvador",
          "agencias de viaje en SV",
          "vacaciones todo incluido"
        ]}
      />
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

        {/* App download CTA */}
        <AppDownloadSection />

        {/* TopDestinations */}
        <section className="w-full flex flex-col gap-10">
          <TopDestinations />
        </section>

        {/* Visas pre-CTA */}
        <section
          className="relative w-full px-6 py-20 text-white"
          style={{
            backgroundImage: 'url("/img/destinations/estambul-1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/70" aria-hidden />
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                Servicio de visas
              </span>
              <h3 className="text-2xl font-semibold sm:text-3xl">
                ¿Necesitas visa para tu próximo viaje?
              </h3>
              <p className="text-sm text-white/80">
                Te ayudamos con tu visa de Estados Unidos, Canadá, México, China, Australia y Reino Unido. Asesoría, formularios y citas con Volamos Viajes.
              </p>
            </div>
            <a
              href="/visas"
              className="relative inline-flex items-center justify-center rounded-md bg-white px-8 py-3.5 text-base font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-black/25 transition hover:-translate-y-1 hover:bg-white/90 hover:shadow-xl"
            >
              Ver más
            </a>
          </div>
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
      <SpeedInsights />
      <ScrollToTop />
    </div>
  );
};

export default React.memo(Home);
