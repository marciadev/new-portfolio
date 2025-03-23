import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import SnakeGame from "./components/SnakeGame";
import Contact from "./components/Contact";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Renderizar el componente correspondiente según la página actual
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "about":
        return <AboutMe />;
      case "skills":
        return <Skills />;
      case "projects":
        return <Projects />;
      case "game":
        return <SnakeGame />;
      case "contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="container mx-auto px-4 pt-20 pb-4">
            {renderPage()}
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;