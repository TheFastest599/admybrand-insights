# ADmyBRAND Insights Design System

## 🎨 Overview

The ADmyBRAND Insights design system provides a comprehensive set of tokens, components, and guidelines to ensure consistent, accessible, and beautiful user interfaces across the entire application.

## 🎯 Design Principles

### 1. **Consistency**

- Unified color palette across all components
- Consistent spacing using 8px grid system
- Standardized typography scale for hierarchy
- Predictable interaction patterns

### 2. **Accessibility**

- WCAG 2.1 AA compliance
- Proper contrast ratios (4.5:1 minimum)
- Focus management and keyboard navigation
- Screen reader optimized semantics

### 3. **Performance**

- Optimized animations with `prefers-reduced-motion`
- Memoized components to prevent unnecessary re-renders
- Lazy loading for heavy components
- Efficient CSS with design tokens

### 4. **Aesthetics**

- Modern, clean interface with subtle depth
- Smooth micro-interactions and transitions
- Beautiful color gradients and glass morphism effects
- Responsive design for all screen sizes

## 🎨 Color System

### Light Theme

```css
--background: oklch(0.99 0.005 106.75)     /* Near white with warm tint */
--foreground: oklch(0.09 0.005 106.75)     /* Near black with warm tint */
--primary: oklch(0.47 0.15 264.05)         /* Modern blue */
--secondary: oklch(0.96 0.005 106.75)      /* Light gray */
--success: oklch(0.55 0.15 142.5)          /* Green */
--warning: oklch(0.65 0.15 85.87)          /* Orange */
--destructive: oklch(0.55 0.22 22.18)      /* Red */
--info: oklch(0.55 0.15 220.15)            /* Blue */
```

### Dark Theme

```css
--background: oklch(0.09 0.005 240)        /* Dark blue-gray */
--foreground: oklch(0.95 0.005 240)        /* Off white */
--primary: oklch(0.65 0.15 264.05)         /* Brighter blue */
--secondary: oklch(0.17 0.005 240)         /* Dark gray */
```

### Usage

```jsx
// Using CSS variables
className = 'bg-primary text-primary-foreground';

// Using semantic classes
className = 'bg-success text-success-foreground';
```

## 📏 Spacing Scale

Based on 8px grid system for consistent rhythm:

```javascript
spacing: {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  '4xl': '6rem',    // 96px
  '5xl': '8rem',    // 128px
}
```

## ✍️ Typography Scale

Optimized for readability and hierarchy:

```javascript
fontSizes: {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
}
```

### Display Typography

```css
.text-display-2xl {
  font-size: 4.5rem;
  line-height: 1;
  letter-spacing: -0.025em;
}
.text-display-xl {
  font-size: 3.75rem;
  line-height: 1;
  letter-spacing: -0.025em;
}
.text-display-lg {
  font-size: 3rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.text-display-md {
  font-size: 2.25rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.text-display-sm {
  font-size: 1.875rem;
  line-height: 1.15;
  letter-spacing: -0.015em;
}
```

## 🎭 Animation System

### Durations

```javascript
durations: {
  fastest: '100ms',   // Micro-interactions
  fast: '150ms',      // Hover states
  normal: '200ms',    // Standard transitions
  slow: '300ms',      // Complex transitions
  slower: '500ms',    // Page transitions
  slowest: '1000ms',  // Loading animations
}
```

### Easing Functions

```javascript
easings: {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',    // Standard smooth
  snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',    // Quick response
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Playful bounce
}
```

### Predefined Animations

