'use client';

import { memo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Home,
  TrendingUp,
  FileText,
  Target,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
    description: 'Overview and key metrics',
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: TrendingUp,
    description: 'Deep dive into data insights',
  },
  {
    name: 'Reports',
    href: '/reports',
    icon: FileText,
    description: 'Generate and manage reports',
  },
  {
    name: 'Campaigns',
    href: '/campaigns',
    icon: Target,
    description: 'Marketing campaign management',
  },
];

function MobileNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure client-side only rendering to prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isActive = path => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  // Don't render overlay until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    );
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          {/* Mobile Menu Panel */}
          <div
            id="mobile-navigation"
            className="fixed top-0 right-0 h-full w-72 bg-background border-l shadow-xl z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span id="mobile-nav-title" className="font-semibold">
                  ADmyBRAND
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMenu}
                className="h-8 w-8"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav
              className="p-4 space-y-2 bg-background"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navigationItems.map(item => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="block"
                  >
                    <div
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg transition-colors',
                        active
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs opacity-70 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
    </>
  );
}

// Memoize the navigation component for performance
const MemoizedMobileNavigation = memo(MobileNavigation);

export { MemoizedMobileNavigation as MobileNavigation };
