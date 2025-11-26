import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { DashboardStats } from '../../types';
import './DashboardPage.css';

const MOCK_STATS: DashboardStats = {
  totalUsers: 12543,
  activeUsers: 8932,
  pendingVerifications: 124,
  totalListings: 4821,
  pendingListings: 43,
  approvedListings: 4512,
  rejectedListings: 266,
  openReports: 18,
  resolvedReports: 342,
  revenue: 523400,
  userGrowth: 15.3,
  listingGrowth: 12.8
};

const RECENT_ACTIVITY = [
  { id: '1', action: 'New user registration', user: 'john@example.com', time: '2 min ago' },
  { id: '2', action: 'Listing approved', user: 'Modern Studio in Downtown', time: '5 min ago' },
  { id: '3', action: 'Report resolved', user: 'Spam report #342', time: '10 min ago' },
  { id: '4', action: 'User verified', user: 'jane@example.com', time: '15 min ago' },
  { id: '5', action: 'New listing created', user: 'Cozy 2BR Apartment', time: '20 min ago' }
];

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString()}`;
};

const formatGrowth = (growth: number) => {
  const sign = growth >= 0 ? '+' : '';
  return `${sign}${growth.toFixed(1)}%`;
};

export const DashboardPage: React.FC = () => {
  const [stats] = useState<DashboardStats>(MOCK_STATS);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-page__header">
          <div>
            <h1 className="dashboard-page__title">Dashboard</h1>
            <p className="dashboard-page__subtitle">Welcome back! Here's your platform overview.</p>
          </div>
        </div>

        <div className="stats-grid">
          <Card padding="medium">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--blue">👥</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Total Users</div>
                <div className="stat-card__value">{formatNumber(stats.totalUsers)}</div>
                <div className="stat-card__growth stat-card__growth--positive">
                  {formatGrowth(stats.userGrowth)}
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--green">✓</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Active Users</div>
                <div className="stat-card__value">{formatNumber(stats.activeUsers)}</div>
                <div className="stat-card__meta">
                  {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% active
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--purple">🏠</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Total Listings</div>
                <div className="stat-card__value">{formatNumber(stats.totalListings)}</div>
                <div className="stat-card__growth stat-card__growth--positive">
                  {formatGrowth(stats.listingGrowth)}
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="stat-card">
              <div className="stat-card__icon stat-card__icon--orange">⚠️</div>
              <div className="stat-card__content">
                <div className="stat-card__label">Open Reports</div>
                <div className="stat-card__value">{formatNumber(stats.openReports)}</div>
                <Badge variant="warning" size="small">
                  Needs attention
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="dashboard-grid">
          <Card title="Pending Actions" padding="medium">
            <div className="pending-items">
              <div className="pending-item">
                <div>
                  <div className="pending-item__label">Pending Verifications</div>
                  <div className="pending-item__count">{stats.pendingVerifications}</div>
                </div>
                <Badge variant="warning">Action Required</Badge>
              </div>

              <div className="pending-item">
                <div>
                  <div className="pending-item__label">Pending Listings</div>
                  <div className="pending-item__count">{stats.pendingListings}</div>
                </div>
                <Badge variant="info">Review</Badge>
              </div>

              <div className="pending-item">
                <div>
                  <div className="pending-item__label">Open Reports</div>
                  <div className="pending-item__count">{stats.openReports}</div>
                </div>
                <Badge variant="danger">Urgent</Badge>
              </div>
            </div>
          </Card>

          <Card title="Revenue Overview" padding="medium">
            <div className="revenue-card">
              <div className="revenue-card__amount">{formatCurrency(stats.revenue)}</div>
              <div className="revenue-card__label">Total Revenue (MTD)</div>
              <div className="revenue-breakdown">
                <div className="revenue-item">
                  <span>Approved Listings</span>
                  <span>{formatNumber(stats.approvedListings)}</span>
                </div>
                <div className="revenue-item">
                  <span>Active Users</span>
                  <span>{formatNumber(stats.activeUsers)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Recent Activity" padding="none">
          <div className="activity-list">
            {RECENT_ACTIVITY.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-item__icon">•</div>
                <div className="activity-item__content">
                  <div className="activity-item__action">{activity.action}</div>
                  <div className="activity-item__user">{activity.user}</div>
                </div>
                <div className="activity-item__time">{activity.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
