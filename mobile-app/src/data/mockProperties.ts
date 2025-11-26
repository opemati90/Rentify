import { Property } from '../types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'BF Brockly',
    location: 'Sibgong, Sylhet, UK',
    price: 1200,
    rating: 5.0,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    type: 'Apartment',
    beds: 4,
    baths: 5,
    sqft: 1200,
    host: {
      id: 'h1',
      name: 'Nelson Sajib',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      verified: true,
      responseTime: '< 1 hour',
      trustScore: 98
    },
    amenities: ['Wifi', 'Kitchen', 'Workspace', 'Parking', 'Gym', 'Pool'],
    description: 'Perfect for students and young professionals. Modern apartment with high-speed wifi.',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    availableFrom: '2025-01-15',
    availableTo: '2025-08-31',
    minLeaseDuration: 3,
    maxLeaseDuration: 8,
    roommates: 1,
    utilitiesIncluded: true,
    furnished: true,
    depositRequired: 1200,
    featured: true
  },
  {
    id: '2',
    title: 'Lovely Bird',
    location: 'Zindabazar, Sylhet, UK',
    price: 950,
    rating: 4.85,
    reviews: 65,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800',
    type: 'House',
    beds: 3,
    baths: 2,
    sqft: 980,
    host: {
      id: 'h2',
      name: 'Sarah Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      verified: true,
      responseTime: '< 2 hours',
      trustScore: 92
    },
    amenities: ['Wifi', 'Parking', 'Garden', 'Laundry'],
    description: 'Cozy house perfect for interns or students. Quiet neighborhood with backyard.',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800'
    ],
    availableFrom: '2025-02-01',
    availableTo: '2025-12-31',
    minLeaseDuration: 4,
    maxLeaseDuration: 11,
    roommates: 2,
    utilitiesIncluded: false,
    furnished: true,
    depositRequired: 950,
    featured: false
  },
  {
    id: '3',
    title: 'Downtown Studio',
    location: 'Manchester, UK',
    price: 650,
    rating: 4.75,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    type: 'Studio',
    beds: 1,
    baths: 1,
    sqft: 450,
    host: {
      id: 'h3',
      name: 'Mikael Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      verified: true,
      responseTime: '< 3 hours',
      trustScore: 85
    },
    amenities: ['Wifi', 'Gym Access', 'Dishwasher', 'Balcony'],
    description: 'Compact living in city center. Perfect for solo travelers. All utilities included.',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
    ],
    availableFrom: '2025-01-01',
    availableTo: '2025-06-30',
    minLeaseDuration: 2,
    maxLeaseDuration: 6,
    roommates: 0,
    utilitiesIncluded: true,
    furnished: true,
    depositRequired: 650,
    featured: true
  }
];
