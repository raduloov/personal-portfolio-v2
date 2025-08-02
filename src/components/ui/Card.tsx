import type { HTMLAttributes } from 'react'
import styles from './Card.module.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  children: React.ReactNode
}

export function Card({ elevated = false, children, className = '', ...props }: CardProps) {
  const baseClasses = elevated ? `${styles.card} ${styles.cardElevated}` : styles.card
  
  return (
    <div 
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}