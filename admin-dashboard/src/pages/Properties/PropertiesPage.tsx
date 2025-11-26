import React, { useState, useMemo } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Listing, TableColumn, ListingStatus } from '../../types';
import './PropertiesPage.css';

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Studio in Downtown',
    location: 'Helsinki, Finland',
    price: 1200,
    status: 'pending',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date('2024-11-20'),
    images: [],
    type: 'Studio',
    flagCount: 0
  },
  {
    id: '2',
    title: 'Cozy 2BR Apartment',
    location: 'Tampere, Finland',
    price: 1500,
    status: 'approved',
    userId: '2',
    userName: 'Jane Smith',
    createdAt: new Date('2024-11-15'),
    reviewedAt: new Date('2024-11-16'),
    reviewedBy: 'Admin',
    images: [],
    type: 'Apartment',
    flagCount: 0
  },
  {
    id: '3',
    title: 'Luxury Villa with Pool',
    location: 'Espoo, Finland',
    price: 3500,
    status: 'flagged',
    userId: '3',
    userName: 'Mike Johnson',
    createdAt: new Date('2024-11-10'),
    images: [],
    type: 'Villa',
    flagCount: 3
  }
];

const getStatusBadgeVariant = (status: ListingStatus) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'pending':
      return 'warning';
    case 'rejected':
      return 'danger';
    case 'flagged':
      return 'danger';
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

const formatPrice = (price: number) => {
  return `$${price.toLocaleString()}`;
};

export const PropertiesPage: React.FC = () => {
  const [listings] = useState<Listing[]>(MOCK_LISTINGS);
  const [statusFilter, setStatusFilter] = useState<ListingStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      const matchesStatus = statusFilter === 'all' || listing.status === statusFilter;
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.userName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [listings, statusFilter, searchQuery]);

  const columns: TableColumn<Listing>[] = [
    {
      key: 'title',
      label: 'Property',
      sortable: true,
      render: (_, listing) => (
        <div className="property-cell">
          <div className="property-cell__image">🏠</div>
          <div>
            <div className="property-cell__title">{listing.title}</div>
            <div className="property-cell__location">📍 {listing.location}</div>
          </div>
        </div>
      )
    },
    {
      key: 'userName',
      label: 'Owner',
      sortable: true
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (price: number) => formatPrice(price) + '/mo'
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: ListingStatus) => (
        <Badge variant={getStatusBadgeVariant(status)} size="small">
          {status}
        </Badge>
      )
    },
    {
      key: 'flagCount',
      label: 'Flags',
      sortable: true,
      render: (count: number) => (count > 0 ? `⚠️ ${count}` : '0')
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      render: (date: Date) => formatDate(date)
    }
  ];

  const handleListingClick = (listing: Listing) => {
    console.log('View listing:', listing.id);
  };

  const handleApprove = (id: string) => {
    console.log('Approve listing:', id);
  };

  const handleReject = (id: string) => {
    console.log('Reject listing:', id);
  };

  const pendingCount = listings.filter(l => l.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="properties-page">
        <div className="properties-page__header">
          <div>
            <h1 className="properties-page__title">Listing Management</h1>
            <p className="properties-page__subtitle">
              Review and approve property listings ({pendingCount} pending)
            </p>
          </div>
          <Button variant="primary">Export Data</Button>
        </div>

        <Card>
          <div className="properties-page__filters">
            <input
              type="text"
              className="properties-page__search"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />

            <div className="properties-page__filter-buttons">
              {(['all', 'pending', 'approved', 'rejected', 'flagged'] as const).map(status => (
                <button
                  key={status}
                  className={`filter-button ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <Table
            data={filteredListings}
            columns={columns}
            onRowClick={handleListingClick}
            emptyMessage="No listings found"
          />

          {statusFilter === 'pending' && filteredListings.length > 0 && (
            <div className="properties-page__actions">
              <p>Quick Actions for Pending Listings:</p>
              <div className="quick-actions">
                {filteredListings.map(listing => (
                  <div key={listing.id} className="quick-action">
                    <span>{listing.title}</span>
                    <div>
                      <Button size="small" variant="success" onClick={() => handleApprove(listing.id)}>
                        Approve
                      </Button>
                      <Button size="small" variant="danger" onClick={() => handleReject(listing.id)}>
                        Reject
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
