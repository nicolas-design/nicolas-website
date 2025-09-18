import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Star, Zap, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

// Import generated project images
import webProjectImage from '@assets/generated_images/Web_development_project_mockup_4ee70ad8.png'
import mobileProjectImage from '@assets/generated_images/Mobile_app_project_mockup_dbe40f84.png'
import digitalSolutionImage from '@assets/generated_images/Digital_solution_project_mockup_2c25b0fa.png'

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // TODO: remove mock functionality - replace with real project data
  const projects = [
    {
      id: 1,
      title: 'ShopFlow Pro',
      subtitle: 'E-Commerce Revolution 🛒',
      description: 'Eine vollständig customizable E-Commerce-Plattform, die ich von Grund auf entwickelt habe. Mit KI-gestützten Produktempfehlungen und einem Admin-Dashboard, das selbst meine Oma verstehen würde!',
      image: webProjectImage,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AI/ML'],
      type: 'Webentwicklung',
      color: 'from-blue-500 to-cyan-400',
      stats: { users: '2.5k+', rating: '4.9', time: '3 Monate' },
      highlight: 'Performance-Optimierung um 300%! 🚀'
    },
    {
      id: 2,
      title: 'FitTracker Elite',
      subtitle: 'Deine persönliche Fitness-Journey 💪',
      description: 'Mehr als nur eine Fitness-App - es ist dein digitaler Trainingspartner! Mit personalisierten Workouts, Progress-Tracking und einer Community, die dich pusht.',
      image: mobileProjectImage,
      technologies: ['React Native', 'Firebase', 'Charts.js', 'HealthKit'],
      type: 'App-Entwicklung',
      color: 'from-green-500 to-emerald-400',
      stats: { users: '5k+', rating: '4.8', time: '4 Monate' },
      highlight: 'Apple Health Integration war ein Game-Changer! 📱'
    },
    {
      id: 3,
      title: 'DataViz Master',
      subtitle: 'Daten zum Leben erwecken 📊',
      description: 'Ein Dashboard, das selbst die langweiligsten Zahlen spannend macht! Real-time Visualisierungen, die Business-Entscheidungen revolutionieren.',
      image: digitalSolutionImage,
      technologies: ['React', 'D3.js', 'Python', 'AWS', 'WebSocket'],
      type: 'Digitale Lösung',
      color: 'from-purple-500 to-pink-400',
      stats: { users: '1.2k+', rating: '5.0', time: '5 Monate' },
      highlight: 'Echtzeit-Updates in unter 100ms! ⚡'
    }
  ]

  const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "backOut" }}
      onMouseEnter={() => setHoveredProject(project.id)}
      onMouseLeave={() => setHoveredProject(null)}
      className="group cursor-pointer"
    >
      <Card className="h-full relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300" data-testid={`project-card-${project.id}`}>
        {/* Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10`}
          animate={hoveredProject === project.id ? { opacity: 0.1 } : { opacity: 0 }}
        />
        
        <CardContent className="p-0 relative z-20">
          {/* Project Image with Creative Overlay */}
          <div className="relative overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
              animate={hoveredProject === project.id ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              data-testid={`project-image-${project.id}`}
            />
            
            {/* Floating Type Badge */}
            <motion.div 
              className="absolute top-4 left-4"
              animate={hoveredProject === project.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`bg-gradient-to-r ${project.color} text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg`}>
                {project.type}
              </span>
            </motion.div>

            {/* Stats Overlay on Hover */}
            <motion.div
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-white text-center">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div className="flex flex-col items-center">
                    <Users className="h-4 w-4 mb-1" />
                    <span className="font-bold">{project.stats.users}</span>
                    <span>Users</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Star className="h-4 w-4 mb-1" />
                    <span className="font-bold">{project.stats.rating}</span>
                    <span>Rating</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-4 w-4 mb-1" />
                    <span className="font-bold">{project.stats.time}</span>
                    <span>Zeit</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="p-6">
            {/* Title with Animation */}
            <motion.div
              animate={hoveredProject === project.id ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-1" data-testid={`project-title-${project.id}`}>
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3 font-medium">
                {project.subtitle}
              </p>
            </motion.div>
            
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed" data-testid={`project-description-${project.id}`}>
              {project.description}
            </p>

            {/* Highlight Box */}
            <motion.div 
              className={`bg-gradient-to-r ${project.color} bg-opacity-10 p-3 rounded-lg mb-4 border border-primary/20`}
              animate={hoveredProject === project.id ? { scale: 1.02 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{project.highlight}</span>
              </div>
            </motion.div>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, techIndex) => (
                <motion.span 
                  key={techIndex}
                  className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full font-medium"
                  whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
                  data-testid={`project-tech-${project.id}-${techIndex}`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="sm" 
                  className={`bg-gradient-to-r ${project.color} hover:opacity-90 border-0`}
                  data-testid={`project-demo-${project.id}`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" data-testid={`project-code-${project.id}`}>
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Button>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section id="projects" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Creative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, rotateX: -20 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "backOut" }}
            data-testid="projects-title"
          >
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meine digitalen Babys
            </span>
            <motion.span 
              className="inline-block ml-2"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              👶
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            data-testid="projects-subtitle"
          >
            Jedes Projekt ist eine kleine{' '}
            <span className="text-primary font-semibold">Erfolgsgeschichte</span>! 
            Von der ersten Skizze bis zum finalen Deploy - hier siehst du, 
            wie aus verrückten Ideen{' '}
            <span className="text-purple-500 font-semibold">echte Lösungen</span>{' '}
            werden. 🚀✨
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <span>Mehr Projekte gewünscht?</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👀
              </motion.span>
            </h3>
            <p className="text-muted-foreground mb-6" data-testid="projects-note">
              Das ist nur die Spitze des Eisbergs! In meinem GitHub gibt's noch viel mehr 
              zu entdecken. Lass uns quatschen und ich zeig dir gerne weitere Projekte! 🎯
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-500 hover:opacity-90"
                data-testid="button-more-projects"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub Portfolio durchstöbern
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}