import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article, ArticlesState, CreateArticleData } from '../../types';
import { fetchArticles, fetchArticleById, searchArticles } from './articlesThunks';
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

let localIdCounter = 10000;

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
    },
    setSortBy: (state, action: PayloadAction<typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]>) => {
      state.sortBy = action.payload;
      state.currentPage = DEFAULT_PAGE;
    },
    clearCurrentArticle: (state) => {
      state.currentArticle = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    
    addArticle: (state, action: PayloadAction<CreateArticleData>) => {
      const newArticle: Article = {
        id: localIdCounter++,
        ...action.payload,
      };
      state.articles = [newArticle, ...state.articles];
      state.totalCount += 1;
    },
    
    updateArticle: (state, action: PayloadAction<Article>) => {
      const index = state.articles.findIndex((a: Article) => a.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = {
          ...action.payload,
          updated_at: new Date().toISOString(),
        };
      }
      if (state.currentArticle?.id === action.payload.id) {
        state.currentArticle = {
          ...action.payload,
          updated_at: new Date().toISOString(),
        };
      }
    },
    
    deleteArticle: (state, action: PayloadAction<number>) => {
      state.articles = state.articles.filter((a: Article) => a.id !== action.payload);
      state.totalCount -= 1;
      if (state.currentArticle?.id === action.payload) {
        state.currentArticle = null;
      }
    },
    
    clearAllArticles: (state) => {
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
      })
      .addCase(searchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to search articles';
      });
  },
});

export const {
  setCurrentPage,
  setSearchQuery,
  setSortBy,
  clearCurrentArticle,
  clearError,
  addArticle,
  updateArticle,
  deleteArticle,
  clearAllArticles,
} = articlesSlice.actions;

export default articlesSlice.reducer;