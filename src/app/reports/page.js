'use client';

import { Suspense, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Calendar,
  Download,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Filter,
  Search,
  Eye,
  Mail,
  BarChart3,
  PieChart,
  LineChart,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample reports data
const reportsData = [
  {
    id: 1,
    title: 'Monthly Revenue Report',
    description: 'Comprehensive revenue analysis for the current month',
    type: 'Financial',
    lastUpdated: '2025-08-04',
    size: '2.4 MB',
    format: 'PDF',
    status: 'Ready',
    metrics: { revenue: '$124,567', growth: '+12.5%' },
  },
  {
    id: 2,
    title: 'User Acquisition Analysis',
    description: 'Detailed breakdown of user acquisition channels and costs',
    type: 'Marketing',
    lastUpdated: '2025-08-03',
    size: '1.8 MB',
    format: 'Excel',
    status: 'Ready',
    metrics: { users: '89,234', acquisition: '+8.2%' },
  },
  {
    id: 3,
    title: 'Campaign Performance Q3',
    description: 'Quarterly review of all marketing campaigns and ROI',
    type: 'Marketing',
    lastUpdated: '2025-08-02',
    size: '3.1 MB',
    format: 'PDF',
    status: 'Generating',
    metrics: { campaigns: '24', roi: '315%' },
  },
  {
    id: 4,
    title: 'Website Analytics Deep Dive',
    description: 'In-depth analysis of website traffic and user behavior',
    type: 'Analytics',
    lastUpdated: '2025-08-01',
    size: '4.2 MB',
    format: 'PDF',
    status: 'Ready',
    metrics: { pageviews: '234,567', bounce: '42.1%' },
  },
  {
    id: 5,
    title: 'Social Media Engagement',
    description:
      'Cross-platform social media performance and engagement metrics',
    type: 'Social',
    lastUpdated: '2025-07-31',
    size: '1.5 MB',
    format: 'Excel',
    status: 'Ready',
    metrics: { engagement: '4.2%', followers: '+2,340' },
  },
  {
    id: 6,
    title: 'Email Marketing Performance',
    description: 'Email campaign effectiveness and subscriber growth analysis',
    type: 'Email',
    lastUpdated: '2025-07-30',
    size: '900 KB',
    format: 'PDF',
    status: 'Ready',
    metrics: { openRate: '24.5%', ctr: '3.8%' },
  },
];

const scheduledReports = [
  {
    id: 1,
    title: 'Weekly Performance Summary',
    frequency: 'Weekly',
    nextRun: '2025-08-11',
    recipients: ['alex@admybrand.com', 'team@admybrand.com'],
    status: 'Active',
  },
  {
    id: 2,
    title: 'Monthly Financial Report',
    frequency: 'Monthly',
    nextRun: '2025-09-01',
    recipients: ['finance@admybrand.com'],
    status: 'Active',
  },
  {
    id: 3,
    title: 'Campaign ROI Analysis',
    frequency: 'Bi-weekly',
    nextRun: '2025-08-18',
    recipients: ['marketing@admybrand.com'],
    status: 'Paused',
  },
];

function ReportCard({ report, onDownload, onView }) {
  const getStatusColor = status => {
    switch (status) {
      case 'Ready':
        return 'bg-green-100 text-green-800';
      case 'Generating':
        return 'bg-yellow-100 text-yellow-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = type => {
    switch (type) {
      case 'Financial':
        return DollarSign;
      case 'Marketing':
        return Target;
      case 'Analytics':
        return BarChart3;
      case 'Social':
        return Users;
      case 'Email':
        return Mail;
      default:
        return FileText;
    }
  };

  const TypeIcon = getTypeIcon(report.type);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TypeIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription className="mt-1">
                {report.description}
              </CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(report.status)}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(report.metrics).map(([key, value]) => (
              <div key={key}>
                <div className="text-muted-foreground capitalize">{key}</div>
                <div className="font-semibold">{value}</div>
              </div>
            ))}
          </div>

          {/* Report Details */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-3">
            <div className="flex items-center space-x-4">
              <span>Type: {report.type}</span>
              <span>Size: {report.size}</span>
              <span>Format: {report.format}</span>
            </div>
            <span>
              Updated: {new Date(report.lastUpdated).toLocaleDateString()}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(report)}
              disabled={report.status !== 'Ready'}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(report)}
              disabled={report.status !== 'Ready'}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduledReportsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Reports</CardTitle>
        <CardDescription>
          Automated report generation and delivery
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {scheduledReports.map(report => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">{report.title}</h4>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                  <span>Frequency: {report.frequency}</span>
                  <span>
                    Next: {new Date(report.nextRun).toLocaleDateString()}
                  </span>
                  <span>Recipients: {report.recipients.length}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={report.status === 'Active' ? 'default' : 'secondary'}
                >
                  {report.status}
                </Badge>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredReports = reportsData.filter(report => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus =
      selectedStatus === 'all' || report.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDownload = report => {
    // Simulate report download
    const blob = new Blob(
      [`Report: ${report.title}\nGenerated: ${new Date().toISOString()}`],
      { type: 'text/plain' }
    );
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(
      /\s+/g,
      '_'
    )}.${report.format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleView = report => {
    // Simulate report viewing
    alert(`Opening ${report.title} for preview...`);
  };

  const handleGenerateReport = () => {
    alert('Report generation wizard would open here...');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports</h1>
            <p className="text-muted-foreground">
              Generate, view, and manage your business reports
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={handleGenerateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Report Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Analytics">Analytics</SelectItem>
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={selectedStatus}
                      onValueChange={setSelectedStatus}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Ready">Ready</SelectItem>
                        <SelectItem value="Generating">Generating</SelectItem>
                        <SelectItem value="Error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reports Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onDownload={handleDownload}
                  onView={handleView}
                />
              ))}
            </div>

            {filteredReports.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No reports found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or generate a new report.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <ScheduledReportsTable />

            <Card>
              <CardHeader>
                <CardTitle>Schedule New Report</CardTitle>
                <CardDescription>
                  Set up automated report generation and delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input
                      id="report-name"
                      placeholder="Weekly Performance Summary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="recipients">Email Recipients</Label>
                  <Input
                    id="recipients"
                    placeholder="email1@company.com, email2@company.com"
                  />
                </div>
                <Button>Schedule Report</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Executive Summary',
                  description: 'High-level overview for leadership team',
                  icon: BarChart3,
                  metrics: ['Revenue', 'Growth', 'Key KPIs'],
                },
                {
                  name: 'Marketing Performance',
                  description: 'Comprehensive marketing metrics and ROI',
                  icon: Target,
                  metrics: ['Campaigns', 'Conversions', 'Attribution'],
                },
                {
                  name: 'Financial Analysis',
                  description: 'Detailed financial breakdown and projections',
                  icon: DollarSign,
                  metrics: ['Revenue', 'Costs', 'Profit Margins'],
                },
                {
                  name: 'User Analytics',
                  description: 'User behavior and engagement insights',
                  icon: Users,
                  metrics: ['Sessions', 'Behavior', 'Retention'],
                },
                {
                  name: 'Traffic Analysis',
                  description: 'Website traffic sources and performance',
                  icon: TrendingUp,
                  metrics: ['Sources', 'Pages', 'Conversions'],
                },
                {
                  name: 'Custom Report',
                  description: 'Build your own custom report template',
                  icon: FileText,
                  metrics: ['Custom metrics', 'Flexible layout'],
                },
              ].map((template, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <template.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {template.name}
                        </CardTitle>
                        <CardDescription>
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Includes:</h4>
                        <div className="flex flex-wrap gap-1">
                          {template.metrics.map((metric, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {metric}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
