import React from "react";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import GuideBanner from "../../components/guide/GuideBanner";
import RealTimeMap from "../../components/guide/maps/RealTimeMap";

const GuideHome: React.FC = () => {
    const centerOfSanSalvador = { lat: 13.683455, lng: -89.263850 };
  return (
    <div className="w-full h-full">
      <Header color="white" showPromoCarousel={false} />
      <GuideBanner />
      <Footer isMain={false} />
      <RealTimeMap endPoint={centerOfSanSalvador} />;
    </div>
  );
};

export default GuideHome;
