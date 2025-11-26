import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
const TIMEOUT = 10000;

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.request.use(
    (config) => {
      const token = getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        handleUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const getStoredToken = (): string | null => {
  // Implementation depends on storage solution
  return null;
};

const handleUnauthorized = (): void => {
  // Clear token and redirect to login
};

export const apiClient = createApiClient();

export const get = <T>(url: string, config?: AxiosRequestConfig) =>
  apiClient.get<T>(url, config).then(res => res.data);

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  apiClient.post<T>(url, data, config).then(res => res.data);

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
  apiClient.put<T>(url, data, config).then(res => res.data);

export const del = <T>(url: string, config?: AxiosRequestConfig) =>
  apiClient.delete<T>(url, config).then(res => res.data);
