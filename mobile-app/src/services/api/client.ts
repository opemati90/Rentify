import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
const TIMEOUT = 10000;
const TOKEN_KEY = '@rentify_auth_token';

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  client.interceptors.request.use(
    async (config) => {
      const token = await getStoredToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await handleUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const getStoredToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const setStoredToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const removeStoredToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
};

const handleUnauthorized = async (): Promise<void> => {
  await removeStoredToken();
  // Navigate to login screen - implementation depends on navigation setup
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
