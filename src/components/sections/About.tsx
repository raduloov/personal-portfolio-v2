import { SkillCard } from '../ui/SkillCard'

const skills = [
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>⚡</span>,
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces with React, TypeScript, and modern CSS.'
  },
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>🔧</span>,
    title: 'Backend Development',
    description: 'Creating robust server-side applications with Node.js, databases, and RESTful APIs.'
  },
  {
    icon: <span style={{ fontSize: '32px', color: 'var(--accent-primary)' }}>🎨</span>,
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful interfaces that provide excellent user experiences.'
  }
]

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <div style={{ 
              width: '100%', 
              height: '100%', 
              background: 'var(--gradient-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-tertiary)'
            }}>
              [Your Photo]
            </div>
          </div>
          <div className="about-content">
            <h2>About Me</h2>
            <p>
              I'm a developer with a passion for creating exceptional digital experiences. 
              With expertise in modern web technologies, I bring ideas to life through clean, 
              efficient code and thoughtful design.
            </p>
            <p>
              My journey in development started with curiosity and has evolved into a 
              dedication to crafting solutions that make a difference. I believe in the 
              power of technology to solve problems and enhance lives.
            </p>
          </div>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}