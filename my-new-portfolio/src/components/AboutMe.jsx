import Me from "../assets/Me.jpeg";

function AboutMe() {

  return (
    <section
      id="about"
      className="py-16 px-8 section about-section"
    >
      <h2 className="text-4xl text-center mb-12 font-bold bg-gradient-to-r from-purple-700 to-violet-100 bg-clip-text text-transparent dark:text-purple-300">
        Sobre mí
      </h2>
      <div className="about-container mx-20">
        <div className="img-container">
          <div className="profile-img">
            <img src={Me} alt="Mi foto de perfil" className="" />
          </div>
        </div>
        <div className="bg-pink-50 dark:bg-gray-800 border border-violet-200 dark:border-violet-900 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-700 via-violet-300 to-violet-200 bg-clip-text text-transparent dark:text-pink-300">
            ¡Hola! Mi nombre es Marcia.
          </h3>
          <p className="mb-4 text-gray-500">
            Soy desarrolladora Frontend y profesora de Inglés con más de 2 años
            de experiencia en el sector IT. Me especializo en crear aplicaciones
            web modernas y responsivas utilizando las últimas tecnologías.
            Fusiono mi experiencia como profesora de inglés con mi pasión por el
            desarrollo web para crear soluciones digitales.
          </p>
          <p className="mb-4 text-gray-500">
            Mi experiencia abarca desde el desarrollo frontend con React y
            Angular, hasta el backend con Node.js y Express. Me encanta resolver
            problemas complejos y crear experiencias de usuario intuitivas y
            atractivas.
          </p>
          <p className="mb-4 text-gray-500">
            Soy una apasionada por la programación, me encanta la naturaleza,
            los animales, en especial los gatos. Soy proactiva, comprometida,
            autodidacta y me gusta aprender nuevas tecnologías. ¡Siempre estoy
            buscando nuevos desafíos y oportunidades para crecer
            profesionalmente!
          </p>
        </div>
      </div>
      <div className="flex justify-end mx-20 my-4">
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors">
          Descargar CV
        </button>
      </div>
    </section>
  );
}

export default AboutMe;
