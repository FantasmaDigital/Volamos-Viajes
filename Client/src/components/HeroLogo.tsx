import React from "react";
import { Link } from "react-router-dom";
import { scrollToTop } from "../utils/functions/topScroll";

interface PropsHeroLogo {
  callback?: () => void;
  color?: string; 
}

const HeroLogo: React.FC<PropsHeroLogo> = ({ callback, color='original' }) => {
  const handleClick = () => {
    if (callback) callback();
    scrollToTop(); 
  };

  return (
    <Link to="/" onClick={handleClick}>
      <div className="flex flex-row items-center hover:cursor-pointer">
        <img src={`${color === 'original' ? '/img/logo.png' : '/img/logo-white.png'}`} alt="Volamos Viajes" className="w-32" />
      </div>
    </Link>
  );
};

export default HeroLogo;
