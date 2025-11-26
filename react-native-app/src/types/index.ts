export type PropertyType = 'Apartment' | 'House' | 'Villa' | 'Studio' | 'Room' | 'Duplex';

export type UserRole = 'renter' | 'owner' | 'admin';

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
  // Sublet-specific fields
  availableFrom: string;
  availableTo: string;
  minLeaseDuration: number; // in months
  maxLeaseDuration: number;
  roommates: number;
  utilitiesIncluded: boolean;
  furnished: boolean;
  depositRequired: number;
  featured: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Host {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  responseTime: string;
  trustScore: number;
  email?: string;
  phone?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  verified: boolean;
  trustScore: number;
  role: UserRole;
  joinDate: string;
  listings: string[];
  bookings: string[];
  phone?: string;
  bio?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  senderAvatar: string;
  propertyId: string;
  propertyTitle: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Filter {
  priceRange: [number, number];
  propertyTypes: PropertyType[];
  beds: number | null;
  baths: number | null;
  availableFrom: string | null;
  availableTo: string | null;
  minLease: number | null;
  maxLease: number | null;
  furnished: boolean | null;
  utilitiesIncluded: boolean | null;
  maxRoommates: number | null;
}

export interface Booking {
  id: string;
  propertyId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  verified: boolean;
}

export type RootStackParamList = {
  Welcome: undefined;
  Auth: { mode: 'signup' | 'login' };
  Verification: undefined;
  Tutorial: undefined;
  MainTabs: undefined;
  PropertyDetail: { property: Property };
  CreateListing: undefined;
  Messages: undefined;
  Chat: { conversationId: string };
  AdminDashboard: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Saved: undefined;
  MessagesTab: undefined;
  Profile: undefined;
};
