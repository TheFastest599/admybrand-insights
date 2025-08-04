'use client';

import { memo } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

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

// Memoize the logo component for performance
const MemoizedNavigationLogo = memo(NavigationLogo);

export { MemoizedNavigationLogo as NavigationLogo };
