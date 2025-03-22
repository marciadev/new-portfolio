import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { RiToolsFill } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import Logo from "../assets/Logo.png";

function Header({ isDarkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleActiveSection = () => {
      const sections = ["#home", "#about", "#skills", "#projects", "#game", "#contact"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleActiveSection);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleActiveSection);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <div className="flex justify-between">
          <div
            className={`mx-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white ${
              isScrolled ? "opacity-5" : ""
            }`}
          >
            <img
              src={Logo}
              alt="brand"
              className="w-full h-full object-cover"
            />
          </div>

          <nav className="fixed flex justify-center top-1.5 mx-[30%] px-6 z-50 transition-all duration-300 hidden md:flex space-x-8 bg-black/20 backdrop-blur-md rounded">
            <NavLink href="#home" isActive={activeSection === "#home"}>
              <IoHomeOutline className="w-8 h-8" />
              Inicio
            </NavLink>
            <NavLink href="#about" isActive={activeSection === "#about"}>
              <CgProfile className="w-8 h-8" />
              Sobre mí
            </NavLink>
            <NavLink href="#skills" isActive={activeSection === "#skills"}>
              <RiToolsFill className="w-8 h-8" />
              Habilidades
            </NavLink>
            <NavLink href="#projects" isActive={activeSection === "#projects"}>
              <MdWorkOutline className="w-8 h-8" />
              Proyectos
            </NavLink>
            <NavLink href="#game" isActive={activeSection === "#game"}>
              <IoGameControllerOutline className="w-8 h-8" />
              Juego
            </NavLink>
            <NavLink href="#contact" isActive={activeSection === "#contact"}>
              <FiPhone className="w-8 h-8" />
              Contacto
            </NavLink>
          </nav>

          <button
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hidden md:block"
            onClick={toggleDarkMode}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
            <span className="sr-only">Toggle dark mode</span>
          </button>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-black/40 backdrop-blur-lg rounded-lg">
            <nav className="flex flex-col space-y-4 px-4">
            <MobileNavLink
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#home"}
              >
                <CgProfile className="w-8 h-8" />
                Inicio
              </MobileNavLink>
              <MobileNavLink
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#about"}
              >
                <CgProfile className="w-8 h-8" />
                Sobre mí
              </MobileNavLink>
              <MobileNavLink
                href="#skills"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#skills"}
              >
                <RiToolsFill className="w-8 h-8" />
                Habilidades
              </MobileNavLink>
              <MobileNavLink
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#projects"}
              >
                <MdWorkOutline className="w-8 h-8" />
                Proyectos
              </MobileNavLink>
              <MobileNavLink
                href="#game"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#game"}
              >
                <IoGameControllerOutline className="w-8 h-8" />
                Juego
              </MobileNavLink>
              <MobileNavLink
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                isActive={activeSection === "#contact"}
              >
                <FiPhone className="w-8 h-8" />
                Contacto
              </MobileNavLink>
            </nav>

            <button
              className="flex items-center text-left hover:text-pink-500 transition-colors"
              onClick={() => {
                toggleDarkMode();
                setIsMobileMenuOpen(false);
              }}
            >
              {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
              <span className="ml-2">
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

const NavLink = ({ href, children, isActive }) => {
  function handleNavClick(sectionId) {
    // Remueve la clase 'active' de todas las secciones
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.remove("active");
    });

    // Agrega la clase 'active' a la sección seleccionada
    const selectedSection = document.querySelector(sectionId);
    if (selectedSection) {
      selectedSection.classList.add("active");
    }
  }

  return (
    <a
      onClick={() => handleNavClick(href)}
      href={href}
      className={`flex flex-col items-center text-white font-medium relative py-2 group transition-colors duration-300 ${
        isActive ? "text-violet-400" : "hover:text-violet-400"
      }`}
    >
      {children}
      {isActive && (
        <span
          layoutId="underline" // Identificador único para animar el subrayado
          className="absolute bottom-0 left-0 h-0.5 bg-violet-500 w-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </a>
  );
};

const MobileNavLink = ({ href, onClick, children, isActive }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-white font-medium py-2 px-3 rounded-md transition-colors duration-300 ${
        isActive
          ? "bg-violet-600/40 text-violet-300"
          : "hover:bg-violet-600/30 hover:text-violet-300"
      }`}
    >
      {children}
    </a>
  );
};

export default Header;
