import { useState, useEffect } from 'react';
import classNames from 'classnames';

// Sample promotions
const promotions = [
    "✈️ Santo Domingo desde $199.00 *Restricciones aplican",
    "🇺🇸 Washington D.C desde $273.00 *Restricciones aplican",
    "🗽 New York D.C desde $209.00 *Restricciones aplican",
    "🏖️ Miami desde $146.00 *Restricciones aplican",
];

const MiniPromoCarousel: React.FC = () => {
    const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

    // Function to change the promotion every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPromoIndex((prevIndex) => (prevIndex + 1) % promotions.length);
        }, 5000); // Change promo every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const handleCarouselClick = () => {
        const promoMessage = `Hola, me gustaría saber más sobre las promociones que están en su sitio web (Paquetes)`;
        const whatsappUrl = `https://api.whatsapp.com/send/?phone=+50370200976&text=${promoMessage}`;
        window.open(whatsappUrl, "_blank"); // Open WhatsApp with the message
    };

    return (
        <div
            className={classNames(
                "fixed py-1 w-full z-10 transition-colors duration-300 bg-gradient-to-r from-primary via-secondary  to-secondary px-4 hover:cursor-pointer",
            )}
            style={{ borderBottom: "1px solid #ccc", }}
            onClick={handleCarouselClick} // Add the onClick handler
        >
            <div className="overflow-hidden w-full">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentPromoIndex * 100}%)` }}
                >
                    {promotions.map((promo, index) => (
                        <div key={index} className="flex-none w-full text-center">
                            <p className="text-sm text-white font-semibold">{promo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiniPromoCarousel;
