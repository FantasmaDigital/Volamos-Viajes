import { FaTshirt, FaShoePrints, FaSun, FaBook, FaPlug, FaCloud, FaUmbrella, FaSuitcase, FaToiletPaper, FaMapMarkedAlt, FaFirstAid, FaCamera, FaLaptop, FaMobileAlt } from "react-icons/fa";

export const getIcon = (item: string, size: string = 'text-xl') => {
    if (item.toLowerCase().includes("ropa")) return <FaTshirt className={`text-blue-500 ${size}`} />;
    if (item.toLowerCase().includes("zapatos")) return <FaShoePrints className={`text-gray-500 ${size}`} />;
    if (item.toLowerCase().includes("sombrero") || item.toLowerCase().includes("protector solar")) return <FaSun className={`text-yellow-500 ${size}`} />;
    if (item.toLowerCase().includes("bufanda")) return <FaCloud className={`text-purple-500 ${size}`} />;
    if (item.toLowerCase().includes("paraguas")) return <FaUmbrella className={`text-blue-700 ${size}`} />;
    if (item.toLowerCase().includes("papel higiénico")) return <FaToiletPaper className={`text-gray-700 ${size}`} />;
    if (item.toLowerCase().includes("mapa")) return <FaMapMarkedAlt className={`text-green-700 ${size}`} />;
    if (item.toLowerCase().includes("kit de primeros auxilios") || item.toLowerCase().includes("botiquín")) return <FaFirstAid className={`text-red-500 ${size}`} />;
    if (item.toLowerCase().includes("cámara")) return <FaCamera className={`text-indigo-500 ${size}`} />;
    if (item.toLowerCase().includes("laptop") || item.toLowerCase().includes("computadora")) return <FaLaptop className={`text-gray-800 ${size}`} />;
    if (item.toLowerCase().includes("teléfono") || item.toLowerCase().includes("celular")) return <FaMobileAlt className={`text-blue-800 ${size}`} />;
    if (item.toLowerCase().includes("guía de frases")) return <FaBook className={`text-green-500 ${size}`} />;
    if (item.toLowerCase().includes("adaptador")) return <FaPlug className={`text-red-500 ${size}`} />;

    return <FaSuitcase className={`text-gray-600 ${size}`} />;
};