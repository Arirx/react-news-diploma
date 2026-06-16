import { SORT_OPTIONS } from '../constants';

export interface Article {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

export interface Launch {
  id: string;
  provider: string;
}

export interface Event {
  id: string;
  provider: string;
}

export interface GetArticlesParams {
  limit?: number;
  offset?: number;
  search?: string;
  ordering?: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ArticlesState {
  articles: Article[];
  currentArticle: Article | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  sortBy: typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS];
}