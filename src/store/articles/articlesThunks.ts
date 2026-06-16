import { createAsyncThunk } from '@reduxjs/toolkit';
import { spaceflightApi } from '../../api/spaceflightApi';
import { GetArticlesParams } from '../../types';
import { RootState } from '../index';
import { ERROR_MESSAGES } from '../../constants';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { currentPage, pageSize, searchQuery, sortBy } = state.articles;
      
      const params: GetArticlesParams = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        ordering: sortBy,
      };

      if (searchQuery) {
        const result = await spaceflightApi.searchArticles(searchQuery, params);
        return result;
      }

      const result = await spaceflightApi.getArticles(params);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || ERROR_MESSAGES.FETCH_ARTICLES);
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: number, { rejectWithValue }) => {
    try {
      const article = await spaceflightApi.getArticleById(id);
      return article;
    } catch (error: any) {
      return rejectWithValue(error.message || ERROR_MESSAGES.FETCH_ARTICLE);
    }
  }
);

export const searchArticles = createAsyncThunk(
  'articles/searchArticles',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { currentPage, pageSize, searchQuery, sortBy } = state.articles;
      
      const params: GetArticlesParams = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
        ordering: sortBy,
      };

      const result = await spaceflightApi.searchArticles(searchQuery, params);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || ERROR_MESSAGES.SEARCH_ARTICLES);
    }
  }
);