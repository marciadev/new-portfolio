import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import SnakeGame from "./components/SnakeGame";
import Contact from "./components/Contact";
import Transition from "./components/Transition";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { theme } = useContext(ThemeContext);
  const [previousPage, setPreviousPage] = useState(null);

  // Actualizar la página anterior cuando cambia la página actual
  useEffect(() => {
    setPreviousPage(currentPage);
  }, [currentPage]);

  // Función para cambiar de página
  // const changePage = (newPage) => {
  //   if (newPage !== currentPage) {
  //     setPreviousPage(currentPage);
  //     setCurrentPage(newPage);
  //   }
  // };

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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 pt-20 pb-4">
        <Transition currentPage={currentPage} previousPage={previousPage}>
          <div pageId={currentPage}>
            {renderPage()}
          </div>
        </Transition>
      </main>
    </div>
  );
}

export default App;
