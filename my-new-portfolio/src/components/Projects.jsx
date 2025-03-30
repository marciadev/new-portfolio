import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";
import Flamingo from "../assets/flamingo-img.png";
import ElectroShop from "../assets/e-commerce.png";
import Notes from "../assets/notes.png";
import Videogames from "../assets/videogames.png";

const Projects = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { theme } = useContext(ThemeContext);

  const projects = [
    {
      title: t.projects.items[0].title,
      description: t.projects.items[0].description,
      image: Flamingo,
      technologies: [
        "React",
        "JavaScript",
        "ReduxToolkit",
        "TailwindCSS",
        "Vite",
        "Java",
        "Spring Boot",
        "MySQL",
        "AWS",
      ],
      githubUrl: "https://github.com/marciadev/flamingo-fe",
      liveUrl: "https://www.flamingo.com.ar",
    },
    {
      title: t.projects.items[1].title,
      description: t.projects.items[1].description,
      image: ElectroShop,
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/marciadev/E-Commerce-G7",
      liveUrl: "https://electroshop-ecommerce.vercel.app/",
    },
    {
      title: t.projects.items[2].title,
      description: t.projects.items[2].description,
      image: Notes,
      technologies: [
        "JavaScript",
        "HTML",
        "CSS",
        "API",
        "React",
        "Node.js",
        "Express",
        "Sequelize",
      ],
      githubUrl: "https://github.com/marciadev/notes-app",
    },
    {
      title: t.projects.items[3].title,
      description: t.projects.items[3].description,
      image: Videogames,
      technologies: [
        "JavaScript",
        "HTML",
        "CSS",
        "API",
        "React",
        "Node.js",
        "Express",
        "Sequelize",
        "Redux",
        "Postgres",
      ],
      githubUrl: "https://github.com/marciadev/pi-videogames",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-violet-400" : "text-violet-700"
        }`}
      >
        {t.projects.title}
      </h1>

      <p
        className={`text-center mb-10 max-w-2xl mx-auto ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {t.projects.description}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-all hover:translate-y-[-5px] ${
              theme === "dark"
                ? "bg-gray-800 border-violet-900/30"
                : "bg-white border-violet-100"
            }`}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
              <div
                className={`absolute inset-0 flex items-end  hover:opacity-100 transition-opacity ${
                  theme === "dark"
                    ? "hover:bg-gradient-to-t from-violet-500/30 to-transparent"
                    : "hover:bg-gradient-to-t from-violet-900/70 to-transparent"
                }`}
              >
                <div className="p-4">
                  <div className="flex space-x-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-black/70 text-white rounded-full text-sm hover:bg-black transition-colors flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-violet-600/80 text-white rounded-full text-sm hover:bg-violet-600 transition-colors flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {project.title}
              </h3>
              <p
                className={`mb-4 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`px-2 py-1 rounded-full text-xs ${
                      theme === "dark"
                        ? "bg-violet-900/30 text-violet-300"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
