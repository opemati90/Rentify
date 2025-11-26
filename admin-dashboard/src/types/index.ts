export type AdminRole = 'super_admin' | 'moderator' | 'viewer';

export type ListingStatus = 'pending' | 'approved' | 'rejected' | 'flagged';

export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending_verification';

export type ReportStatus = 'open' | 'investigating' | 'resolved' | 'dismissed';

export type ReportType = 'inappropriate_content' | 'fraud' | 'spam' | 'harassment' | 'other';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  createdAt: Date;
  lastLogin: Date;
  twoFactorEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  status: UserStatus;
  verified: boolean;
  trustScore: number;
  joinedAt: Date;
  lastActive: Date;
  listingsCount: number;
  bookingsCount: number;
  avatar?: string;
}

export interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  status: ListingStatus;
  userId: string;
  userName: string;
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  images: string[];
  type: string;
  flagCount: number;
}

export interface Report {
  id: string;
  type: ReportType;
  status: ReportStatus;
  reportedBy: string;
  reportedUserId?: string;
  reportedListingId?: string;
  description: string;
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
  severity: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingVerifications: number;
  totalListings: number;
  pendingListings: number;
  approvedListings: number;
  rejectedListings: number;
  openReports: number;
  resolvedReports: number;
  revenue: number;
  userGrowth: number;
  listingGrowth: number;
}

export interface ActivityLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetType: 'user' | 'listing' | 'report';
  targetId: string;
  timestamp: Date;
  details?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface FilterOptions {
  status?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  searchQuery?: string;
}
