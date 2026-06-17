import { SORT_OPTIONS } from '../constants';

export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: Event[];
  authors?: Author[];
}

export interface Author {
  name: string;
  socials: {
    x?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    mastodon?: string;
    bluesky?: string;
  } | null;
}

export interface Launch {
  launch_id: string;
  provider: string;
}

export interface Event {
  id: string;
  provider: string;
}

export interface ArticleFormData {
  title: string;
  summary: string;
  image_url: string;
  news_site: string;
  url: string;
}

export type CreateArticleData = Omit<Article, 'id'>;

export interface GetArticlesParams {
  limit?: number;
  offset?: number;
  search?: string;
  title_contains?: string;
  order?: string;
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

export interface ModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  articleId?: number;
}