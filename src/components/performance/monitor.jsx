'use client';

import React, { useEffect, useState } from 'react';

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
  });

  useEffect(() => {
    // Measure initial load time
    if (typeof window !== 'undefined' && window.performance) {
      const navigationStart = performance.timing.navigationStart;
      const loadComplete = performance.timing.loadEventEnd;
      const loadTime = loadComplete - navigationStart;

      setMetrics(prev => ({
        ...prev,
        loadTime: loadTime,
      }));

      // Measure memory usage if available
      if ('memory' in performance) {
        const memoryInfo = performance.memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memoryInfo.usedJSHeapSize / 1024 / 1024, // Convert to MB
        }));
      }

      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver(entryList => {
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        new PerformanceObserver(entryList => {
          let clsValue = 0;
          const entries = entryList.getEntries();
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
      }
    }
  }, []);

  return metrics;
}

// Component for monitoring render performance
export function PerformanceMonitor({ children }) {
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    const measureRender = () => {
      const endTime = performance.now();
      setRenderTime(endTime - startTime);
    };

    // Measure after the component has rendered
    const timeoutId = setTimeout(measureRender, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  // Only show performance info in development
  const showPerfInfo = process.env.NODE_ENV === 'development';

  return (
    <>
      {children}
      {showPerfInfo && (
        <div className="fixed bottom-4 right-4 bg-black text-white text-xs p-2 rounded z-50 opacity-75">
          Render: {renderTime.toFixed(2)}ms
        </div>
      )}
    </>
  );
}

// Error boundary for better error handling
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error:', error, errorInfo);

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: sendErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-destructive">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We're sorry, but something unexpected happened. Please refresh the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
