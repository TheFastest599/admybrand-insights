'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, TrendingUp, FileText, Target } from 'lucide-react';
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

function DesktopNavigation() {
  const pathname = usePathname();

  const isActive = path => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className="hidden md:flex items-center gap-2"
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
                'text-sm font-medium gap-2 transition-all duration-200 h-9 px-4',
                active
                  ? 'bg-primary text-primary-foreground shadow-sm'
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

// Memoize the navigation component for performance
const MemoizedDesktopNavigation = memo(DesktopNavigation);

export { MemoizedDesktopNavigation as DesktopNavigation };
