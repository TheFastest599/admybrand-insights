'use client';

import { memo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = [
  '#0ea5e9',
  '#8b5cf6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#6b7280',
];

// Custom tooltip component for better accessibility
const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
  contentStyle,
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-card border border-border rounded-lg shadow-md p-3"
        style={contentStyle}
        role="tooltip"
        aria-live="polite"
      >
        {labelFormatter && (
          <p className="font-medium mb-2">{labelFormatter(label)}</p>
        )}
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            {formatter
              ? formatter(entry.value, entry.dataKey)
              : `${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function RevenueChart({ data }) {
  const formatCurrency = value => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue & Performance Trends</CardTitle>
        <CardDescription>
          Monthly revenue, users, and conversions over the past year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Line chart showing revenue and performance trends over 12 months"
        >
          <ResponsiveContainer width="100%" height={350}>
            <LineChart
              data={data}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              aria-label="Revenue and performance trends"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-xs fill-muted-foreground"
                aria-label="Month"
              />
              <YAxis
                yAxisId="left"
                tickFormatter={formatCurrency}
                className="text-xs fill-muted-foreground"
                aria-label="Revenue in millions"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                className="text-xs fill-muted-foreground"
                aria-label="Users and conversions"
              />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(value, name) => {
                      if (name === 'revenue')
                        return [formatCurrency(value), 'Revenue'];
                      if (name === 'users')
                        return [value.toLocaleString(), 'Users'];
                      return [value.toLocaleString(), 'Conversions'];
                    }}
                    labelFormatter={label => `Month: ${label}`}
                  />
                }
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Revenue"
                aria-label="Revenue trend line"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="users"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Users"
                aria-label="Users trend line"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversions"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Conversions"
                aria-label="Conversions trend line"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ChannelChart({ data }) {
  const formatCurrency = value => {
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Performance</CardTitle>
        <CardDescription>Revenue and ROI by marketing channel</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Bar chart showing channel performance by revenue and cost"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 0, left: 0, bottom: 10 }}
              aria-label="Channel performance comparison"
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="channel"
                className="text-xs fill-muted-foreground"
                angle={-45}
                textAnchor="end"
                height={60}
                aria-label="Marketing channel"
              />
              <YAxis
                tickFormatter={formatCurrency}
                className="text-xs fill-muted-foreground"
                aria-label="Amount in thousands"
              />
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={(value, name) => {
                      if (name === 'revenue')
                        return [formatCurrency(value), 'Revenue'];
                      if (name === 'cost')
                        return [formatCurrency(value), 'Cost'];
                      return [`${value}%`, 'ROI'];
                    }}
                  />
                }
              />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#0ea5e9"
                name="Revenue"
                radius={[4, 4, 0, 0]}
                aria-label="Revenue by channel"
              />
              <Bar
                dataKey="cost"
                fill="#ef4444"
                name="Cost"
                radius={[4, 4, 0, 0]}
                aria-label="Cost by channel"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function TrafficSourceChart({ data }) {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>
          Breakdown of website traffic by source
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Pie chart showing traffic source distribution"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart aria-label="Traffic sources breakdown">
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                aria-label="Traffic source percentages"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    aria-label={`${entry.name}: ${entry.value}%`}
                  />
                ))}
              </Pie>
              <Tooltip
                content={
                  <CustomTooltip
                    formatter={value => [`${value}%`, 'Percentage']}
                  />
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Memoize all chart components for better performance
const MemoizedRevenueChart = memo(RevenueChart);
const MemoizedChannelChart = memo(ChannelChart);
const MemoizedTrafficSourceChart = memo(TrafficSourceChart);

// Export with original names for compatibility
export { MemoizedRevenueChart as RevenueChart };
export { MemoizedChannelChart as ChannelChart };
export { MemoizedTrafficSourceChart as TrafficSourceChart };

// Default exports for each component
export default RevenueChart;
