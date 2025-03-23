import { createContext, useState, useEffect } from "react";

// Crear contexto
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Estado para el tema (claro u oscuro)
  const [theme, setTheme] = useState("light");

  // Efecto para inicializar el tema basado en la preferencia del usuario o localStorage
  useEffect(() => {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem("theme");

    // Si hay un tema guardado, usarlo
    if (savedTheme) {
      setTheme(savedTheme);
    }
    // Si no hay tema guardado, verificar la preferencia del sistema
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  // Efecto para aplicar la clase 'dark' al elemento html cuando el tema es oscuro
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Guardar el tema en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
