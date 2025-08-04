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
  StaggerContainer,
  FadeInOnScroll,
  LoadingWrapper,
  AnimatedCounter,
  HoverScale,
} from '@/components/ui/animations';
import {
  keyMetrics,
  revenueData,
  channelData,
  trafficSources,
  campaignData,
} from '@/lib/mock-data';
import {
  TrendingUpIcon,
  UsersIcon,
  ShoppingCartIcon,
  DollarSignIcon,
  BarChart3Icon,
  PieChartIcon,
  ActivityIcon,
} from 'lucide-react';

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

// Enhanced device analytics data with icons
const deviceData = [
  {
    device: 'Desktop',
    sessions: '342.5K',
    percentage: 58.4,
    revenue: '$1.68M',
    icon: BarChart3Icon,
    color: 'from-blue-500 to-purple-600',
  },
  {
    device: 'Mobile',
    sessions: '198.3K',
    percentage: 33.8,
    revenue: '$890K',
    icon: ActivityIcon,
    color: 'from-green-500 to-blue-500',
  },
  {
    device: 'Tablet',
    sessions: '45.7K',
    percentage: 7.8,
    revenue: '$278K',
    icon: PieChartIcon,
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
      <main className="container-fluid py-4 sm:py-6 md:py-8" role="main">
        <FadeInOnScroll>
          <DashboardHeader />
        </FadeInOnScroll>
        <FadeInOnScroll>
          <DashboardGrid />
        </FadeInOnScroll>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container-fluid py-4 sm:py-6 md:py-8" role="main">
        <HeaderSkeleton />
        <GridSkeleton />
      </main>
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <header className="mb-6 md:mb-8 space-y-3 animate-fade-in">
      <div className="h-8 sm:h-10 w-64 sm:w-80 bg-muted animate-shimmer rounded-lg" />
      <div className="h-4 sm:h-5 w-full max-w-lg bg-muted animate-shimmer rounded-lg" />
    </header>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 auto-rows-min">
      <div className="col-span-full">
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
          delay={150}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <MetricCardSkeleton key={i} delay={i * 100} />
          ))}
        </StaggerContainer>
      </div>
      <div className="col-span-full lg:col-span-2 xl:col-span-3">
        <ChartSkeleton delay={400} />
      </div>
      <div className="col-span-full lg:col-span-2 xl:col-span-3">
        <ChartSkeleton height={300} delay={500} />
      </div>
      <div className="col-span-full lg:col-span-2">
        <RealTimeWidgetSkeleton />
      </div>
      <div className="col-span-full lg:col-span-2">
        <ChartSkeleton height={300} delay={600} />
      </div>
      <div className="col-span-full lg:col-span-2">
        <ChartSkeleton height={300} delay={700} />
      </div>
      <div className="col-span-full">
        <TableSkeleton />
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <header className="mb-6 md:mb-8 space-y-3 md:space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
          <BarChart3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div> */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-display-md font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
            Welcome back! Here&apos;s what&apos;s happening with your marketing
            campaigns today.
          </p>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span>Live data</span>
        </div>
        <span className="hidden xs:inline">•</span>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </header>
  );
}

function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 auto-rows-min">
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
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
          delay={100}
        >
          {keyMetrics.map((metric, index) => (
            <HoverScale key={index} scale={1.02}>
              <MetricCard
                metric={metric}
                variant={index === 0 ? 'gradient' : 'interactive'}
                className="focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              />
            </HoverScale>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}

function ChartsSection() {
  return (
    <>
      <div className="col-span-full lg:col-span-2 xl:col-span-3">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart data={revenueData} />
        </Suspense>
      </div>
      <div className="col-span-full lg:col-span-2 xl:col-span-3">
        <Suspense fallback={<ChartSkeleton height={300} />}>
          <ChannelChart data={channelData} />
        </Suspense>
      </div>
      <div className="col-span-full lg:col-span-2">
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
      <div className="col-span-full lg:col-span-2">
        <Suspense fallback={<ChartSkeleton height={300} />}>
          <TrafficSourceChart data={trafficSources} />
        </Suspense>
      </div>
      <div className="col-span-full lg:col-span-2">
        <DeviceAnalytics />
      </div>
    </>
  );
}

function DeviceAnalytics() {
  return (
    <article className="bg-card border rounded-xl p-4 sm:p-6 h-full shadow-md hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <ActivityIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-300">
          Device Analytics
        </h3>
      </div>
      <div
        className="space-y-3 sm:space-y-4"
        role="list"
        aria-label="Device performance breakdown"
      >
        {deviceData.map((item, index) => (
          <div
            key={item.device}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DeviceItem item={item} />
          </div>
        ))}
      </div>
    </article>
  );
}

function DeviceItem({ item }) {
  const Icon = item.icon;

  return (
    <div
      className="flex items-center justify-between p-3 sm:p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group/item hover:shadow-sm"
      role="listitem"
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 group-hover/item:bg-primary/20 transition-all duration-300 group-hover/item:scale-110 flex-shrink-0">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium group-hover/item:text-primary transition-colors duration-300 text-sm sm:text-base truncate">
            {item.device}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            <AnimatedCounter
              to={parseInt(item.sessions.replace(/[^\d]/g, ''))}
              suffix="K"
              duration={1500}
            />{' '}
            sessions
          </p>
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-primary text-sm sm:text-base">
          {item.revenue}
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
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
    <footer className="col-span-full text-center py-6 sm:py-8 text-xs sm:text-sm text-muted-foreground border-t">
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
      <p className="leading-relaxed">
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
