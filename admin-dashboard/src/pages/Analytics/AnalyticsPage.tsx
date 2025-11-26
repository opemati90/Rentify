import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import './AnalyticsPage.css';

interface AnalyticsData {
  userGrowth: number[];
  listingGrowth: number[];
  revenueGrowth: number[];
  labels: string[];
}

const MOCK_ANALYTICS: AnalyticsData = {
  userGrowth: [120, 150, 180, 220, 280, 350, 420],
  listingGrowth: [45, 58, 72, 89, 105, 128, 156],
  revenueGrowth: [5200, 6400, 7800, 9200, 11500, 14200, 17800],
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
};

export const AnalyticsPage: React.FC = () => {
  const calculateGrowth = (data: number[]) => {
    const current = data[data.length - 1];
    const previous = data[data.length - 2];
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <DashboardLayout>
      <div className="analytics-page">
        <div className="page-header">
          <h1 className="page-title">Analytics & Insights</h1>
          <p className="page-subtitle">Track platform performance and growth</p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <Card padding="medium">
            <div className="metric-card">
              <div className="metric-icon metric-icon--blue">👥</div>
              <div className="metric-content">
                <div className="metric-label">Total Users</div>
                <div className="metric-value">
                  {MOCK_ANALYTICS.userGrowth[MOCK_ANALYTICS.userGrowth.length - 1]}
                </div>
                <div className="metric-change metric-change--positive">
                  +{calculateGrowth(MOCK_ANALYTICS.userGrowth)}% this week
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="metric-card">
              <div className="metric-icon metric-icon--purple">🏠</div>
              <div className="metric-content">
                <div className="metric-label">Active Listings</div>
                <div className="metric-value">
                  {MOCK_ANALYTICS.listingGrowth[MOCK_ANALYTICS.listingGrowth.length - 1]}
                </div>
                <div className="metric-change metric-change--positive">
                  +{calculateGrowth(MOCK_ANALYTICS.listingGrowth)}% this week
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="metric-card">
              <div className="metric-icon metric-icon--green">💰</div>
              <div className="metric-content">
                <div className="metric-label">Revenue (MTD)</div>
                <div className="metric-value">
                  ${(MOCK_ANALYTICS.revenueGrowth[MOCK_ANALYTICS.revenueGrowth.length - 1]).toLocaleString()}
                </div>
                <div className="metric-change metric-change--positive">
                  +{calculateGrowth(MOCK_ANALYTICS.revenueGrowth)}% this week
                </div>
              </div>
            </div>
          </Card>

          <Card padding="medium">
            <div className="metric-card">
              <div className="metric-icon metric-icon--orange">📊</div>
              <div className="metric-content">
                <div className="metric-label">Conversion Rate</div>
                <div className="metric-value">24.5%</div>
                <div className="metric-change metric-change--positive">
                  +2.3% this week
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          <Card title="User Growth" padding="medium">
            <div className="chart-container">
              <div className="simple-chart">
                {MOCK_ANALYTICS.userGrowth.map((value, index) => (
                  <div key={index} className="chart-bar">
                    <div
                      className="chart-bar-fill chart-bar-fill--blue"
                      style={{ height: `${(value / Math.max(...MOCK_ANALYTICS.userGrowth)) * 100}%` }}
                    />
                    <div className="chart-bar-label">{MOCK_ANALYTICS.labels[index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Listing Growth" padding="medium">
            <div className="chart-container">
              <div className="simple-chart">
                {MOCK_ANALYTICS.listingGrowth.map((value, index) => (
                  <div key={index} className="chart-bar">
                    <div
                      className="chart-bar-fill chart-bar-fill--purple"
                      style={{ height: `${(value / Math.max(...MOCK_ANALYTICS.listingGrowth)) * 100}%` }}
                    />
                    <div className="chart-bar-label">{MOCK_ANALYTICS.labels[index]}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card title="Revenue Overview" padding="medium">
          <div className="chart-container">
            <div className="simple-chart simple-chart--wide">
              {MOCK_ANALYTICS.revenueGrowth.map((value, index) => (
                <div key={index} className="chart-bar">
                  <div
                    className="chart-bar-fill chart-bar-fill--green"
                    style={{ height: `${(value / Math.max(...MOCK_ANALYTICS.revenueGrowth)) * 100}%` }}
                  />
                  <div className="chart-bar-label">{MOCK_ANALYTICS.labels[index]}</div>
                  <div className="chart-bar-value">${(value / 1000).toFixed(1)}k</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};
