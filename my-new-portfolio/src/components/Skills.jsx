import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";
import Loader from "./Loader";
import TechSlider from "./TechSlider";

const Skills = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { theme } = useContext(ThemeContext);

  const skillCategories = [
    {
      name: t.skills.categories.frontend,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      skills: [
        "React",
        "Angular",
        "Redux Toolkit",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      name: t.skills.categories.backend,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      ),
      skills: ["Node.js", "Express", "Sequelize", "Mongoose"],
    },
    {
      name: t.skills.categories.database,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      skills: ["MongoDB", "PostgreSQL"],
    },
    {
      name: t.skills.categories.version,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      skills: ["Git", "GitHub"],
    },
    {
      name: t.skills.categories.tools,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      skills: [
        "REST API",
        "Docker",
        "Agile/Scrum",
        "Microsoft Power Platform",
        "Visual Studio Code",
        "Postman",
        "Azure DevOps",
        "Trello",
        "Veracode",
      ],
    },
    {
      name: t.skills.categories.languages,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      skills: ["JavaScript", "TypeScript"],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-violet-400" : "text-violet-700"
        }`}
      >
        {t.skills.title}
      </h1>

      <p
        className={`text-center mb-10 max-w-2xl mx-auto ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {t.skills.description}
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow ${
              theme === "dark"
                ? "bg-gray-800 border-violet-900/30"
                : "bg-white border-violet-100"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    theme === "dark"
                      ? "bg-violet-900/30 text-violet-400"
                      : "bg-violet-100 text-violet-600"
                  }`}
                >
                  {category.icon}
                </div>
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 rounded-full text-sm ${
                      theme === "dark"
                        ? "bg-violet-900/30 text-violet-300"
                        : "bg-violet-100 text-violet-700"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <TechSlider />
    </div>
  );
};

export default Skills;
