import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

interface ProjectsProps {
  config: {
    projects: Array<{
      title: string
      description: string
      tags: string[]
      link: string
      featured: boolean
    }>
  }
}

export default function Projects({ config }: ProjectsProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const featuredProject = config.projects.find((p) => p.featured)
  const otherProjects = config.projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={itemVariants}
            className="text-accent font-mono text-sm"
          >
            04. Projects
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title mt-2">
            Featured Work
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle">
            Some things I've built
          </motion.p>

          {/* Featured Project */}
          {featuredProject && (
            <motion.div
              variants={itemVariants}
              className="relative mb-16"
            >
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/5 via-primary-500/5 to-transparent border border-gray-100 p-8 md:p-12">
                <div className="relative z-10">
                  <span className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full">
                    Featured Project
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-4">
                    {featuredProject.title}
                  </h3>
                  <p className="text-gray-600 text-lg max-w-2xl mb-6">
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm bg-white/80 text-gray-700 rounded-lg border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={featuredProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>View Project</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-full blur-3xl" />
              </div>
            </motion.div>
          )}

          {/* Other Projects Grid */}
          {otherProjects.length > 0 && (
            <>
              <motion.h3
                variants={itemVariants}
                className="text-xl font-semibold text-gray-900 mb-6"
              >
                Other Projects
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <motion.a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="card group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-accent/10 to-primary-500/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.a>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
