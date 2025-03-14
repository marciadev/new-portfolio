import Me from "../assets/Me.jpeg";

function AboutMe() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-3xl text-center mb-12 font-bold bg-gradient-to-r from-purple-500 to-violet-300 bg-clip-text text-transparent dark:text-pink-300">
        Sobre mí
      </h2>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-pink-200 dark:border-pink-800">
            <img
              src={Me}
              alt="Mi foto de perfil"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="bg-pink-50 dark:bg-gray-800 border border-pink-200 dark:border-pink-900 rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4 text-pink-600 dark:text-pink-300">
            Desarrollador Web Full Stack
          </h3>
          <p className="mb-4">
            ¡Hola! Mi nombre es Marcia. Soy desarrolladora Frontend con más de 2
            años de experiencia en el sector IT. Me especializo en crear
            aplicaciones web modernas y responsivas utilizando las últimas
            tecnologías.
          </p>
          <p className="mb-4">
            Mi experiencia abarca desde el desarrollo frontend con React y
            Angular, hasta el backend con Node.js y Express. Me encanta resolver
            problemas complejos y crear experiencias de usuario intuitivas y
            atractivas.
          </p>
          <p>
            Cuando no estoy programando, disfruto de la fotografía, el
            senderismo y aprender nuevas tecnologías. ¡Siempre estoy buscando
            nuevos desafíos y oportunidades para crecer profesionalmente!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
