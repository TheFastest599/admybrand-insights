'use client';

import { memo } from 'react';
import { NavigationLogo } from './navigation-logo';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';
import { HeaderActions } from './header-actions';

function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Left: Logo */}
        <NavigationLogo />

        {/* Center: Desktop Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <DesktopNavigation />
        </div>

        {/* Right: Actions and Mobile Menu */}
        <div className="flex items-center gap-2">
          <HeaderActions />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

// Memoize the header component for performance
const MemoizedAppHeader = memo(AppHeader);

export { MemoizedAppHeader as AppHeader };
