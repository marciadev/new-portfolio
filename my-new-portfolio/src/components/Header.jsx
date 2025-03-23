import React, { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { LanguageContext } from "../context/LanguageContext"
import { translations } from "../data/translations"
import Logo from "../assets/Logo.png";

const Header = ({ currentPage, setCurrentPage }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const { language, toggleLanguage } = useContext(LanguageContext)
  const t = translations[language]

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="mx-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white"
            onClick={() => setCurrentPage("home")}
          >
            <img
              src={Logo}
              alt="my-brand"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navegación */}
          <nav className="hidden md:flex space-x-1">
            <NavItem isActive={currentPage === "home"} onClick={() => setCurrentPage("home")}>
              {t.nav.home}
            </NavItem>
            <NavItem isActive={currentPage === "about"} onClick={() => setCurrentPage("about")}>
              {t.nav.about}
            </NavItem>
            <NavItem isActive={currentPage === "skills"} onClick={() => setCurrentPage("skills")}>
              {t.nav.skills}
            </NavItem>
            <NavItem isActive={currentPage === "projects"} onClick={() => setCurrentPage("projects")}>
              {t.nav.projects}
            </NavItem>
            <NavItem isActive={currentPage === "game"} onClick={() => setCurrentPage("game")}>
              {t.nav.game}
            </NavItem>
            <NavItem isActive={currentPage === "contact"} onClick={() => setCurrentPage("contact")}>
              {t.nav.contact}
            </NavItem>
          </nav>

          {/* Controles (Tema e Idioma) */}
          <div className="flex items-center space-x-4">
            {/* Selector de idioma */}
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
            >
              {language === "es" ? "EN" : "ES"}
            </button>

            {/* Selector de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-violet-100 dark:hover:bg-violet-900/30 text-violet-700 dark:text-violet-300 transition-colors"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Menú móvil */}
            <div className="md:hidden">
              <MobileMenu currentPage={currentPage} setCurrentPage={setCurrentPage} translations={t} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// Componente para los elementos de navegación
const NavItem = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md font-medium transition-colors ${
        isActive
          ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300"
      }`}
    >
      {children}
    </button>
  )
}

// Componente para el menú móvil
const MobileMenu = ({ currentPage, setCurrentPage, translations }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleNavigation = (page) => {
    setCurrentPage(page)
    setIsOpen(false)
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 left-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
          <div className="py-2 px-4 space-y-1">
            <MobileNavItem isActive={currentPage === "home"} onClick={() => handleNavigation("home")}>
              {translations.nav.home}
            </MobileNavItem>
            <MobileNavItem isActive={currentPage === "about"} onClick={() => handleNavigation("about")}>
              {translations.nav.about}
            </MobileNavItem>
            <MobileNavItem isActive={currentPage === "skills"} onClick={() => handleNavigation("skills")}>
              {translations.nav.skills}
            </MobileNavItem>
            <MobileNavItem isActive={currentPage === "projects"} onClick={() => handleNavigation("projects")}>
              {translations.nav.projects}
            </MobileNavItem>
            <MobileNavItem isActive={currentPage === "game"} onClick={() => handleNavigation("game")}>
              {translations.nav.game}
            </MobileNavItem>
            <MobileNavItem isActive={currentPage === "contact"} onClick={() => handleNavigation("contact")}>
              {translations.nav.contact}
            </MobileNavItem>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para los elementos de navegación móvil
const MobileNavItem = ({ children, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`block w-full text-left px-3 py-2 rounded-md font-medium transition-colors ${
        isActive
          ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
          : "text-gray-700 dark:text-gray-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-700 dark:hover:text-violet-300"
      }`}
    >
      {children}
    </button>
  )
}

export default Header;