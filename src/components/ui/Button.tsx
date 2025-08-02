import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = variant === 'primary' ? styles.btnPrimary : styles.btnSecondary
  
  return (
    <button 
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}