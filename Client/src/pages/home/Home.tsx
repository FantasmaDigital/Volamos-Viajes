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
      <PromoPopUp/>

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
