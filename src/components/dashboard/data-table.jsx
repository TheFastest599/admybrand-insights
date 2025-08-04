'use client';

import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  FilterIcon,
  DownloadIcon,
  EyeIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function CampaignTable({ data }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Sort data
  const sortedData = useMemo(() => {
    let sortableData = [...data];

    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  // Filter data
  const filteredData = useMemo(() => {
    if (filterStatus === 'all') return sortedData;
    return sortedData.filter(
      item => item.status.toLowerCase() === filterStatus.toLowerCase()
    );
  }, [sortedData, filterStatus]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = columnName => {
    if (sortConfig.key !== columnName) {
      return <ChevronUpIcon className="ml-1 h-4 w-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 h-4 w-4" />
    );
  };

  const getStatusBadge = status => {
    const variants = {
      Active: 'default',
      Paused: 'secondary',
      Scheduled: 'outline',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const formatCurrency = value => `$${value.toLocaleString()}`;
  const formatPercentage = value => `${value.toFixed(2)}%`;
  const formatDate = dateString => new Date(dateString).toLocaleDateString();

  const handleExport = () => {
    // Simulate CSV export
    const csvContent = [
      [
        'Campaign',
        'Status',
        'Budget',
        'Spent',
        'Conversions',
        'ROI',
        'Start Date',
      ].join(','),
      ...filteredData.map(row =>
        [
          row.name,
          row.status,
          row.budget,
          row.spent,
          row.conversions,
          row.roas,
          row.startDate,
        ].join(',')
      ),
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaigns.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Detailed view of all marketing campaigns with key metrics
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === 'all'}
                  onCheckedChange={() => setFilterStatus('all')}
                >
                  All Campaigns
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === 'Active'}
                  onCheckedChange={() => setFilterStatus('Active')}
                >
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === 'Paused'}
                  onCheckedChange={() => setFilterStatus('Paused')}
                >
                  Paused
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterStatus === 'Scheduled'}
                  onCheckedChange={() => setFilterStatus('Scheduled')}
                >
                  Scheduled
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <DownloadIcon className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center">
                    Campaign
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => requestSort('budget')}
                >
                  <div className="flex items-center justify-end">
                    Budget
                    {getSortIcon('budget')}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => requestSort('spent')}
                >
                  <div className="flex items-center justify-end">
                    Spent
                    {getSortIcon('spent')}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => requestSort('conversions')}
                >
                  <div className="flex items-center justify-end">
                    Conversions
                    {getSortIcon('conversions')}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none text-right"
                  onClick={() => requestSort('roas')}
                >
                  <div className="flex items-center justify-end">
                    ROAS
                    {getSortIcon('roas')}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map(campaign => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(campaign.startDate)} -{' '}
                        {formatDate(campaign.endDate)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(campaign.budget)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      {formatCurrency(campaign.spent)}
                      <div className="text-sm text-muted-foreground">
                        {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.conversions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        'font-semibold',
                        campaign.roas >= 4
                          ? 'text-green-600'
                          : campaign.roas >= 2
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      )}
                    >
                      {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : '-'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        {campaign.status === 'Active' ? (
                          <PauseIcon className="h-4 w-4" />
                        ) : (
                          <PlayIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredData.length)} of{' '}
              {filteredData.length} results
            </p>
            <Select
              value={pageSize.toString()}
              onValueChange={value => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
