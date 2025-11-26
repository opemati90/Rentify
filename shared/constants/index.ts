export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFY: '/auth/verify',
    LOGOUT: '/auth/logout'
  },
  PROPERTIES: {
    LIST: '/properties',
    DETAIL: (id: string) => `/properties/${id}`,
    CREATE: '/properties',
    UPDATE: (id: string) => `/properties/${id}`,
    DELETE: (id: string) => `/properties/${id}`
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile',
    LISTINGS: '/users/listings'
  },
  MESSAGES: {
    LIST: '/messages',
    SEND: '/messages',
    CONVERSATION: (id: string) => `/messages/conversation/${id}`
  }
};

export const PROPERTY_TYPES = [
  { value: 'Apartment', label: 'Apartment', icon: '🏢' },
  { value: 'House', label: 'House', icon: '🏡' },
  { value: 'Villa', label: 'Villa', icon: '🏰' },
  { value: 'Duplex', label: 'Duplex', icon: '🏘️' },
  { value: 'Studio', label: 'Studio', icon: '🏬' },
  { value: 'Room', label: 'Room', icon: '🛏️' }
] as const;

export const AMENITIES = [
  'Wifi',
  'Kitchen',
  'Parking',
  'Gym',
  'Pool',
  'Workspace',
  'AC',
  'Heater',
  'Laundry',
  'Balcony',
  'Garden',
  'Terrace'
] as const;

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  REQUIRED_FIELD: 'This field is required',
  INVALID_PRICE: 'Please enter a valid price',
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  NETWORK_ERROR: 'Network error. Please try again',
  UNAUTHORIZED: 'Please log in to continue'
};
