export interface Station {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  description: string;
  tagline: string | null;
  stream_url: string;
  stream_url_high: string | null;
  stream_url_low: string | null;
  genre: string;
  sub_genres: string[];
  language: string;
  country: string | null;
  listener_count: number;
  is_active: boolean;
  is_featured: boolean;
  social_media: Record<string, string>;
  created_at: string;
  updated_at: string;
  programs?: Program[];
}

export interface Program {
  id: number;
  station_id: number;
  name: string;
  slug: string;
  description: string;
  host_name: string;
  host_bio: string | null;
  host_avatar: string | null;
  artwork_url: string | null;
  genre: string | null;
  schedule: Record<string, string[]>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  station_name?: string;
  station_slug?: string;
  station_logo?: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_id: number | null;
  author_name?: string;
  author_avatar?: string;
  category_id: number | null;
  category_name?: string;
  category_slug?: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface SongRequest {
  station_id: number;
  song_name: string;
  artist_name?: string;
  message?: string;
  requester_name?: string;
  requester_email?: string;
}

export interface Shoutout {
  station_id: number;
  name: string;
  message: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject?: string;
  message: string;
  type?: 'general' | 'advertising' | 'partnership' | 'technical' | 'other';
}
