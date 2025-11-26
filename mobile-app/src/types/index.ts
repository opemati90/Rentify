export type PropertyType = 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Room' | 'Duplex';

export interface Host {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  responseTime: string;
  trustScore: number;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  host: Host;
  amenities: string[];
  description: string;
  images: string[];
  availableFrom: string;
  availableTo: string;
  minLeaseDuration: number;
  maxLeaseDuration: number;
  roommates: number;
  utilitiesIncluded: boolean;
  furnished: boolean;
  depositRequired: number;
  featured: boolean;
}
