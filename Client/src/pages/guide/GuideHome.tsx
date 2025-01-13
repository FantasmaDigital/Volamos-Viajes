import React from "react";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import GuideBanner from "../../components/guide/GuideBanner";
import RealTimeMap from "../../components/guide/maps/RealTimeMap";

const GuideHome: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Header color="white" showPromoCarousel={false} />
      <GuideBanner />
      <RealTimeMap />
      <Footer isMain={false} />
    </div>
  );
};

export default GuideHome;
