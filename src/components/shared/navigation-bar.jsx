'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Menu,
  X,
  Home,
  TrendingUp,
  FileText,
  Target,
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

function NavigationLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 shadow-lg group-hover:shadow-xl transition-all duration-200">
        <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
          ADmyBRAND
        </h1>
        <p className="text-xs text-muted-foreground -mt-1">Insights</p>
      </div>
      <Badge
        variant="outline"
        className="hidden lg:flex text-xs px-2 py-1"
        aria-label="Version 2.1.0"
      >
        v2.1.0
      </Badge>
    </Link>
  );
}

function DesktopNavigation({ pathname, navigationItems }) {
  const isActive = path => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className="hidden md:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2"
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map(item => {
        const active = isActive(item.href);
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={active ? 'default' : 'ghost'}
              size="sm"
              className={cn(
                'text-sm font-medium gap-2 transition-all duration-200',
                active
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
              title={item.description}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

function MobileNavigation({ pathname, navigationItems, isOpen, setIsOpen }) {
  const isActive = path => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-background border-l shadow-xl z-50 md:hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold">ADmyBRAND</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-4 space-y-2">
              {navigationItems.map(item => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
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
                        <div className="text-xs opacity-70">
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

function NavigationBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Logo */}
      <NavigationLogo />

      {/* Desktop Navigation */}
      <DesktopNavigation
        pathname={pathname}
        navigationItems={navigationItems}
      />

      {/* Mobile Navigation */}
      <MobileNavigation
        pathname={pathname}
        navigationItems={navigationItems}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />
    </>
  );
}

// Memoize the navigation component for performance
const MemoizedNavigationBar = memo(NavigationBar);

export { MemoizedNavigationBar as NavigationBar };
