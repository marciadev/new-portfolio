function Projects() {
    const projects = [
      {
        title: "E-commerce Platform",
        description:
          "Una plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
        videoUrl: "https://example.com/video1",
        githubUrl: "https://github.com/username/ecommerce-platform",
        liveUrl: "https://ecommerce-platform.example.com",
      },
      {
        title: "Task Management App",
        description:
          "Aplicación de gestión de tareas con funcionalidades de arrastrar y soltar, recordatorios y colaboración en equipo.",
        technologies: ["Angular", "Firebase", "TypeScript", "RxJS"],
        videoUrl: "https://example.com/video2",
        githubUrl: "https://github.com/username/task-management",
        liveUrl: "https://task-app.example.com",
      },
      {
        title: "Social Media Dashboard",
        description:
          "Panel de control para analíticas de redes sociales con visualizaciones de datos en tiempo real y reportes personalizados.",
        technologies: ["Vue.js", "D3.js", "Node.js", "PostgreSQL"],
        videoUrl: "https://example.com/video3",
        githubUrl: "https://github.com/username/social-dashboard",
        liveUrl: "https://social-dashboard.example.com",
      },
    ]
  
    return (
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-pink-500 dark:text-pink-300">Mis Proyectos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-pink-200 dark:border-pink-900 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-pink-100 dark:bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black rounded-md border border-pink-200 dark:border-pink-800 transition-colors">
                      Ver Demo
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-pink-600 dark:text-pink-300">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between border-t border-pink-100 dark:border-pink-900/50 pt-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>Código</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 rounded-md border border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default Projects  