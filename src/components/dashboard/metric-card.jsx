'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { memo } from 'react';

function MetricCard({ metric, className, variant = 'default' }) {
  const { value, previousValue, change, label, prefix, suffix, icon } = metric;
  const isPositive = change > 0;
  const isNegative = change < 0;
  const changeValue = value - previousValue;

  // Properly handle the icon component
  const IconComponent = icon;

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

  const cardVariant = variant === 'interactive' ? 'interactive' : 'elevated';

  return (
    <Card
      variant={cardVariant}
      className={cn(
        'group transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 animate-fade-in',
        variant === 'gradient' &&
          'bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20',
        className
      )}
      role="article"
      aria-label={getAriaLabel()}
    >
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {IconComponent && (
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
          )}
          <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {label}
          </CardTitle>
        </div>
        <Badge
          variant={
            isPositive ? 'default' : isNegative ? 'destructive' : 'secondary'
          }
          className={cn(
            'flex items-center gap-1 transition-all duration-300 group-hover:scale-105 text-xs',
            isPositive &&
              'bg-success/10 text-success border-success/20 hover:bg-success/20',
            isNegative &&
              'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20'
          )}
          aria-label={`Change: ${
            isPositive ? 'up' : isNegative ? 'down' : 'no change'
          } ${Math.abs(change).toFixed(1)} percent`}
        >
          {isPositive && (
            <ArrowUpIcon
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
              aria-hidden="true"
            />
          )}
          {isNegative && (
            <ArrowDownIcon
              className="h-2.5 w-2.5 sm:h-3 sm:w-3"
              aria-hidden="true"
            />
          )}
          {Math.abs(change).toFixed(1)}%
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 group-hover:text-primary"
          aria-label={`Current value: ${prefix}${formatValue(value)}${suffix}`}
        >
          <span aria-hidden="true" className="text-muted-foreground/60">
            {prefix}
          </span>
          <span>{formatValue(value)}</span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            {suffix}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 text-xs">
          <TrendingUpIcon
            className={cn(
              'h-2.5 w-2.5 sm:h-3 sm:w-3 transition-colors duration-300',
              isPositive && 'text-success',
              isNegative && 'text-destructive rotate-180',
              !isPositive && !isNegative && 'text-muted-foreground'
            )}
          />
          <p className="text-muted-foreground">
            <span
              className={cn(
                'font-medium transition-colors duration-300',
                isPositive && 'text-success',
                isNegative && 'text-destructive'
              )}
            >
              {isPositive && '+'}
              {changeValue.toLocaleString()}
            </span>{' '}
            from last period
          </p>
        </div>

        {/* Progress bar for visual interest */}
        <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000 ease-out',
              isPositive && 'bg-gradient-to-r from-success to-success/80',
              isNegative &&
                'bg-gradient-to-r from-destructive to-destructive/80',
              !isPositive &&
                !isNegative &&
                'bg-gradient-to-r from-muted-foreground to-muted-foreground/80'
            )}
            style={{
              width: `${Math.min(Math.abs(change) * 2, 100)}%`,
              animationDelay: '0.5s',
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Memoize the component to prevent unnecessary re-renders
const MemoizedMetricCard = memo(MetricCard);

export { MemoizedMetricCard as MetricCard };
