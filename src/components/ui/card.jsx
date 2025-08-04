import * as React from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'bg-card text-card-foreground flex flex-col gap-4 sm:gap-6 rounded-xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'shadow-sm hover:shadow-md',
        elevated: 'shadow-lg hover:shadow-xl hover:-translate-y-1',
        interactive:
          'shadow-md hover:shadow-xl hover:-translate-y-2 cursor-pointer interactive',
        gradient:
          'bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl',
        glass: 'glass shadow-lg hover:shadow-xl backdrop-blur-md',
        outline: 'border-2 hover:border-primary/50 shadow-sm hover:shadow-md',
      },
      size: {
        default: 'py-4 sm:py-6',
        sm: 'py-3 sm:py-4',
        lg: 'py-6 sm:py-8',
        xl: 'py-8 sm:py-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Card({ className, variant, size, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
