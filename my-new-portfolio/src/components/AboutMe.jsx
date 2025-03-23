import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";
import Me from "../assets/Me.jpeg";
import EnglishCV from "../assets/Marcia-English.pdf";
import SpanishCV from "../assets/Marcia-Espanol.pdf";

const AboutMe = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-violet-700 dark:text-violet-400">
        {t.about.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img src={Me} alt={t.about.photoAlt} className="w-full h-auto" />
          <div className="absolute inset-0 bg-gradient-to-t from-violet-900/70 to-transparent flex items-end">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                {t.about.name}
              </h2>
              <p className="text-violet-200">{t.about.role}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-violet-700 dark:text-violet-400">
              {t.about.bioTitle}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{t.about.bio}</p>
            <div className="flex justify-end my-4">
              {language === "es" ? (
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors">
                  <a href={SpanishCV} download>
                    {t.about.btnDownload}
                  </a>
                </button>
              ) : (
                <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors">
                  <a href={EnglishCV} download>
                    {t.about.btnDownload}
                  </a>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
