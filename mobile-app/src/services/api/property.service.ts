import { Property } from '@rentify/shared/types';
import { API_ENDPOINTS } from '@rentify/shared/constants';
import { get, post, put, del } from './client';

interface PropertyFilters {
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  location?: string;
}

export const getProperties = async (filters?: PropertyFilters): Promise<Property[]> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
  }

  const url = `${API_ENDPOINTS.PROPERTIES.LIST}?${params.toString()}`;
  return get<Property[]>(url);
};

export const getPropertyById = async (id: string): Promise<Property> => {
  return get<Property>(API_ENDPOINTS.PROPERTIES.DETAIL(id));
};

export const createProperty = async (data: Partial<Property>): Promise<Property> => {
  return post<Property>(API_ENDPOINTS.PROPERTIES.CREATE, data);
};

export const updateProperty = async (id: string, data: Partial<Property>): Promise<Property> => {
  return put<Property>(API_ENDPOINTS.PROPERTIES.UPDATE(id), data);
};

export const deleteProperty = async (id: string): Promise<void> => {
  return del(API_ENDPOINTS.PROPERTIES.DELETE(id));
};