```css
/* Fade in with slide up */
.animate-fade-in {
  animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Slide in from bottom */
.animate-slide-in-bottom {
  animation: slideInBottom 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scale in effect */
.animate-scale-in {
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Shimmer loading effect */
.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## 🃏 Component Variants

### Button Variants

```jsx
<Button variant="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="gradient">Gradient Button</Button>
<Button variant="success">Success Button</Button>
<Button variant="warning">Warning Button</Button>
<Button variant="destructive">Destructive Button</Button>
```

### Card Variants

```jsx
<Card variant="default">Standard Card</Card>
<Card variant="elevated">Elevated Card</Card>
<Card variant="interactive">Interactive Card</Card>
<Card variant="gradient">Gradient Card</Card>
<Card variant="glass">Glass Morphism Card</Card>
<Card variant="outline">Outlined Card</Card>
```

### Button Sizes

```jsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">Icon Only</Button>
```

## 🎯 Utility Classes

### Interactive Elements

```css
.interactive {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.interactive:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}
```

### Glass Morphism

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Gradients

```css
.gradient-primary {
  background: linear-gradient(
    135deg,
    hsl(var(--primary)),
    hsl(var(--primary-hover))
  );
}
.gradient-success {
  background: linear-gradient(135deg, hsl(var(--success)), hsl(var(--chart-2)));
}
.gradient-warning {
  background: linear-gradient(135deg, hsl(var(--warning)), hsl(var(--chart-3)));
}
```

### Loading States

```css
.loading-skeleton {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

## 🔧 Component Usage Examples

### Enhanced Metric Card

```jsx
<MetricCard
  metric={{
    value: 12543,
    previousValue: 11234,
    change: 11.7,
    label: 'Total Revenue',
    prefix: '$',
    suffix: '',
    icon: DollarSignIcon,
  }}
  variant="gradient"
  className="hover:scale-105"
/>
```

### Animated Counter

```jsx
<AnimatedCounter from={0} to={12543} duration={2000} prefix="$" suffix="" />
```

### Staggered Animation Container

```jsx
<StaggerContainer delay={100}>
  {metrics.map((metric, index) => (
    <MetricCard key={index} metric={metric} />
  ))}
</StaggerContainer>
```

### Theme Toggle with Multiple Options

```jsx
<ThemeToggle />
// Automatically includes light, dark, and system options
```

## 🎨 Advanced Effects

### Hover Glow

```jsx
<HoverGlow>
  <Card>Content with glow effect on hover</Card>
</HoverGlow>
```

### Scale on Hover

```jsx
<HoverScale scale={1.02}>
  <Button>Slightly scales on hover</Button>
</HoverScale>
```

### Pulse Indicator

```jsx
<PulseDot color="success" size="md" />
```

### Progress Bar

```jsx
<AnimatedProgressBar
  value={75}
  max={100}
  color="success"
  size="md"
  showLabel={true}
/>
```

## 📱 Responsive Design

### Breakpoints

```javascript
breakpoints: {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

### Container Fluid

```jsx
<div className="container-fluid">{/* Responsive padding and max-width */}</div>
```

## ♿ Accessibility Features

### Focus Management

- Visible focus indicators with `focus-visible`
- Skip links for keyboard navigation
- Proper tab order and focus trapping

### Screen Reader Support

- Semantic HTML structure
- ARIA labels and descriptions
- Live regions for dynamic content

### Color Contrast

- Minimum 4.5:1 contrast ratio
- High contrast mode support
- Color-blind friendly palette

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🚀 Performance Optimizations

### Component Memoization

```jsx
const MemoizedComponent = memo(Component);
```

### Lazy Loading

```jsx
const LazyComponent = lazy(() => import('./Component'));
```

### Optimized Animations

- Uses `transform` and `opacity` for GPU acceleration
- `will-change` property for animation preparation
- Minimal layout thrashing

## 🎭 Dark Mode Implementation

### Automatic System Detection

```jsx
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange={false}
>
```

### Theme-Aware Components

```jsx
// Components automatically adapt to theme changes
<Card className="bg-card text-card-foreground">
  Content adapts to current theme
</Card>
```

### Enhanced Color Tokens

- OKLCH color space for better perceptual uniformity
- Automatic contrast adjustments
- Smooth transitions between themes

## 📦 Component Library

All components are built with:

- TypeScript support
- Accessibility compliance
- Customizable props
- Consistent API patterns
- Performance optimizations

## 🛠️ Usage Guidelines

1. **Use design tokens** instead of hardcoded values
2. **Follow the spacing scale** for consistent rhythm
3. **Implement proper focus management** for accessibility
4. **Test with reduced motion** preferences
5. **Validate color contrast** ratios
6. **Use semantic HTML** elements
7. **Optimize animations** for performance

## 📚 Resources

- [Design Tokens Reference](./src/lib/design-tokens.js)
- [Animation Components](./src/components/ui/animations.jsx)
- [CSS Variables](./src/app/globals.css)
- [Component Examples](./src/app/page.js)
