// Mock data for ADmyBRAND Insights Dashboard
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react';

// Key Metrics Data
export const keyMetrics = [
  {
    value: 2847950,
    previousValue: 2234510,
    change: 27.4,
    label: 'Total Revenue',
    prefix: '$',
    suffix: '',
    icon: DollarSign,
  },
  {
    value: 847230,
    previousValue: 712450,
    change: 18.9,
    label: 'Active Users',
    prefix: '',
    suffix: '',
    icon: Users,
  },
  {
    value: 12547,
    previousValue: 9876,
    change: 27.1,
    label: 'Conversions',
    prefix: '',
    suffix: '',
    icon: Target,
  },
  {
    value: 34.2,
    previousValue: 28.7,
    change: 5.5,
    label: 'Growth Rate',
    prefix: '',
    suffix: '%',
    icon: TrendingUp,
  },
];

// Revenue Chart Data (Line Chart)
export const revenueData = [
  { month: 'Jan', revenue: 1840000, users: 65400, conversions: 8400 },
  { month: 'Feb', revenue: 1980000, users: 68200, conversions: 8900 },
  { month: 'Mar', revenue: 2100000, users: 71500, conversions: 9300 },
  { month: 'Apr', revenue: 2250000, users: 74800, conversions: 9800 },
  { month: 'May', revenue: 2380000, users: 76900, conversions: 10200 },
  { month: 'Jun', revenue: 2520000, users: 79300, conversions: 10800 },
  { month: 'Jul', revenue: 2650000, users: 81700, conversions: 11300 },
  { month: 'Aug', revenue: 2750000, users: 83200, conversions: 11700 },
  { month: 'Sep', revenue: 2840000, users: 84600, conversions: 12100 },
  { month: 'Oct', revenue: 2920000, users: 85900, conversions: 12400 },
  { month: 'Nov', revenue: 2980000, users: 86800, conversions: 12700 },
  { month: 'Dec', revenue: 3100000, users: 88200, conversions: 13000 },
];

// Channel Performance Data (Bar Chart)
export const channelData = [
  { channel: 'Paid Search', revenue: 1240000, cost: 186000, roi: 566 },
  { channel: 'Social Media', revenue: 980000, cost: 147000, roi: 567 },
  { channel: 'Email', revenue: 850000, cost: 42500, roi: 1900 },
  { channel: 'Display', revenue: 720000, cost: 144000, roi: 400 },
  { channel: 'Direct', revenue: 650000, cost: 0, roi: 0 },
  { channel: 'Organic', revenue: 580000, cost: 29000, roi: 1900 },
  { channel: 'Referral', revenue: 450000, cost: 22500, roi: 1900 },
];

// Traffic Sources Data (Pie Chart)
export const trafficSources = [
  { name: 'Organic Search', value: 35.2, color: '#0ea5e9' },
  { name: 'Paid Search', value: 28.1, color: '#8b5cf6' },
  { name: 'Social Media', value: 18.7, color: '#10b981' },
  { name: 'Direct', value: 12.4, color: '#f59e0b' },
  { name: 'Email', value: 3.9, color: '#ef4444' },
  { name: 'Referral', value: 1.7, color: '#6b7280' },
];

// Device Analytics Data
export const deviceData = [
  { device: 'Desktop', sessions: 342500, percentage: 58.4, revenue: 1680000 },
  { device: 'Mobile', sessions: 198300, percentage: 33.8, revenue: 890000 },
  { device: 'Tablet', sessions: 45700, percentage: 7.8, revenue: 278000 },
];

// Campaign Performance Data (Table)
export const campaignData = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    status: 'Active',
    budget: 50000,
    spent: 42350,
    impressions: 2450000,
    clicks: 98400,
    conversions: 2340,
    ctr: 4.02,
    cpc: 0.43,
    roas: 5.8,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
  },
  {
    id: 2,
    name: 'Brand Awareness Q3',
    status: 'Active',
    budget: 75000,
    spent: 68200,
    impressions: 5670000,
    clicks: 145600,
    conversions: 1890,
    ctr: 2.57,
    cpc: 0.47,
    roas: 4.2,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
  },
  {
    id: 3,
    name: 'Holiday Shopping',
    status: 'Scheduled',
    budget: 120000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpc: 0,
    roas: 0,
    startDate: '2024-11-15',
    endDate: '2024-12-31',
  },
  {
    id: 4,
    name: 'Product Launch',
    status: 'Active',
    budget: 30000,
    spent: 28750,
    impressions: 1230000,
    clicks: 67800,
    conversions: 1650,
    ctr: 5.51,
    cpc: 0.42,
    roas: 6.7,
    startDate: '2024-08-15',
    endDate: '2024-10-15',
  },
  {
    id: 5,
    name: 'Retargeting Campaign',
    status: 'Paused',
    budget: 25000,
    spent: 19340,
    impressions: 890000,
    clicks: 34500,
    conversions: 890,
    ctr: 3.88,
    cpc: 0.56,
    roas: 3.9,
    startDate: '2024-05-01',
    endDate: '2024-07-31',
  },
  {
    id: 6,
    name: 'Local Market Expansion',
    status: 'Active',
    budget: 45000,
    spent: 38900,
    impressions: 1780000,
    clicks: 89200,
    conversions: 1560,
    ctr: 5.01,
    cpc: 0.44,
    roas: 5.1,
    startDate: '2024-06-15',
    endDate: '2024-09-15',
  },
];

// Real-time metrics for simulation
export const realtimeMetrics = {
  activeUsers: 12847,
  sessionsToday: 34520,
  bounceRate: 42.3,
  avgSessionDuration: '2m 34s',
  topPages: [
    { page: '/', views: 8950, bounceRate: 38.2 },
    { page: '/products', views: 6780, bounceRate: 45.1 },
    { page: '/about', views: 4320, bounceRate: 52.8 },
    { page: '/contact', views: 2890, bounceRate: 48.5 },
    { page: '/blog', views: 2450, bounceRate: 35.7 },
  ],
};

// Geographic data
export const geographicData = [
  { country: 'United States', sessions: 145600, revenue: 890000, flag: '🇺🇸' },
  { country: 'United Kingdom', sessions: 89400, revenue: 540000, flag: '🇬🇧' },
  { country: 'Germany', sessions: 76300, revenue: 460000, flag: '🇩🇪' },
  { country: 'Canada', sessions: 54200, revenue: 320000, flag: '🇨🇦' },
  { country: 'Australia', sessions: 43500, revenue: 260000, flag: '🇦🇺' },
  { country: 'France', sessions: 38900, revenue: 230000, flag: '🇫🇷' },
  { country: 'Japan', sessions: 32700, revenue: 195000, flag: '🇯🇵' },
  { country: 'Netherlands', sessions: 28500, revenue: 170000, flag: '🇳🇱' },
];

// Time-based metrics for real-time updates
export const generateRealtimeUpdate = () => {
  const baseMetrics = { ...realtimeMetrics };

  return {
    ...baseMetrics,
    activeUsers:
      baseMetrics.activeUsers + Math.floor(Math.random() * 200 - 100),
    sessionsToday: baseMetrics.sessionsToday + Math.floor(Math.random() * 50),
    bounceRate: Math.max(
      20,
      Math.min(80, baseMetrics.bounceRate + (Math.random() * 4 - 2))
    ),
  };
};
