import { useState, useEffect } from "react"
import Home from "./components/Home"
import Header from "./components/Header"
import AboutMe from "./components/AboutMe"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import SnakeGame from "./components/SnakeGame"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem("darkMode", String(newMode))

    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-2">
        <Home />
        <AboutMe />
        <Skills />
        <Projects />
        <SnakeGame />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App;