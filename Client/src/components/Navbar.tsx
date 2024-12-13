import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroLogo from "./HeroLogo";
import Cookies from "js-cookie";
import { Menu, MenuItem, Avatar, ListItemIcon } from "@mui/material";
import { Logout } from "@mui/icons-material";
import classNames from "classnames";
import MiniPromoCarousel from "../utils/MiniPromoCarousel";

interface PropsHeader {
  color?: string;
}

const Header: React.FC<PropsHeader> = ({ color }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ name: string; lastname: string; avatar?: string } | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userAvatar, setUserAvatar] = useState<string | undefined>("/img/avatar/default-avatar.png");
  const [menuOpen] = useState(false); // Estado para la hamburguesa
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para el nuevo navbar en móvil

  const token = Cookies.get("authToken");
  const navigateTo = useNavigate();
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (token) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [token]);

  const smoothScrollToSection = (sectionId: string) => {
    const currentPath = window.location.pathname;

    if (currentPath !== "/") {
      navigateTo("/", { replace: true });
    }

    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, currentPath !== "/" ? 300 : 0);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
    handleCloseMenu();
  };

  const menuItems = [
    { name: "Categorias", uri: "category" },
    { name: "Autos", uri: "rentacar" },
    { name: "Destinos", uri: "destinations" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Navbar original */}
      <header
        className={classNames(
          "fixed top-0 py-1 left-0 w-full z-50 transition-colors duration-300",
          isScrolled || !menuOpen ? "bg-primary text-white shadow-lg" : "bg-transparent text-white"
        )}
        style={isScrolled || !menuOpen ? { borderBottom: "2px solid #ccc" } : {}}
      >
        <div className="flex justify-between items-center py-3 px-6 max-w-full lg:max-w-[85%] mx-auto">
          <div className="flex items-center cursor-pointer transition-transform transform">
            <HeroLogo color={color} />
          </div>
          <div className="flex md:hidden">
            <button onClick={toggleMobileMenu} className="flex flex-col items-center justify-center space-y-1">
              <span className={classNames("w-6 h-1 bg-white transition-all")}></span>
              <span className={classNames("w-6 h-1 bg-white")}></span>
              <span className={classNames("w-6 h-1 bg-white transition-all")}></span>
            </button>
          </div>
          <nav className={"items-center md:flex hidden"}>
            <ul className="flex gap-6 sm:gap-8 items-center">
              {menuItems.map(({ name, uri }) => (
                <li key={name}>
                  <button
                    className={classNames(
                      "duration-300 transform hover:underline",
                      isScrolled ? "text-white" : "text-white"
                    )}
                    onClick={() => smoothScrollToSection(uri)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 ml-6">
              {token && user ? (
                <div className="flex items-center gap-4 pl-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-center font-semibold">Usuario</span>
                    <span className="text-white">
                      {user.name.split(" ")[0]} {user.lastname.split(" ")[0]}
                    </span>
                  </div>
                  {/* Avatar con menú desplegable */}
                  <div>
                    <Avatar
                      src={userAvatar}
                      alt="Avatar"
                      className="cursor-pointer"
                      sx={{ width: 48, height: 48 }}
                      onClick={handleAvatarClick}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        onClick={handleLogout}
                        className="bg-white hover:bg-blue-600 transform transition-all duration-300 ease-in-out"
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" className="text-black" />
                        </ListItemIcon>
                        Cerrar sesión
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    className={classNames(
                      "py-2 px-5 rounded-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl",
                      isScrolled ? "bg-white text-primary hover:bg-gray-200" : "bg-transparent text-white shadow-md"
                    )}
                    onClick={() => navigateTo("/signin")}
                  >
                    Iniciar sesión
                  </button>
                  <button
                    className={classNames(
                      "py-2 px-5 rounded-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl",
                      isScrolled ? "bg-secondary text-white" : "bg-white text-secondary"
                    )}
                    onClick={() => navigateTo("/signup")}
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
        <MiniPromoCarousel/>
      </header>

      {/* Navbar para móviles */}
      {mobileMenuOpen && (
        <div
          className="fixed top-20 left-0 w-full bg-primary z-50 py-7 px-6 lg:hidden"
          style={{ transition: "all 0.3s ease-in-out" }}
        >
          <div className="flex flex-col items-center gap-6 justify-center">
            {menuItems.map(({ name, uri }) => (
              <button
                key={name}
                className="text-white text-lg font-semibold"
                onClick={() => {
                  smoothScrollToSection(uri);
                  toggleMobileMenu(); // Cierra el menú al hacer clic
                }}
              >
                {name}
              </button>
            ))}
            {token && user ? (
              <div className="flex items-center gap-4 pl-0 lg:pl-5 mt-0 lg:mt-5">
                <Avatar
                  src={userAvatar}
                  alt="Avatar"
                  className="cursor-pointer"
                  sx={{ width: 48, height: 48 }}
                  onClick={handleAvatarClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" className="text-black" />
                    </ListItemIcon>
                    Cerrar sesión
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <button
                  className={classNames(
                    "py-2 px-5 rounded-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl",
                    isScrolled ? "bg-white text-primary hover:bg-gray-200" : "bg-transparent text-white shadow-md"
                  )}
                  onClick={() => navigateTo("/signin")}
                >
                  Iniciar sesión
                </button>
                <button
                  className={classNames(
                    "py-2 px-5 rounded-sm font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl",
                    isScrolled ? "bg-secondary text-white" : "bg-white text-secondary"
                  )}
                  onClick={() => navigateTo("/signup")}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
