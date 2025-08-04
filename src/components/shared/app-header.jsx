'use client';

import { memo } from 'react';
import { NavigationLogo } from './navigation-logo';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';
import { HeaderActions } from './header-actions';

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      {/* Gradient border for visual interest */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-fluid flex h-16 items-center justify-between">
        {/* Left: Logo with fade-in animation */}
        <div className="animate-fade-in">
          <NavigationLogo />
        </div>

        {/* Center: Desktop Navigation with slide-in animation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 animate-slide-in-bottom">
          <DesktopNavigation />
        </div>

        {/* Right: Actions and Mobile Menu with staggered animations */}
        <div
          className="flex items-center gap-3 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <HeaderActions />
          <MobileNavigation />
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
    </header>
  );
}

// Memoize the header component for performance
const MemoizedAppHeader = memo(AppHeader);

export { MemoizedAppHeader as AppHeader };
