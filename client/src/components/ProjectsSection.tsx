import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import { motion } from 'framer-motion'

// Import generated project images
import webProjectImage from '@assets/generated_images/Web_development_project_mockup_4ee70ad8.png'
import mobileProjectImage from '@assets/generated_images/Mobile_app_project_mockup_dbe40f84.png'
import digitalSolutionImage from '@assets/generated_images/Digital_solution_project_mockup_2c25b0fa.png'

export default function ProjectsSection() {
  // TODO: remove mock functionality - replace with real project data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Plattform',
      description: 'Moderne Online-Shop-Lösung mit React, Node.js und Stripe-Integration. Vollständig responsive Design mit Admin-Dashboard.',
      image: webProjectImage,
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      type: 'Webentwicklung'
    },
    {
      id: 2,
      title: 'Fitness Tracking App',
      description: 'Mobile App für Fitness-Tracking mit personalisierten Trainingsplänen und Progress-Monitoring.',
      image: mobileProjectImage,
      technologies: ['React Native', 'Firebase', 'Charts.js'],
      type: 'App-Entwicklung'
    },
    {
      id: 3,
      title: 'Business Analytics Dashboard',
      description: 'Umfassendes Dashboard für Datenanalyse mit Echtzeit-Visualisierungen und automatisierten Berichten.',
      image: digitalSolutionImage,
      technologies: ['React', 'D3.js', 'Python', 'AWS'],
      type: 'Digitale Lösung'
    }
  ]

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" data-testid="projects-title">
            Projekte & Referenzen
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto" data-testid="projects-subtitle">
            Eine Auswahl meiner erfolgreich umgesetzten Projekte, die die Vielfalt 
            und Qualität meiner Entwicklungsarbeit demonstrieren.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate group" data-testid={`project-card-${project.id}`}>
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      data-testid={`project-image-${project.id}`}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3" data-testid={`project-title-${project.id}`}>
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm" data-testid={`project-description-${project.id}`}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
                          data-testid={`project-tech-${project.id}-${techIndex}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" data-testid={`project-demo-${project.id}`}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                      <Button variant="ghost" size="sm" data-testid={`project-code-${project.id}`}>
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-6" data-testid="projects-note">
            Diese Projekte zeigen nur einen Ausschnitt meiner Arbeit. 
            Gerne präsentiere ich Ihnen weitere Referenzen in einem persönlichen Gespräch.
          </p>
          <Button variant="outline" data-testid="button-more-projects">
            Weitere Projekte ansehen
          </Button>
        </motion.div>
      </div>
    </section>
  )
}