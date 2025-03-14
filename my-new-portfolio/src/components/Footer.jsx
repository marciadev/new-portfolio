import { TiHeart } from "react-icons/ti";

function Footer() {
    return (
      <footer className="bg-white dark:bg-gray-900 border-t border-pink-100 dark:border-pink-900/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center text-gray-600 dark:text-gray-400">
            Hecho con
            <TiHeart className="w-6 h-6 text-pink-500 mx-1 fill-pink-500" />
            y React
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} Mi Portfolio. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  