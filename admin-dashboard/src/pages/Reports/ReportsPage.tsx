import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Report, TableColumn, ReportStatus, ReportType } from '../../types';
import './ReportsPage.css';

const MOCK_REPORTS: Report[] = [
  {
    id: '1',
    type: 'inappropriate_content',
    status: 'open',
    reportedBy: 'User123',
    reportedListingId: '1',
    description: 'Listing contains misleading images',
    createdAt: new Date('2024-11-25'),
    severity: 'high'
  },
  {
    id: '2',
    type: 'fraud',
    status: 'investigating',
    reportedBy: 'User456',
    reportedUserId: '3',
    description: 'Suspected fake listing and payment scam',
    createdAt: new Date('2024-11-24'),
    severity: 'high'
  },
  {
    id: '3',
    type: 'spam',
    status: 'resolved',
    reportedBy: 'User789',
    reportedUserId: '2',
    description: 'User is sending spam messages',
    createdAt: new Date('2024-11-20'),
    resolvedAt: new Date('2024-11-21'),
    resolvedBy: 'Admin',
    severity: 'low'
  }
];

const getStatusBadgeVariant = (status: ReportStatus) => {
  switch (status) {
    case 'open':
      return 'warning';
    case 'investigating':
      return 'info';
    case 'resolved':
      return 'success';
    case 'dismissed':
      return 'neutral';
    default:
      return 'neutral';
  }
};

const getSeverityBadgeVariant = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'danger';
    case 'medium':
      return 'warning';
    case 'low':
      return 'info';
    default:
      return 'neutral';
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const ReportsPage: React.FC = () => {
  const [reports] = useState<Report[]>(MOCK_REPORTS);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ReportType | 'all'>('all');

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
      const matchesType = typeFilter === 'all' || report.type === typeFilter;

      return matchesStatus && matchesType;
    });
  }, [reports, statusFilter, typeFilter]);

  const columns: TableColumn<Report>[] = [
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (type: ReportType) => (
        <span className="report-type">
          {type.replace(/_/g, ' ')}
        </span>
      )
    },
    {
      key: 'reportedBy',
      label: 'Reported By',
      sortable: true
    },
    {
      key: 'description',
      label: 'Description',
      render: (desc: string) => (
        <span className="report-description">{desc}</span>
      )
    },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (severity: string) => (
        <Badge variant={getSeverityBadgeVariant(severity)} size="small">
          {severity}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: ReportStatus) => (
        <Badge variant={getStatusBadgeVariant(status)} size="small">
          {status}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Reported',
      sortable: true,
      render: (date: Date) => formatDate(date)
    }
  ];

  const handleReportClick = (report: Report) => {
    console.log('View report:', report.id);
  };

  const handleInvestigate = (id: string) => {
    console.log('Investigate report:', id);
  };

  const handleResolve = (id: string) => {
    console.log('Resolve report:', id);
  };

  const openCount = reports.filter(r => r.status === 'open').length;
  const highSeverityCount = reports.filter(r => r.severity === 'high').length;

  return (
    <DashboardLayout>
      <div className="reports-page">
        <div className="reports-page__header">
          <div>
            <h1 className="reports-page__title">Reports & Violations</h1>
            <p className="reports-page__subtitle">
              {openCount} open reports, {highSeverityCount} high severity
            </p>
          </div>
          <Button variant="primary">Export Reports</Button>
        </div>

        <div className="reports-page__stats">
          <Card title="Open" padding="medium">
            <div className="stat-value">{openCount}</div>
          </Card>
          <Card title="Investigating" padding="medium">
            <div className="stat-value">
              {reports.filter(r => r.status === 'investigating').length}
            </div>
          </Card>
          <Card title="Resolved" padding="medium">
            <div className="stat-value">
              {reports.filter(r => r.status === 'resolved').length}
            </div>
          </Card>
          <Card title="High Severity" padding="medium">
            <div className="stat-value stat-value--danger">{highSeverityCount}</div>
          </Card>
        </div>

        <Card>
          <div className="reports-page__filters">
            <div className="filter-group">
              <label>Status:</label>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as ReportStatus | 'all')}
                className="filter-select"
              >
                <option value="all">All</option>
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Type:</label>
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as ReportType | 'all')}
                className="filter-select"
              >
                <option value="all">All</option>
                <option value="inappropriate_content">Inappropriate Content</option>
                <option value="fraud">Fraud</option>
                <option value="spam">Spam</option>
                <option value="harassment">Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Table
            data={filteredReports}
            columns={columns}
            onRowClick={handleReportClick}
            emptyMessage="No reports found"
          />

          {statusFilter === 'open' && filteredReports.length > 0 && (
            <div className="reports-page__actions">
              <p>Quick Actions for Open Reports:</p>
              <div className="quick-actions">
                {filteredReports.map(report => (
                  <div key={report.id} className="quick-action">
                    <span>{report.type.replace(/_/g, ' ')} - {report.reportedBy}</span>
                    <div>
                      <Button size="small" variant="secondary" onClick={() => handleInvestigate(report.id)}>
                        Investigate
                      </Button>
                      <Button size="small" variant="success" onClick={() => handleResolve(report.id)}>
                        Resolve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};
