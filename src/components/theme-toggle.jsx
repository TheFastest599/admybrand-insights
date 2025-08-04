'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="animate-pulse">
        <div className="h-[1.2rem] w-[1.2rem] rounded-full bg-muted" />
      </Button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 group-hover:text-yellow-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 group-hover:text-blue-400" />
          <span className="sr-only">Toggle theme</span>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 rounded-md bg-gradient-to-r from-yellow-400/20 via-blue-500/20 to-purple-600/20 blur-sm dark:from-blue-400/20 dark:via-purple-500/20 dark:to-pink-600/20" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 animate-scale-in">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className="cursor-pointer transition-colors duration-200 hover:bg-yellow-50 dark:hover:bg-yellow-950"
        >
          <Sun className="mr-2 h-4 w-4 text-yellow-500" />
          <span>Light</span>
          {currentTheme === 'light' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-yellow-500" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className="cursor-pointer transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-950"
        >
          <Moon className="mr-2 h-4 w-4 text-blue-500" />
          <span>Dark</span>
          {currentTheme === 'dark' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-blue-500" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className="cursor-pointer transition-colors duration-200 hover:bg-purple-50 dark:hover:bg-purple-950"
        >
          <Monitor className="mr-2 h-4 w-4 text-purple-500" />
          <span>System</span>
          {theme === 'system' && (
            <div className="ml-auto h-2 w-2 rounded-full bg-purple-500" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
