import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevated?: boolean
  children: React.ReactNode
}

export function Card({ elevated = false, children, className = '', ...props }: CardProps) {
  const baseClasses = elevated ? 'card card-elevated' : 'card'
  
  return (
    <div 
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}