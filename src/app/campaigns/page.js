'use client';

import { Suspense, useState } from 'react';
import { AppHeader } from '@/components/shared/app-header';

// Utility function to format numbers consistently across server and client
const formatNumber = num => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Utility function to format dates consistently across server and client
const formatDate = dateString => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString));
};

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
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  Square,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MousePointer,
  Target,
  Calendar,
  BarChart3,
  Eye,
  Copy,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample campaigns data
const campaignsData = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    type: 'Email Marketing',
    status: 'Active',
    budget: 15000,
    spent: 12300,
    impressions: 245000,
    clicks: 8940,
    conversions: 342,
    revenue: 45600,
    startDate: '2024-07-01',
    endDate: '2024-08-31',
    ctr: 3.65,
    cpc: 1.38,
    roas: 3.71,
    target: 'Women 25-45, Fashion Interest',
  },
  {
    id: 2,
    name: 'Brand Awareness Q3',
    type: 'Social Media',
    status: 'Active',
    budget: 25000,
    spent: 18700,
    impressions: 890000,
    clicks: 15600,
    conversions: 128,
    revenue: 32000,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    ctr: 1.75,
    cpc: 1.2,
    roas: 1.71,
    target: 'All Demographics, Brand Keywords',
  },
  {
    id: 3,
    name: 'Product Launch - Smart Watch',
    type: 'Google Ads',
    status: 'Completed',
    budget: 8000,
    spent: 7850,
    impressions: 156000,
    clicks: 4200,
    conversions: 189,
    revenue: 28500,
    startDate: '2024-06-15',
    endDate: '2024-07-15',
    ctr: 2.69,
    cpc: 1.87,
    roas: 3.63,
    target: 'Tech Enthusiasts, 25-55',
  },
  {
    id: 4,
    name: 'Back to School Campaign',
    type: 'Display Ads',
    status: 'Paused',
    budget: 12000,
    spent: 3400,
    impressions: 78000,
    clicks: 1200,
    conversions: 45,
    revenue: 6700,
    startDate: '2024-08-01',
    endDate: '2024-09-15',
    ctr: 1.54,
    cpc: 2.83,
    roas: 1.97,
    target: 'Parents, Students 18-25',
  },
  {
    id: 5,
    name: 'Retargeting Campaign',
    type: 'Facebook Ads',
    status: 'Active',
    budget: 5000,
    spent: 2100,
    impressions: 125000,
    clicks: 3800,
    conversions: 267,
    revenue: 18900,
    startDate: '2024-07-15',
    endDate: '2024-08-15',
    ctr: 3.04,
    cpc: 0.55,
    roas: 9.0,
    target: 'Website Visitors, Cart Abandoners',
  },
  {
    id: 6,
    name: 'Holiday Preview 2024',
    type: 'Email Marketing',
    status: 'Draft',
    budget: 20000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    revenue: 0,
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    ctr: 0,
    cpc: 0,
    roas: 0,
    target: 'Newsletter Subscribers, VIP Customers',
  },
];

