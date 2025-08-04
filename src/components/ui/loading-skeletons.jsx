'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MetricCardSkeleton({ delay = 0 }) {
  return (
    <Card
      variant="elevated"
      className="animate-pulse"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-lg animate-shimmer" />
          <Skeleton className="h-4 w-24 animate-shimmer" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full animate-shimmer" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-9 w-28 animate-shimmer" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded animate-shimmer" />
          <Skeleton className="h-3 w-32 animate-shimmer" />
        </div>
        <Skeleton className="h-1 w-full rounded-full animate-shimmer" />
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton({ height = 350, delay = 0 }) {
  return (
    <Card
      variant="elevated"
      className="animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <Skeleton className="h-6 w-48 animate-shimmer" />
        <Skeleton className="h-4 w-64 animate-shimmer" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton
          className={`w-full h-[${height}px] animate-shimmer rounded-lg`}
        />
        {/* Legend skeleton */}
        <div className="flex gap-4 justify-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton
                className="h-3 w-3 rounded-full animate-shimmer"
                style={{ animationDelay: `${i * 100}ms` }}
              />
              <Skeleton
                className="h-3 w-16 animate-shimmer"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Table Header */}
          <div className="flex items-center space-x-4 pb-2 border-b">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-1">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RealTimeWidgetSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-40 mt-2" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
