import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesState } from '../../types';
import { fetchArticles, fetchArticleById } from './articlesThunks';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, SORT_OPTIONS } from '../../constants';

const initialState: ArticlesState = {
  articles: [],
  currentArticle: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  searchQuery: '',
  sortBy: SORT_OPTIONS.NEWEST,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = DEFAULT_PAGE;
      state.articles = [];
    },
    setSortBy: (state, action: PayloadAction<typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]>) => {
      state.sortBy = action.payload;
      state.currentPage = DEFAULT_PAGE;
      state.articles = [];
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearArticles: (state) => {
      state.articles = [];
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch articles';
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to fetch article';
      });
  },
});

export const {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
  clearCurrentArticle,
  clearError,
  clearArticles,
} = articlesSlice.actions;

export default articlesSlice.reducer;