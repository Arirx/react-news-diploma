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
      };

      if (sortBy) {
        params.order = sortBy;
        console.log('Adding sort parameter:', sortBy);
      }

      if (searchQuery) {
        console.log('Searching by title:', searchQuery);
        const result = await spaceflightApi.searchArticles(searchQuery, params);
        console.log('Search results:', result.results.length);
        return result;
      }

      console.log('Fetching articles with params:', params);
      const result = await spaceflightApi.getArticles(params);
      console.log('Articles loaded:', result.results.length);
      return result;
    } catch (error) {
      console.error('Error fetching articles:', error);
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FETCH_ARTICLES;
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (id: number, { rejectWithValue }) => {
    try {
      console.log('Fetching article by ID:', id);
      const article = await spaceflightApi.getArticleById(id);
      return article;
    } catch (error) {
      console.error('Error fetching article:', error);
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.FETCH_ARTICLE;
      return rejectWithValue(errorMessage);
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
      };

      if (sortBy) {
        params.order = sortBy;
      }

      console.log('Searching articles by title with params:', { searchQuery, ...params });
      const result = await spaceflightApi.searchArticles(searchQuery, params);
      console.log('Search result, articles count:', result.results.length);
      return result;
    } catch (error) {
      console.error('Error searching articles:', error);
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.SEARCH_ARTICLES;
      return rejectWithValue(errorMessage);
    }
  }
);