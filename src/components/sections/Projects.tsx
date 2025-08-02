import { ProjectCard } from '../ui/ProjectCard'

const projects = [
  {
    title: 'Project Name',
    description: 'A brief description of the project showcasing the main features and technologies used.',
    tags: ['React', 'TypeScript', 'Node.js']
  },
  {
    title: 'Another Project',
    description: 'Description of another amazing project highlighting the problem solved and impact created.',
    tags: ['Vue.js', 'Python', 'PostgreSQL']
  },
  {
    title: 'Creative Project',
    description: 'An innovative solution that demonstrates creative problem-solving and technical expertise.',
    tags: ['Next.js', 'GraphQL', 'AWS']
  }
]

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </section>
  )
}