import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import './ListingsApprovalPage.css';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  type: string;
  owner: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  images: string[];
  description: string;
}

const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Studio Downtown',
    location: 'Helsinki, Finland',
    price: 1200,
    type: 'Studio',
    owner: 'John Doe',
    submittedDate: '2024-01-15',
    status: 'pending',
    images: ['https://via.placeholder.com/400x300'],
    description: 'Beautiful modern studio in the heart of downtown...'
  },
  {
    id: '2',
    title: 'Cozy 2BR Apartment',
    location: 'Espoo, Finland',
    price: 1800,
    type: 'Apartment',
    owner: 'Jane Smith',
    submittedDate: '2024-01-14',
    status: 'pending',
    images: ['https://via.placeholder.com/400x300'],
    description: 'Spacious 2-bedroom apartment with modern amenities...'
  }
];

export const ListingsApprovalPage: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const handleApprove = (listingId: string) => {
    setListings(listings.map(l =>
      l.id === listingId ? { ...l, status: 'approved' as const } : l
    ));
    setSelectedListing(null);
  };

  const handleReject = (listingId: string) => {
    setListings(listings.map(l =>
      l.id === listingId ? { ...l, status: 'rejected' as const } : l
    ));
    setSelectedListing(null);
  };

  const pendingListings = listings.filter(l => l.status === 'pending');

  return (
    <DashboardLayout>
      <div className="listings-approval-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Listings Approval</h1>
            <p className="page-subtitle">{pendingListings.length} listings pending review</p>
          </div>
        </div>

        <div className="listings-grid">
          <div className="listings-list">
            {pendingListings.map(listing => (
              <Card key={listing.id} padding="medium">
                <div className="listing-item" onClick={() => setSelectedListing(listing)}>
                  <div className="listing-image">
                    <img src={listing.images[0]} alt={listing.title} />
                    <Badge variant="warning" size="small">Pending</Badge>
                  </div>
                  <div className="listing-info">
                    <h3 className="listing-title">{listing.title}</h3>
                    <p className="listing-location">📍 {listing.location}</p>
                    <div className="listing-meta">
                      <span className="listing-price">${listing.price}/month</span>
                      <span className="listing-type">{listing.type}</span>
                    </div>
                    <p className="listing-owner">By {listing.owner}</p>
                    <p className="listing-date">Submitted {listing.submittedDate}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {selectedListing && (
            <div className="listing-details">
              <Card title="Listing Details" padding="medium">
                <div className="detail-content">
                  <img
                    src={selectedListing.images[0]}
                    alt={selectedListing.title}
                    className="detail-image"
                  />

                  <div className="detail-info">
                    <h2>{selectedListing.title}</h2>
                    <p className="detail-location">📍 {selectedListing.location}</p>
                    <p className="detail-price">${selectedListing.price}/month</p>

                    <div className="detail-meta">
                      <div className="detail-meta-item">
                        <span className="label">Type:</span>
                        <span className="value">{selectedListing.type}</span>
                      </div>
                      <div className="detail-meta-item">
                        <span className="label">Owner:</span>
                        <span className="value">{selectedListing.owner}</span>
                      </div>
                      <div className="detail-meta-item">
                        <span className="label">Submitted:</span>
                        <span className="value">{selectedListing.submittedDate}</span>
                      </div>
                    </div>

                    <div className="detail-description">
                      <h3>Description</h3>
                      <p>{selectedListing.description}</p>
                    </div>

                    <div className="detail-actions">
                      <Button
                        onClick={() => handleApprove(selectedListing.id)}
                        variant="success"
                        size="large"
                      >
                        ✓ Approve Listing
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedListing.id)}
                        variant="danger"
                        size="large"
                      >
                        ✗ Reject Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
