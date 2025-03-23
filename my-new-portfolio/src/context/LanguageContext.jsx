import { createContext, useState, useEffect } from "react"

// Crear contexto
export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  // Estado para el idioma (español o inglés)
  const [language, setLanguage] = useState("es")

  // Efecto para inicializar el idioma basado en localStorage o el idioma del navegador
  useEffect(() => {
    // Verificar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem("language")

    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Obtener el idioma del navegador
      const browserLanguage = navigator.language.split("-")[0]

      // Establecer el idioma basado en el idioma del navegador (solo soportamos es e en)
      if (browserLanguage === "es") {
        setLanguage("es")
      } else {
        setLanguage("en")
      }
    }
  }, [])

  // Efecto para guardar el idioma en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Función para alternar entre idiomas
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"))
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}