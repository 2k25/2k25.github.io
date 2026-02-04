import { motion } from 'framer-motion'
import { useInView } from './hooks/useInView'

interface AboutProps {
  config: {
    about: {
      title: string
      description: string
      highlights: string[]
    }
  }
}

export default function About({ config }: AboutProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 })

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

  return (
    <section id="about" className="relative bg-surface-50">
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
            01. About
          </motion.span>
          <motion.h2 variants={itemVariants} className="section-title mt-2">
            {config.about.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <motion.div variants={itemVariants}>
              <p className="text-gray-600 text-lg leading-relaxed">
                {config.about.description}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What I Focus On
              </h3>
              <ul className="space-y-3">
                {config.about.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary-500" />
                    <span className="text-gray-600">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { number: '4+', label: 'Years Experience' },
              { number: '3', label: 'Companies' },
              { number: '1', label: 'Startup Founded' },
              { number: '∞', label: 'Learning' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
