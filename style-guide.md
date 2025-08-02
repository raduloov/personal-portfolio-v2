# Premium UI Style Guide

## Brand Identity
A sophisticated, modern interface combining deep dark backgrounds with vibrant light orange accents. The design emphasizes clarity, professionalism, and premium quality through thoughtful use of space, subtle depth, and refined typography.

## Color Palette

### Primary Colors
```css
--primary-bg: #0A0A0B;        /* Deep black background */
--secondary-bg: #121214;      /* Slightly lighter black */
--tertiary-bg: #1A1A1D;       /* Card/component background */
--surface-bg: #232326;        /* Elevated surfaces */
```

### Accent Colors
```css
--accent-primary: #FF9F43;    /* Light orange - primary CTA */
--accent-hover: #FFB266;      /* Lighter orange - hover state */
--accent-active: #FF8C1A;     /* Darker orange - active/pressed */
--accent-glow: rgba(255, 159, 67, 0.4); /* Orange glow for effects */
```

### Text Colors
```css
--text-primary: #FFFFFF;      /* High contrast white */
--text-secondary: #B8B8BC;    /* Muted text */
--text-tertiary: #6C6C72;     /* Subtle/disabled text */
--text-inverse: #0A0A0B;      /* Text on light backgrounds */
```

### Semantic Colors
```css
--success: #4ADE80;           /* Green */
--warning: #FACC15;           /* Yellow */
--error: #EF4444;             /* Red */
--info: #3B82F6;              /* Blue */
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #FF9F43 0%, #FFB266 100%);
--gradient-dark: linear-gradient(180deg, #1A1A1D 0%, #0A0A0B 100%);
--gradient-subtle: linear-gradient(135deg, rgba(255, 159, 67, 0.1) 0%, rgba(255, 159, 67, 0.05) 100%);
```

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, monospace;
```

### Font Weights
```css
--font-thin: 100;
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Type Scale
```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Typography Styles

#### Headings
```css
h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-thin);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-light);
  letter-spacing: -0.01em;
  line-height: 1.3;
}

h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-light);
  line-height: 1.4;
}
```

#### Body Text
```css
.body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-light);
  line-height: 1.7;
}

.body-regular {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: 1.6;
}

.body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  line-height: 1.5;
}
```

## Spacing System

### Base Unit: 4px
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Border Radius
```css
--radius-sm: 0.375rem;    /* 6px */
--radius-md: 0.5rem;      /* 8px */
--radius-lg: 0.75rem;     /* 12px */
--radius-xl: 1rem;        /* 16px */
--radius-2xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* Pill shape */
```

## Shadows & Elevation

### Shadow System
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.6);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.7);
--shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.8);

/* Glow Effects */
--shadow-glow-sm: 0 0 10px var(--accent-glow);
--shadow-glow-md: 0 0 20px var(--accent-glow);
--shadow-glow-lg: 0 0 30px var(--accent-glow);
```

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--gradient-primary);
  color: var(--text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg), var(--shadow-glow-sm);
}

.btn-primary:active {
  transform: translateY(0);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  padding: var(--space-3) var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  font-weight: var(--font-light);
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(255, 159, 67, 0.1);
}
```

### Cards
```css
.card {
  background: var(--tertiary-bg);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card-elevated {
  background: var(--surface-bg);
  box-shadow: var(--shadow-lg);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: rgba(255, 159, 67, 0.2);
}
```

### Input Fields
```css
.input {
  background: var(--secondary-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-light);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(255, 159, 67, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}
```

### Navigation
```css
.nav {
  background: rgba(10, 10, 11, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: var(--space-4) 0;
}

.nav-item {
  color: var(--text-secondary);
  font-weight: var(--font-light);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  color: var(--accent-primary);
  background: rgba(255, 159, 67, 0.1);
}
```

## Animation & Transitions

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
```

### Common Animations
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes glow {
  0%, 100% { box-shadow: var(--shadow-glow-sm); }
  50% { box-shadow: var(--shadow-glow-lg); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
```

## Responsive Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

### Contrast Requirements
- Text on dark backgrounds: minimum 7:1 ratio
- Large text (18px+): minimum 4.5:1 ratio
- Interactive elements: minimum 3:1 ratio against background

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Implementation Examples

### Premium Card Component
```html
<div class="card card-premium">
  <div class="card-glow"></div>
  <h3 class="card-title">Premium Feature</h3>
  <p class="card-description">Experience the next level of functionality</p>
  <button class="btn-primary">
    Get Started
    <span class="btn-glow"></span>
  </button>
</div>
```

```css
.card-premium {
  position: relative;
  background: linear-gradient(135deg, var(--surface-bg) 0%, var(--tertiary-bg) 100%);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-premium:hover .card-glow {
  opacity: 0.3;
}
```

### Glass Morphism Effect
```css
.glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
}
```

## Best Practices

1. **Consistency**: Always use design tokens instead of hard-coded values
2. **Performance**: Use CSS transforms for animations instead of changing layout properties
3. **Accessibility**: Ensure all interactive elements have visible focus states
4. **Responsiveness**: Test all components across different screen sizes
5. **Dark Mode**: This guide is optimized for dark mode; ensure sufficient contrast
6. **Loading States**: Include skeleton screens and loading animations for better UX
7. **Micro-interactions**: Add subtle hover effects and transitions to enhance premium feel

## Tools & Resources

### Recommended Libraries
- **CSS Framework**: Tailwind CSS with custom configuration
- **Animation**: Framer Motion or CSS animations
- **Icons**: Lucide Icons or Heroicons (thin variants)
- **Charts**: Recharts with custom dark theme

### Color Tools
- Contrast checker: WebAIM Contrast Checker
- Palette generator: Coolors.co
- Gradient generator: CSS Gradient

### Typography Resources
- Google Fonts: Inter, Work Sans, Manrope
- Variable fonts for performance
- System font stack for fallbacks