// API константы
export const API_BASE_URL = 'https://api.spaceflightnewsapi.net/v3';
export const API_TIMEOUT = 10000;

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

export const SORT_OPTIONS = {
  NEWEST: '-publishedAt',
  OLDEST: 'publishedAt',
  TITLE_ASC: 'title',
  TITLE_DESC: '-title',
} as const;

export const SORT_LABELS = {
  [SORT_OPTIONS.NEWEST]: 'Newest First',
  [SORT_OPTIONS.OLDEST]: 'Oldest First',
  [SORT_OPTIONS.TITLE_ASC]: 'Title A-Z',
  [SORT_OPTIONS.TITLE_DESC]: 'Title Z-A',
} as const;

export const MAX_VISIBLE_PAGES = 5;
export const PAGINATION_RANGE = 2;

export const SEARCH_DEBOUNCE_DELAY = 500;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as const;

export const SUMMARY_MAX_LENGTH = 150;

export const ROUTES = {
  HOME: '/',
  ARTICLE: '/article/:id',
  ARTICLE_BY_ID: (id: number | string) => `/article/${id}`,
  NOT_FOUND: '/404',
} as const;

export const ERROR_MESSAGES = {
  FETCH_ARTICLES: 'Failed to fetch articles. Please try again.',
  FETCH_ARTICLE: 'Failed to fetch article. Please try again.',
  SEARCH_ARTICLES: 'Failed to search articles. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  NOT_FOUND: 'Article not found.',
} as const;

export const UI_TEXTS = {
  SEARCH_PLACEHOLDER: 'Search articles...',
  SEARCH_BUTTON: 'Search',
  PREVIOUS: '← Previous',
  NEXT: 'Next →',
  NO_ARTICLES: 'No articles found',
  LOADING: 'Loading...',
  ERROR_TITLE: 'Error',
  BACK_TO_HOME: 'Back to Home',
} as const;