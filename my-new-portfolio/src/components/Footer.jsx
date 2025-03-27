import { TiHeart } from "react-icons/ti";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Footer() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { theme } = useContext(ThemeContext);
  return (
    <footer
      className={`container border-t py-6 ${
        theme === "dark"
          ? "bg-gray-900 border-purple-900/50"
          : "bg-purple-50 border-purple-100"
      }`}
    >
      <div className="mx-auto px-4 text-center">
        <p
          className={`flex items-center justify-center ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t.footer.footerMessage}
          <TiHeart className="w-6 h-6 text-red-500 mx-1 fill-red-500" />& React
        </p>
        <p
          className={`text-sm mt-2 ${
            theme === "dark" ? "text-gray-500" : "text-gray-500"
          }`}
        >
          © {new Date().getFullYear()} {t.footer.copyRight}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
