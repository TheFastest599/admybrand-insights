'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/shared/app-header';
import { MetricCard } from '@/components/dashboard/metric-card';
import {
  MetricCardSkeleton,
  ChartSkeleton,
  TableSkeleton,
  RealTimeWidgetSkeleton,
} from '@/components/ui/loading-skeletons';
import {
  keyMetrics,
  revenueData,
  channelData,
  trafficSources,
  campaignData,
} from '@/lib/mock-data';

// Lazy load components for performance
const RevenueChart = lazy(() =>
  import('@/components/dashboard/charts').then(module => ({
    default: module.RevenueChart,
  }))
);

const ChannelChart = lazy(() =>
  import('@/components/dashboard/charts').then(module => ({
    default: module.ChannelChart,
  }))
);

const TrafficSourceChart = lazy(() =>
  import('@/components/dashboard/charts').then(module => ({
    default: module.TrafficSourceChart,
  }))
);

const CampaignTable = lazy(() =>
  import('@/components/dashboard/data-table').then(module => ({
    default: module.CampaignTable,
  }))
);

const RealTimeWidget = lazy(() =>
  import('@/components/dashboard/realtime-widget').then(module => ({
    default: module.RealTimeWidget,
  }))
);

// Device analytics data
const deviceData = [
  {
    device: 'Desktop',
    sessions: '342.5K',
    percentage: 58.4,
    revenue: '$1.68M',
    icon: '💻',
    color: 'from-blue-500 to-purple-600',
  },
  {
    device: 'Mobile',
    sessions: '198.3K',
    percentage: 33.8,
    revenue: '$890K',
    icon: '📱',
    color: 'from-green-500 to-blue-500',
  },
  {
    device: 'Tablet',
    sessions: '45.7K',
    percentage: 7.8,
    revenue: '$278K',
    icon: '📟',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto p-6" role="main">
        <DashboardHeader />
        <DashboardGrid />
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto p-6" role="main">
        <HeaderSkeleton />
        <GridSkeleton />
      </main>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <header className="mb-6 space-y-2">
      <div className="h-8 w-64 bg-muted animate-pulse rounded" />
      <div className="h-4 w-96 bg-muted animate-pulse rounded" />
    </header>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-min">
      <div className="col-span-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} />
          ))}
        </div>
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-3">
        <ChartSkeleton />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-3">
        <ChartSkeleton height={300} />
      </div>
      <div className="col-span-full md:col-span-2 lg:col-span-2">
        <RealTimeWidgetSkeleton />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-2">
        <ChartSkeleton height={300} />
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-2">
        <ChartSkeleton height={300} />
      </div>
      <div className="col-span-full">
        <TableSkeleton />
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="mb-6 space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      <p className="text-muted-foreground">
        Welcome back! Here's what's happening with your marketing campaigns
        today.
      </p>
    </header>
  );
}

function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-min">
      <MetricsSection />
      <ChartsSection />
      <AnalyticsSection />
      <CampaignSection />
      <FooterSection />
    </div>
  );
}

function MetricsSection() {
  return (
    <div className="col-span-full">
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Key Performance Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(keyMetrics).map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              className="hover:scale-105 transition-transform duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function ChartsSection() {
  return (
    <>
      <div className="col-span-full md:col-span-2  xl:col-span-3">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart data={revenueData} />
        </Suspense>
      </div>
      <div className="col-span-full md:col-span-2  xl:col-span-3">
        <Suspense fallback={<ChartSkeleton height={300} />}>
          <ChannelChart data={channelData} />
        </Suspense>
      </div>
      <div className="col-span-full md:col-span-2 lg:col-span-2">
        <Suspense fallback={<RealTimeWidgetSkeleton />}>
          <RealTimeWidget />
        </Suspense>
      </div>
    </>
  );
}

function AnalyticsSection() {
  return (
    <>
      <div className="col-span-full md:col-span-1 lg:col-span-2">
        <Suspense fallback={<ChartSkeleton height={300} />}>
          <TrafficSourceChart data={trafficSources} />
        </Suspense>
      </div>
      <div className="col-span-full md:col-span-1 lg:col-span-2">
        <DeviceAnalytics />
      </div>
    </>
  );
}

function DeviceAnalytics() {
  return (
    <article className="bg-card border rounded-lg p-6 h-full">
      <h3 className="text-lg font-semibold mb-4">Device Analytics</h3>
      <div
        className="space-y-3"
        role="list"
        aria-label="Device performance breakdown"
      >
        {deviceData.map(item => (
          <DeviceItem key={item.device} item={item} />
        ))}
      </div>
    </article>
  );
}

function DeviceItem({ item }) {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
      role="listitem"
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white font-semibold text-lg`}
        >
          <span role="img" aria-label={`${item.device} icon`}>
            {item.icon}
          </span>
        </div>
        <div>
          <p className="font-medium">{item.device}</p>
          <p className="text-sm text-muted-foreground">
            {item.sessions} sessions
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold" aria-label={`Revenue: ${item.revenue}`}>
          {item.revenue}
        </p>
        <p
          className="text-sm text-muted-foreground"
          aria-label={`Percentage: ${item.percentage}%`}
        >
          {item.percentage}%
        </p>
      </div>
    </div>
  );
}

function CampaignSection() {
  return (
    <div className="col-span-full">
      <section aria-labelledby="campaigns-heading">
        <h2 id="campaigns-heading" className="sr-only">
          Campaign Performance Data Table
        </h2>
        <Suspense fallback={<TableSkeleton />}>
          <CampaignTable data={campaignData} />
        </Suspense>
      </section>
    </div>
  );
}

function FooterSection() {
  return (
    <footer className="col-span-full text-center py-8 text-sm text-muted-foreground border-t">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={20}
          height={20}
          className="dark:invert"
          priority
        />
        <span>+</span>
        <div className="flex items-center justify-center w-5 h-5 rounded bg-gradient-to-r from-blue-600 to-violet-600">
          <span className="text-white text-xs font-bold">S</span>
        </div>
      </div>
      <p>
        © 2024 ADmyBRAND Insights. Built with{' '}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors underline"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://ui.shadcn.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors underline"
        >
          shadcn/ui
        </a>
      </p>
    </footer>
  );
}
