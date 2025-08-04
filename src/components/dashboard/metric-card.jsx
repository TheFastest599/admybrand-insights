'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

function MetricCard({ metric, className }) {
  const { value, previousValue, change, label, prefix, suffix } = metric;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const changeValue = value - previousValue;

  const formatValue = val => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  const getAriaLabel = () => {
    const direction = isPositive
      ? 'increased'
      : isNegative
      ? 'decreased'
      : 'remained unchanged';
    return `${label}: ${prefix}${formatValue(
      value
    )}${suffix}, ${direction} by ${Math.abs(change).toFixed(
      1
    )}% from last period`;
  };

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
      role="article"
      aria-label={getAriaLabel()}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Badge
          variant={
            isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'
          }
          className="flex items-center gap-1"
          aria-label={`Change: ${
            isPositive ? 'up' : isNegative ? 'down' : 'no change'
          } ${Math.abs(change).toFixed(1)} percent`}
        >
          {isPositive && <ArrowUpIcon className="h-3 w-3" aria-hidden="true" />}
          {isNegative && (
            <ArrowDownIcon className="h-3 w-3" aria-hidden="true" />
          )}
          {Math.abs(change).toFixed(1)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div
          className="text-2xl font-bold"
          aria-label={`Current value: ${prefix}${formatValue(value)}${suffix}`}
        >
          <span aria-hidden="true">{prefix}</span>
          <span>{formatValue(value)}</span>
          <span aria-hidden="true">{suffix}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <span
            className={cn(
              'font-medium',
              isPositive && 'text-green-600 dark:text-green-400',
              isNegative && 'text-red-600 dark:text-red-400'
            )}
          >
            {isPositive && '+'}
            {changeValue.toLocaleString()}
          </span>{' '}
          from last period
        </p>
      </CardContent>
    </Card>
  );
}

// Memoize the component to prevent unnecessary re-renders
const MemoizedMetricCard = memo(MetricCard);

export { MemoizedMetricCard as MetricCard };
