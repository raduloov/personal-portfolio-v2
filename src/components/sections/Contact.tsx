import { FormEvent } from 'react'
import { Button } from '../ui/Button'
import { Input, Textarea, Label } from '../ui/Form'

export function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <p style={{ 
          fontSize: 'var(--text-lg)', 
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-8)',
          maxWidth: '600px',
          margin: '0 auto var(--space-8)'
        }}>
          I'm always open to discussing new opportunities and interesting projects. 
          Feel free to reach out!
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Your name" 
              required 
            />
          </div>
          <div className="form-group">
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              required 
            />
          </div>
          <div className="form-group">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Your message..." 
              required
            />
          </div>
          <Button type="submit" style={{ width: '100%' }}>
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}