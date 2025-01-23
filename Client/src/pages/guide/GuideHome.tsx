import React from "react";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import GuideBanner from "../../components/guide/GuideBanner";
import RealTimeMap from "../../components/guide/maps/RealTimeMap";
import DefaultLocationMap from "../../components/guide/maps/DefaultLocationMap";
import { useLocation } from "../../context/guide/LocationContext";

const GuideHome: React.FC = () => {
  const { defaultRoute } = useLocation()

  return (
    <div className="w-full h-full">
      <Header color="white" showPromoCarousel={false} />
      <GuideBanner />
      {/* <DefaultLocationMap lat={defaultRoute?.lat} lng={defaultRoute?.lng} /> */}
      <hr className="my-10"/>
      <RealTimeMap />
      <Footer isMain={false} />
    </div>
  );
};

export default GuideHome;