function CampaignCard({
  campaign,
  onEdit,
  onView,
  onToggleStatus,
  onDuplicate,
  onDelete,
}) {
  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = type => {
    switch (type) {
      case 'Email Marketing':
        return 'bg-purple-100 text-purple-800';
      case 'Google Ads':
        return 'bg-red-100 text-red-800';
      case 'Facebook Ads':
        return 'bg-blue-100 text-blue-800';
      case 'Social Media':
        return 'bg-pink-100 text-pink-800';
      case 'Display Ads':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const budgetUsed =
    campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0;
  const isPerforming = campaign.roas > 2.5;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
              <Badge variant="outline" className={getTypeColor(campaign.type)}>
                {campaign.type}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              {campaign.target}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(campaign)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(campaign)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              {campaign.status === 'Active' ? (
                <DropdownMenuItem
                  onClick={() => onToggleStatus(campaign, 'Paused')}
                >
                  <Pause className="mr-2 h-4 w-4" />
                  Pause Campaign
                </DropdownMenuItem>
              ) : campaign.status === 'Paused' ? (
                <DropdownMenuItem
                  onClick={() => onToggleStatus(campaign, 'Active')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Resume Campaign
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(campaign)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="text-muted-foreground">Spent</div>
              <div className="font-bold text-lg">
                ${formatNumber(campaign.spent)}
              </div>
              <div className="text-xs text-muted-foreground">
                of ${formatNumber(campaign.budget)}
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="text-muted-foreground">Revenue</div>
              <div className="font-bold text-lg text-green-600">
                ${formatNumber(campaign.revenue)}
              </div>
              <div className="text-xs text-muted-foreground">
                ROAS: {campaign.roas.toFixed(2)}x
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="text-muted-foreground">Clicks</div>
              <div className="font-bold text-lg">
                {formatNumber(campaign.clicks)}
              </div>
              <div className="text-xs text-muted-foreground">
                CTR: {campaign.ctr.toFixed(2)}%
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <div className="text-muted-foreground">Conversions</div>
              <div className="font-bold text-lg">{campaign.conversions}</div>
              <div className="text-xs text-muted-foreground">
                Rate:{' '}
                {campaign.clicks > 0
                  ? ((campaign.conversions / campaign.clicks) * 100).toFixed(2)
                  : 0}
                %
              </div>
            </div>
          </div>

          {/* Budget Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Budget Usage</span>
              <span>{budgetUsed.toFixed(1)}%</span>
            </div>
            <Progress value={budgetUsed} className="h-2" />
          </div>

          {/* Performance Indicator */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              {isPerforming ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  isPerforming ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPerforming ? 'Performing Well' : 'Needs Attention'}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignStats({ campaigns }) {
  const totalBudget = campaigns.reduce(
    (sum, campaign) => sum + campaign.budget,
    0
  );
  const totalSpent = campaigns.reduce(
    (sum, campaign) => sum + campaign.spent,
    0
  );
  const totalRevenue = campaigns.reduce(
    (sum, campaign) => sum + campaign.revenue,
    0
  );
  const activeCampaigns = campaigns.filter(
    campaign => campaign.status === 'Active'
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(totalBudget)}</div>
          <div className="text-xs text-muted-foreground">
            ${formatNumber(totalSpent)} spent (
            {((totalSpent / totalBudget) * 100).toFixed(1)}%)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${formatNumber(totalRevenue)}
          </div>
          <div className="text-xs text-muted-foreground">
            ROAS: {totalSpent > 0 ? (totalRevenue / totalSpent).toFixed(2) : 0}x
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Campaigns
          </CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeCampaigns}</div>
          <div className="text-xs text-muted-foreground">
            {campaigns.length} total campaigns
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalSpent > 0
              ? ((totalRevenue / totalSpent) * 100).toFixed(0)
              : 0}
            %
          </div>
          <div className="text-xs text-muted-foreground">
            Return on ad spend
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [campaigns, setCampaigns] = useState(campaignsData);

  // Form state for new campaign
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'Email Marketing',
    budget: '',
    target: '',
    startDate: '',
    endDate: '',
  });

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === 'all' || campaign.type === selectedType;
    const matchesStatus =
      selectedStatus === 'all' || campaign.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateCampaign = () => {
    setIsCreateDialogOpen(true);
  };

  const handleSaveCampaign = () => {
    if (!newCampaign.name || !newCampaign.budget || !newCampaign.target) {
      alert('Please fill in all required fields');
      return;
    }

    const campaign = {
      id: campaigns.length + 1,
      name: newCampaign.name,
      type: newCampaign.type,
      status: 'Draft',
      budget: parseInt(newCampaign.budget),
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
      startDate: newCampaign.startDate,
      endDate: newCampaign.endDate,
      ctr: 0,
      cpc: 0,
      roas: 0,
      target: newCampaign.target,
    };

    setCampaigns([...campaigns, campaign]);
    setIsCreateDialogOpen(false);
    setNewCampaign({
      name: '',
      type: 'Email Marketing',
      budget: '',
      target: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleCancelCreate = () => {
    setIsCreateDialogOpen(false);
    setNewCampaign({
      name: '',
      type: 'Email Marketing',
      budget: '',
      target: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleEditCampaign = campaign => {
    alert(`Edit campaign: ${campaign.name}`);
  };

  const handleViewCampaign = campaign => {
    alert(`View campaign details: ${campaign.name}`);
  };

  const handleToggleStatus = (campaign, newStatus) => {
    alert(`Change campaign ${campaign.name} status to ${newStatus}`);
  };

  const handleDuplicateCampaign = campaign => {
    alert(`Duplicate campaign: ${campaign.name}`);
  };

  const handleDeleteCampaign = campaign => {
    if (confirm(`Are you sure you want to delete "${campaign.name}"?`)) {
      alert(`Delete campaign: ${campaign.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaign Management</h1>
            <p className="text-muted-foreground">
              Create, monitor, and optimize your marketing campaigns
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={handleCreateCampaign}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Campaign</DialogTitle>
                  <DialogDescription>
                    Set up a new marketing campaign with your target audience
                    and budget.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-name">Campaign Name *</Label>
                    <Input
                      id="campaign-name"
                      placeholder="e.g., Holiday Sale 2024"
                      value={newCampaign.name}
                      onChange={e =>
                        setNewCampaign({ ...newCampaign, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-type">Campaign Type</Label>
                    <Select
                      value={newCampaign.type}
                      onValueChange={value =>
                        setNewCampaign({ ...newCampaign, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email Marketing">
                          Email Marketing
                        </SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="Facebook Ads">
                          Facebook Ads
                        </SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Display Ads">Display Ads</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-budget">Budget ($) *</Label>
                    <Input
                      id="campaign-budget"
                      type="number"
                      placeholder="10000"
                      value={newCampaign.budget}
                      onChange={e =>
                        setNewCampaign({
                          ...newCampaign,
                          budget: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="campaign-target">Target Audience *</Label>
                    <Input
                      id="campaign-target"
                      placeholder="e.g., Women 25-45, Fashion Interest"
                      value={newCampaign.target}
                      onChange={e =>
                        setNewCampaign({
                          ...newCampaign,
                          target: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newCampaign.startDate}
                        onChange={e =>
                          setNewCampaign({
                            ...newCampaign,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newCampaign.endDate}
                        onChange={e =>
                          setNewCampaign({
                            ...newCampaign,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelCreate}
                  >
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleSaveCampaign}>
                    Create Campaign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <CampaignStats campaigns={campaigns} />

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Campaigns</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search campaigns..."
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
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Campaign Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Email Marketing">
                          Email Marketing
                        </SelectItem>
                        <SelectItem value="Google Ads">Google Ads</SelectItem>
                        <SelectItem value="Facebook Ads">
                          Facebook Ads
                        </SelectItem>
                        <SelectItem value="Social Media">
                          Social Media
                        </SelectItem>
                        <SelectItem value="Display Ads">Display Ads</SelectItem>
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
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Paused">Paused</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredCampaigns.map(campaign => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onEdit={handleEditCampaign}
                  onView={handleViewCampaign}
                  onToggleStatus={handleToggleStatus}
                  onDuplicate={handleDuplicateCampaign}
                  onDelete={handleDeleteCampaign}
                />
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No campaigns found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or create a new campaign.
                  </p>
                  <Button onClick={handleCreateCampaign}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Campaign
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {['active', 'paused', 'completed', 'draft'].map(status => (
            <TabsContent key={status} value={status} className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {campaigns
                  .filter(campaign => campaign.status.toLowerCase() === status)
                  .map(campaign => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onEdit={handleEditCampaign}
                      onView={handleViewCampaign}
                      onToggleStatus={handleToggleStatus}
                      onDuplicate={handleDuplicateCampaign}
                      onDelete={handleDeleteCampaign}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
