import React, { useMemo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Componente de imagen optimizado
const BrandImage: React.FC<{ src: string; alt: string }> = React.memo(({ src, alt }) => (
  <div className="px-4 flex justify-center items-center h-full">
    <img
      src={src}
      alt={alt}
      className="w-[175px] h-auto object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
      loading="lazy"
    />
  </div>
));

const Brands: React.FC = () => {
  // Uso de useMemo para evitar recalcular las imágenes en cada render
  const images = useMemo(() => 
    Array.from({ length: 10 }, (_, index) => `./img/brands/image${index + 1}.png`), []
  );

  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 1024 },
      items: 6,
    },
    large: {
      breakpoint: { max: 1024, min: 768 },
      items: 5,
    },
    medium: {
      breakpoint: { max: 768, min: 480 },
      items: 4,
    },
    small: {
      breakpoint: { max: 480, min: 0 },
      items: 3,
    },
  };

  return (
    <div className="relative w-full mx-auto py-4 bg-slate-100 shadow-xl">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2500}
        transitionDuration={1500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        arrows={false}
      >
        {images.map((image, index) => (
          <BrandImage key={index} src={image} alt={`Brand Image ${index + 1}`} />
        ))}
      </Carousel>
    </div>
  );
};

export default Brands;
