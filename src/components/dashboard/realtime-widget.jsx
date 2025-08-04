'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Users, Clock, TrendingUp } from 'lucide-react';
import { generateRealtimeUpdate } from '@/lib/mock-data';

export function RealTimeWidget() {
  const [metrics, setMetrics] = useState({
    activeUsers: 12847,
    sessionsToday: 34520,
    bounceRate: 42.3,
    avgSessionDuration: '2m 34s',
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newData = generateRealtimeUpdate();
      setMetrics(newData);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatNumber = num => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Metrics
            </CardTitle>
            <CardDescription>Live website performance data</CardDescription>
          </div>
          <Badge
            variant={isLive ? 'default' : 'secondary'}
            className="flex items-center gap-1"
          >
            <div
              className={`h-2 w-2 rounded-full ${
                isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}
            />
            {isLive ? 'LIVE' : 'PAUSED'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active Users */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold">
                {formatNumber(metrics.activeUsers)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Right now</p>
          </div>
        </div>

        {/* Sessions Today */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium">Sessions Today</p>
              <p className="text-2xl font-bold">
                {formatNumber(metrics.sessionsToday)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">+12.3% vs yesterday</p>
          </div>
        </div>

        {/* Bounce Rate */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Bounce Rate</p>
            <span className="text-sm font-semibold">
              {metrics.bounceRate.toFixed(1)}%
            </span>
          </div>
          <Progress value={metrics.bounceRate} className="w-full h-2" />
          <p className="text-xs text-muted-foreground">Target: &lt;45%</p>
        </div>

        {/* Average Session Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
              <Clock className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium">Avg. Session Duration</p>
              <p className="text-xl font-bold">{metrics.avgSessionDuration}</p>
            </div>
          </div>
        </div>

        {/* Toggle Live Updates */}
        <div className="pt-4 border-t">
          <button
            onClick={() => setIsLive(!isLive)}
            className="w-full text-sm text-center text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLive ? 'Pause' : 'Resume'} live updates
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
