'use client';

import { memo } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Calendar,
  Download,
} from 'lucide-react';

function NotificationsDropdown() {
  const notifications = [
    {
      id: 1,
      title: 'Campaign performance alert',
      message: 'Summer Sale 2024 is underperforming by 15%',
      time: '5 min ago',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Budget threshold reached',
      message: 'Brand Awareness Q3 has spent 90% of budget',
      time: '2 hours ago',
      type: 'warning',
    },
    {
      id: 3,
      title: 'New conversion spike',
      message: 'Product Launch campaign shows 23% increase',
      time: '1 day ago',
      type: 'success',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative hover:bg-accent"
          aria-label={`Notifications, ${notifications.length} unread`}
        >
          <Bell className="h-4 w-4" aria-hidden="true" />
          {notifications.length > 0 && (
            <span
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs text-white flex items-center justify-center"
              aria-label={`${notifications.length} unread notifications`}
            >
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <Badge variant="secondary" className="text-xs">
            {notifications.length} new
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map(notification => (
            <DropdownMenuItem
              key={notification.id}
              className="flex-col items-start p-4 cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {notification.message}
                  </p>
                </div>
                <div
                  className={`w-2 h-2 rounded-full ml-2 mt-1 ${
                    notification.type === 'warning'
                      ? 'bg-yellow-500'
                      : notification.type === 'success'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                  }`}
                />
              </div>
              <span className="text-xs text-muted-foreground mt-2">
                {notification.time}
              </span>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <span className="text-sm">View all notifications</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserDropdown() {
  const user = {
    name: 'Alex Davis',
    email: 'alex@admybrand.com',
    avatar: '/api/placeholder/32/32',
    initials: 'AD',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full hover:bg-accent"
          aria-label={`User menu for ${user.name}`}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user.avatar}
              alt={`${user.name} profile picture`}
            />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-violet-600 text-white">
              {user.initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" aria-hidden="true" />
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" aria-hidden="true" />
          Help & Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function QuickActions() {
  const handleExport = () => {
    // Create sample data for export
    const exportData = {
      exportDate: new Date().toISOString(),
      metrics: {
        revenue: 124567.89,
        users: 89234,
        conversions: 1543,
        growth: 12.5,
      },
      campaigns: [
        {
          name: 'Summer Sale 2024',
          revenue: 45000,
          status: 'Active',
        },
        {
          name: 'Brand Awareness Q3',
          revenue: 32000,
          status: 'Active',
        },
        {
          name: 'Product Launch',
          revenue: 28000,
          status: 'Completed',
        },
      ],
      timeRange: 'Last 30 days',
    };

    // Convert to CSV format
    const csvContent = [
      'Export Date,' + exportData.exportDate,
      'Time Range,' + exportData.timeRange,
      '',
      'Metrics',
      'Revenue,' + exportData.metrics.revenue,
      'Users,' + exportData.metrics.users,
      'Conversions,' + exportData.metrics.conversions,
      'Growth,' + exportData.metrics.growth + '%',
      '',
      'Campaigns',
      'Name,Revenue,Status',
      ...exportData.campaigns.map(c => `${c.name},${c.revenue},${c.status}`),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admybrand-insights-${
      new Date().toISOString().split('T')[0]
    }.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="hidden lg:flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="hover:bg-accent"
        aria-label="Export dashboard data"
        onClick={handleExport}
      >
        <Download className="mr-2 h-4 w-4" aria-hidden="true" />
        Export
      </Button>
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Quick Actions - Hidden on smaller screens */}
      <div className="hidden lg:flex items-center gap-2">
        <QuickActions />
      </div>

      {/* Notifications */}
      <NotificationsDropdown />

      {/* Theme Toggle */}
      <div className="hidden sm:block">
        <ThemeToggle />
      </div>

      {/* User Menu */}
      <UserDropdown />
    </div>
  );
}

// Memoize the component for performance
const MemoizedHeaderActions = memo(HeaderActions);

export { MemoizedHeaderActions as HeaderActions };
