import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { User, TableColumn, UserStatus } from '../../types';
import './UsersPage.css';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    verified: true,
    trustScore: 4.8,
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date('2024-11-26'),
    listingsCount: 3,
    bookingsCount: 12
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending_verification',
    verified: false,
    trustScore: 0,
    joinedAt: new Date('2024-11-20'),
    lastActive: new Date('2024-11-25'),
    listingsCount: 1,
    bookingsCount: 0
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'suspended',
    verified: true,
    trustScore: 3.2,
    joinedAt: new Date('2024-02-10'),
    lastActive: new Date('2024-10-15'),
    listingsCount: 5,
    bookingsCount: 8
  }
];

const getStatusBadgeVariant = (status: UserStatus) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'suspended':
      return 'warning';
    case 'banned':
      return 'danger';
    case 'pending_verification':
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

export const UsersPage: React.FC = () => {
  const [users] = useState<User[]>(MOCK_USERS);
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [users, statusFilter, searchQuery]);

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      label: 'User',
      sortable: true,
      render: (_, user) => (
        <div className="user-cell">
          <div className="user-cell__avatar">{user.name[0]}</div>
          <div>
            <div className="user-cell__name">{user.name}</div>
            <div className="user-cell__email">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: UserStatus) => (
        <Badge variant={getStatusBadgeVariant(status)} size="small">
          {status.replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: 'verified',
      label: 'Verified',
      render: (verified: boolean) => (verified ? '✓' : '✗')
    },
    {
      key: 'trustScore',
      label: 'Trust Score',
      sortable: true,
      render: (score: number) => `⭐ ${score.toFixed(1)}`
    },
    {
      key: 'listingsCount',
      label: 'Listings',
      sortable: true
    },
    {
      key: 'bookingsCount',
      label: 'Bookings',
      sortable: true
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      sortable: true,
      render: (date: Date) => formatDate(date)
    }
  ];

  const handleUserClick = (user: User) => {
    console.log('View user:', user.id);
  };

  return (
    <DashboardLayout>
      <div className="users-page">
        <div className="users-page__header">
          <div>
            <h1 className="users-page__title">User Management</h1>
            <p className="users-page__subtitle">Manage and verify user accounts</p>
          </div>
          <Button variant="primary">Export Data</Button>
        </div>

        <Card>
          <div className="users-page__filters">
            <input
              type="text"
              className="users-page__search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />

            <div className="users-page__filter-buttons">
              {(['all', 'active', 'pending_verification', 'suspended', 'banned'] as const).map(
                status => (
                  <button
                    key={status}
                    className={`filter-button ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status === 'all' ? 'All' : status.replace('_', ' ')}
                  </button>
                )
              )}
            </div>
          </div>

          <Table
            data={filteredUsers}
            columns={columns}
            onRowClick={handleUserClick}
            emptyMessage="No users found"
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};
