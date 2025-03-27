import { createContext, useState, useEffect } from "react"

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")

    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const browserLanguage = navigator.language.split("-")[0]

      if (browserLanguage === "es") {
        setLanguage("es")
      } else {
        setLanguage("en")
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"))
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage }}>{children}</LanguageContext.Provider>
}