'use client';

import { Suspense } from 'react';
import { AppHeader } from '@/components/shared/app-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  BarChart3,
  LineChart,
  PieChart,
  Download,
} from 'lucide-react';
import {
  LineChart as RechartsLine,
  AreaChart,
  BarChart as RechartsBar,
  PieChart as RechartsPie,
  Cell,
  Pie,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Analytics data
const trafficData = [
  { month: 'Jan', organic: 4000, paid: 2400, social: 1600, direct: 800 },
  { month: 'Feb', organic: 3000, paid: 1398, social: 2200, direct: 900 },
  { month: 'Mar', organic: 2000, paid: 9800, social: 2900, direct: 1200 },
  { month: 'Apr', organic: 2780, paid: 3908, social: 2000, direct: 1100 },
  { month: 'May', organic: 1890, paid: 4800, social: 2181, direct: 1300 },
  { month: 'Jun', organic: 2390, paid: 3800, social: 2500, direct: 1400 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: '#0ea5e9' },
  { name: 'Mobile', value: 35, color: '#8b5cf6' },
  { name: 'Tablet', value: 20, color: '#10b981' },
];

const conversionFunnelData = [
  { stage: 'Visitors', count: 10000, percentage: 100 },
  { stage: 'Page Views', count: 8500, percentage: 85 },
  { stage: 'Add to Cart', count: 3200, percentage: 32 },
  { stage: 'Checkout', count: 1800, percentage: 18 },
  { stage: 'Purchase', count: 1200, percentage: 12 },
];

const timeSpentData = [
  { page: 'Homepage', avgTime: '2:45', bounceRate: 45 },
  { page: 'Product Pages', avgTime: '4:20', bounceRate: 32 },
  { page: 'Blog', avgTime: '6:15', bounceRate: 28 },
  { page: 'About', avgTime: '1:30', bounceRate: 65 },
  { page: 'Contact', avgTime: '3:10', bounceRate: 55 },
];

function MetricCard({ title, value, change, icon: Icon, positive }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1">
          {positive ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span
            className={`text-xs ${
              positive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {change} from last month
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TrafficSourcesChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Traffic Sources Over Time</CardTitle>
        <CardDescription>Monthly traffic breakdown by source</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="organic"
              stackId="1"
              stroke="#0ea5e9"
              fill="#0ea5e9"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="paid"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="social"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="direct"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

function DeviceBreakdown() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Breakdown</CardTitle>
        <CardDescription>Traffic by device type</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <RechartsPie>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPie>
        </ResponsiveContainer>
        <div className="flex justify-center space-x-4 mt-4">
          {deviceData.map(device => (
            <div key={device.name} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: device.color }}
              ></div>
              <span className="text-sm">
                {device.name}: {device.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ConversionFunnel() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Conversion Funnel</CardTitle>
        <CardDescription>User journey from visitor to purchase</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversionFunnelData.map((stage, index) => (
            <div key={stage.stage} className="flex items-center space-x-4">
              <div className="w-24 text-sm font-medium">{stage.stage}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium">
                    {stage.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
              </div>
              {index < conversionFunnelData.length - 1 && (
                <div className="text-sm text-red-500">
                  -
                  {(
                    ((conversionFunnelData[index].count -
                      conversionFunnelData[index + 1].count) /
                      conversionFunnelData[index].count) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PageAnalytics() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Page Performance</CardTitle>
        <CardDescription>Time spent and bounce rates by page</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeSpentData.map(page => (
            <div
              key={page.page}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <div className="font-medium">{page.page}</div>
                <div className="text-sm text-muted-foreground">
                  Avg. Time: {page.avgTime}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Bounce Rate</div>
                <div className="font-bold">{page.bounceRate}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and user behavior insights
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Last 30 days</Badge>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="conversions">Conversions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricCard
                title="Total Sessions"
                value="89,234"
                change="+12.5%"
                icon={Users}
                positive={true}
              />
              <MetricCard
                title="Page Views"
                value="234,567"
                change="+8.2%"
                icon={MousePointer}
                positive={true}
              />
              <MetricCard
                title="Avg. Session Duration"
                value="4:32"
                change="-2.1%"
                icon={Clock}
                positive={false}
              />
              <MetricCard
                title="Bounce Rate"
                value="42.1%"
                change="-5.3%"
                icon={TrendingDown}
                positive={true}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              <TrafficSourcesChart />
              <DeviceBreakdown />
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              <ConversionFunnel />
              <PageAnalytics />
            </div>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid gap-6">
              <TrafficSourcesChart />
              <div className="grid gap-6 lg:grid-cols-2">
                <DeviceBreakdown />
                <Card>
                  <CardHeader>
                    <CardTitle>Top Referrers</CardTitle>
                    <CardDescription>
                      Traffic sources bringing the most visitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { source: 'google.com', visits: 12500, percentage: 45 },
                        {
                          source: 'facebook.com',
                          visits: 8200,
                          percentage: 30,
                        },
                        {
                          source: 'instagram.com',
                          visits: 4100,
                          percentage: 15,
                        },
                        { source: 'twitter.com', visits: 2700, percentage: 10 },
                      ].map(referrer => (
                        <div
                          key={referrer.source}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">
                              {referrer.source}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">
                              {referrer.visits.toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {referrer.percentage}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <PageAnalytics />
              <Card>
                <CardHeader>
                  <CardTitle>User Flow</CardTitle>
                  <CardDescription>Most common user pathways</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { path: 'Homepage → Products → Checkout', users: 2400 },
                      { path: 'Blog → Homepage → Products', users: 1800 },
                      { path: 'Social → Homepage → About', users: 1200 },
                      { path: 'Search → Products → Cart', users: 900 },
                    ].map((flow, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="font-medium mb-1">{flow.path}</div>
                        <div className="text-sm text-muted-foreground">
                          {flow.users} users
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversions" className="space-y-6">
            <ConversionFunnel />
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Goal Completions</CardTitle>
                  <CardDescription>
                    Conversion goals performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        goal: 'Newsletter Signup',
                        completions: 1250,
                        rate: 14.2,
                      },
                      {
                        goal: 'Product Purchase',
                        completions: 890,
                        rate: 10.1,
                      },
                      {
                        goal: 'Download Resource',
                        completions: 670,
                        rate: 7.6,
                      },
                      { goal: 'Contact Form', completions: 450, rate: 5.1 },
                    ].map(goal => (
                      <div
                        key={goal.goal}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{goal.goal}</div>
                          <div className="text-sm text-muted-foreground">
                            {goal.completions} completions
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">
                            {goal.rate}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            conversion rate
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Attribution</CardTitle>
                  <CardDescription>Revenue by traffic source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        source: 'Organic Search',
                        revenue: 45600,
                        percentage: 42,
                      },
                      { source: 'Paid Ads', revenue: 32400, percentage: 30 },
                      {
                        source: 'Social Media',
                        revenue: 18900,
                        percentage: 17,
                      },
                      {
                        source: 'Direct Traffic',
                        revenue: 11700,
                        percentage: 11,
                      },
                    ].map(source => (
                      <div
                        key={source.source}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{source.source}</div>
                          <div className="text-sm text-muted-foreground">
                            {source.percentage}%
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">
                            ${source.revenue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
