import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  withCredentials: true,
});

// Export strongly typed request helpers
export const get = <T>(url: string) => api.get<T>(url);
export const post = <T>(url: string, data?: any) => api.post<T>(url, data);
export const patch = <T>(url: string, data?: any) => api.patch<T>(url, data);
export const del = (url: string) => api.delete(url);
