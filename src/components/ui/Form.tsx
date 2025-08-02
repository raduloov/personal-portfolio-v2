import { InputHTMLAttributes, TextareaHTMLAttributes, LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label 
      className={`form-label ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input 
      className={`form-input ${className}`}
      {...props}
    />
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = '', ...props }: TextareaProps) {
  return (
    <textarea 
      className={`form-textarea ${className}`}
      {...props}
    />
  )
}