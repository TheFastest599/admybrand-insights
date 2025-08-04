'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

function NavigationLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
        <BarChart3
          className="h-6 w-6 text-primary-foreground transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        />

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary/80 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md" />
      </div>

      <div className="hidden sm:block">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary transition-all duration-300">
          ADmyBRAND
        </h1>
        <p className="text-xs text-muted-foreground -mt-1 group-hover:text-foreground/70 transition-colors duration-300">
          Insights
        </p>
      </div>

      <Badge
        variant="outline"
        className="hidden lg:flex text-xs px-2 py-1 border-primary/20 text-primary hover:bg-primary/10 transition-colors duration-300"
        aria-label="Version 2.1.0"
      >
        v2.1.0
      </Badge>
    </Link>
  );
}

// Memoize the logo component for performance
const MemoizedNavigationLogo = memo(NavigationLogo);

export { MemoizedNavigationLogo as NavigationLogo };
