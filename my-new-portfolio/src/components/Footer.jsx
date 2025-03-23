import { TiHeart } from "react-icons/ti";
import { useContext } from "react"
import { LanguageContext } from "../context/LanguageContext"
import { translations } from "../data/translations"

function Footer() {
  const { language } = useContext(LanguageContext)
  const t = translations[language]
  return (
    <footer className="container absolute bg-purple-50 dark:bg-gray-900 border-t border-purple-100 dark:border-purple-900/50 mt-20 py-6">
      <div className="mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
          {t.footer.footerMessage}
          <TiHeart className="w-6 h-6 text-red-500 mx-1 fill-red-500" />& React
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          © {new Date().getFullYear()} {t.footer.copyRight}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
