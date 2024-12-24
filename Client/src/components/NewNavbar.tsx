import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa"; // Iconos para el menú hamburguesa

const NewNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-transparent text-white px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/img/logo-white.png" alt="Volamos Viajes" className="w-32" />
                </div>

                {/* Menu hamburguesa */}
                <div className="sm:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Menu */}
                <div className={`flex-col sm:flex sm:flex-row sm:items-center sm:space-x-6 ${isOpen ? 'flex' : 'hidden'}`}>
                    <a
                        href="#"
                        className="text-white hover:text-cyan-400 border-b-2 border-transparent hover:border-white transition"
                    >
                        Inicio
                    </a>
                    <a
                        href="#"
                        className="text-white hover:text-cyan-400 border-b-2 border-transparent hover:border-white transition"
                    >
                        Explorar
                    </a>
                    <a
                        href="#"
                        className="text-white hover:text-cyan-400 border-b-2 border-transparent hover:border-white transition"
                    >
                        Blog
                    </a>
                </div>

                {/* Contact Button */}
                <a
                    href="#"
                    className="hidden sm:block bg-cyan-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-cyan-500 transition"
                >
                    Contactanos
                </a>

                {/* Icons */}
                <div className="hidden sm:flex items-center space-x-4">
                    <button>
                        <FiSearch />
                    </button>
                    <button>
                        <LuLayoutGrid />
                    </button>
                </div>
            </div>

            {/* Contact Button for mobile */}
            <div className={`mt-4 ${isOpen ? 'block' : 'hidden'} sm:hidden`}>
                <a
                    href="#"
                    className="bg-cyan-400 text-white font-semibold py-2 px-4 rounded-full hover:bg-cyan-500 transition"
                >
                    Contactanos
                </a>
            </div>
        </nav>
    );
};

export default NewNavbar;
