import { Card } from './Card'
import styles from './SkillCard.module.css'

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function SkillCard({ icon, title, description }: SkillCardProps) {
  return (
    <Card className={styles.skillCard}>
      <div className={styles.skillIcon}>
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}