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

  useEffect(() => {
    setPreviousPage(currentPage);
  }, [currentPage]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 pt-20 pb-4">
        <Transition currentPage={currentPage} previousPage={previousPage}>
          <div key="home">
            <Home />
          </div>
          <div key="about">
            <AboutMe />
          </div>
          <div key="skills">
            <Skills />
          </div>
          <div key="projects">
            <Projects />
          </div>
          <div key="game">
            <SnakeGame />
          </div>
          <div key="contact">
            <Contact />
          </div>
        </Transition>
      </main>
    </div>
  );
}

export default App;
