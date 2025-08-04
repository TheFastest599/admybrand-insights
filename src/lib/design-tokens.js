/**
 * Design Tokens for ADmyBRAND Insights
 * Centralized design system values for consistent UI
 */

export const designTokens = {
  // Spacing scale following 8px grid
  spacing: {
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    md: '1rem', // 16px
    lg: '1.5rem', // 24px
    xl: '2rem', // 32px
    '2xl': '3rem', // 48px
    '3xl': '4rem', // 64px
    '4xl': '6rem', // 96px
    '5xl': '8rem', // 128px
  },

  // Typography scale with optimal readability
  typography: {
    fontSizes: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem', // 72px
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeights: {
      tight: '1.1',
      snug: '1.25',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '0.125rem', // 2px
    default: '0.25rem', // 4px
    md: '0.375rem', // 6px
    lg: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    '2xl': '1rem', // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Shadow system for elevation
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Animation durations and easings
  animations: {
    durations: {
      fastest: '100ms',
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
      slowest: '1000ms',
    },
    easings: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      snappy: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  // Breakpoints for responsive design
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    modal: '1000',
    popover: '1010',
    overlay: '1020',
    tooltip: '1030',
    max: '2147483647',
  },

  // Common component sizes
  sizes: {
    button: {
      sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.75rem' },
      default: { height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem' },
      lg: { height: '3rem', padding: '0 1.5rem', fontSize: '1rem' },
      xl: { height: '3.5rem', padding: '0 2rem', fontSize: '1.125rem' },
    },
    input: {
      sm: { height: '2rem', padding: '0 0.75rem', fontSize: '0.75rem' },
      default: { height: '2.5rem', padding: '0 1rem', fontSize: '0.875rem' },
      lg: { height: '3rem', padding: '0 1.25rem', fontSize: '1rem' },
    },
    card: {
      sm: { padding: '1rem' },
      default: { padding: '1.5rem' },
      lg: { padding: '2rem' },
      xl: { padding: '2.5rem' },
    },
  },

  // Semantic color meanings (not the actual colors, just the semantics)
  semanticColors: {
    primary: 'Brand color for primary actions',
    secondary: 'Supporting brand color',
    success: 'Positive states, confirmations',
    warning: 'Cautionary states, alerts',
    danger: 'Error states, destructive actions',
    info: 'Informational states, tips',
    neutral: 'Neutral content, backgrounds',
  },

  // Component specific tokens
  components: {
    button: {
      borderRadius: 'md',
      fontWeight: 'medium',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    card: {
      borderRadius: 'xl',
      shadow: 'sm',
      borderWidth: '1px',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    input: {
      borderRadius: 'md',
      borderWidth: '1px',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    modal: {
      borderRadius: '2xl',
      shadow: 'xl',
      backdropBlur: '8px',
    },
  },
};

// Utility functions for working with design tokens
export const getSpacing = key => designTokens.spacing[key] || key;
export const getFontSize = key => designTokens.typography.fontSizes[key] || key;
export const getShadow = key => designTokens.shadows[key] || key;
export const getBorderRadius = key => designTokens.borderRadius[key] || key;

// CSS custom properties generator
export const generateCSSVariables = () => {
  const variables = {};

  // Add spacing variables
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    variables[`--spacing-${key}`] = value;
  });

  // Add typography variables
  Object.entries(designTokens.typography.fontSizes).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value;
  });

  // Add shadow variables
  Object.entries(designTokens.shadows).forEach(([key, value]) => {
    variables[`--shadow-${key}`] = value;
  });

  return variables;
};

export default designTokens;
