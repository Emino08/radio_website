import axios from 'axios';
import type { Station, Program, Article, ArticleCategory, SongRequest, Shoutout, ContactMessage } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Stations
export const getStations = async (params?: { genre?: string; search?: string; featured?: boolean }) => {
  const { data } = await api.get<{ success: boolean; data: Station[] }>('/stations', { params });
  return data.data;
};

export const getStation = async (slug: string) => {
  const { data } = await api.get<{ success: boolean; data: Station }>(`/stations/${slug}`);
  return data.data;
};

export const getGenres = async () => {
  const { data } = await api.get<{ success: boolean; data: string[] }>('/stations/genres');
  return data.data;
};

export const incrementListener = async (id: number) => {
  await api.post(`/stations/${id}/listen`);
};

export const decrementListener = async (id: number) => {
  await api.post(`/stations/${id}/stop`);
};

// Programs
export const getPrograms = async (stationId?: number) => {
  const { data } = await api.get<{ success: boolean; data: Program[] }>('/programs', {
    params: stationId ? { station_id: stationId } : undefined,
  });
  return data.data;
};

export const getProgram = async (slug: string) => {
  const { data } = await api.get<{ success: boolean; data: Program }>(`/programs/${slug}`);
  return data.data;
};

// Articles
export const getArticles = async (params?: { category?: string; limit?: number; offset?: number }) => {
  const { data } = await api.get<{
    success: boolean;
    data: Article[];
    pagination: { total: number; limit: number; offset: number };
  }>('/articles', { params });
  return data;
};

export const getArticle = async (slug: string) => {
  const { data } = await api.get<{ success: boolean; data: Article }>(`/articles/${slug}`);
  return data.data;
};

export const getFeaturedArticles = async (limit = 3) => {
  const { data } = await api.get<{ success: boolean; data: Article[] }>('/articles/featured', {
    params: { limit },
  });
  return data.data;
};

export const getArticleCategories = async () => {
  const { data } = await api.get<{ success: boolean; data: ArticleCategory[] }>('/articles/categories');
  return data.data;
};

// Requests
export const createSongRequest = async (request: SongRequest) => {
  const { data } = await api.post<{ success: boolean; message: string; id: number }>(
    '/song-requests',
    request
  );
  return data;
};

export const createShoutout = async (shoutout: Shoutout) => {
  const { data } = await api.post<{ success: boolean; message: string; id: number }>(
    '/shoutouts',
    shoutout
  );
  return data;
};

export const submitContact = async (message: ContactMessage) => {
  const { data } = await api.post<{ success: boolean; message: string; id: number }>(
    '/contact',
    message
  );
  return data;
};

export default api;
