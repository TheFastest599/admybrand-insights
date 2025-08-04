'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const PageTransitionContext = createContext();

export function PageTransitionProvider({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning }}>
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error(
      'usePageTransition must be used within PageTransitionProvider'
    );
  }
  return context;
};

// Animation components for staggered entries
export function StaggerContainer({ children, className = '', delay = 100 }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * delay}ms` }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

// Fade in on scroll hook and component
export function useFadeInOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef);
    return () => observer.disconnect();
  }, [elementRef]);

  return [setElementRef, isVisible];
}

export function FadeInOnScroll({ children, className = '', threshold = 0.1 }) {
  const [ref, isVisible] = useFadeInOnScroll();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}

// Loading state wrapper
export function LoadingWrapper({
  isLoading,
  skeleton,
  children,
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      {isLoading ? (
        <div className="animate-fade-in">{skeleton}</div>
      ) : (
        <div className="animate-fade-in">{children}</div>
      )}
    </div>
  );
}

// Micro-interaction components
export function HoverScale({ children, scale = 1.02, className = '' }) {
  return (
    <div
      className={`transition-transform duration-200 hover:scale-[${scale}] ${className}`}
    >
      {children}
    </div>
  );
}

export function HoverGlow({ children, className = '' }) {
  return (
    <div
      className={`relative transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 ${className}`}
    >
      {children}
    </div>
  );
}

export function PulseDot({ color = 'primary', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    info: 'bg-info',
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-pulse`}
      />
      <div
        className={`absolute inset-0 ${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-ping opacity-75`}
      />
    </div>
  );
}

// Animated counter component
export function AnimatedCounter({
  from = 0,
  to,
  duration = 2000,
  prefix = '',
  suffix = '',
}) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(from + (to - from) * easeOutCubic);

      setCount(currentCount);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(to);
      }
    }, 16); // 60fps

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Progress bar component
export function AnimatedProgressBar({
  value,
  max = 100,
  className = '',
  showLabel = false,
  color = 'primary',
  size = 'md',
}) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-destructive',
    info: 'bg-info',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
      <div
        className={`w-full bg-muted rounded-full overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
