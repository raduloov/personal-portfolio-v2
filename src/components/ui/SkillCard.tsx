import { Card } from './Card'

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function SkillCard({ icon, title, description }: SkillCardProps) {
  return (
    <Card className="skill-card">
      <div className="skill-icon">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}