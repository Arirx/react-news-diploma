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
        params.search = searchQuery;
        console.log('Adding search parameter:', searchQuery);
      }

      console.log('Final params for API:', params);
      const result = await spaceflightApi.getArticles(params);
      console.log('API Response received, articles count:', result.results.length);
      return result;
    } catch (error: any) {
      console.error('Error fetching articles:', error);
      return rejectWithValue(error.message || ERROR_MESSAGES.FETCH_ARTICLES);
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
    } catch (error: any) {
      console.error('Error fetching article:', error);
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
        search: searchQuery,
      };

      if (sortBy) {
        params.order = sortBy;
      }

      console.log('Searching articles with params:', params);
      const result = await spaceflightApi.searchArticles(searchQuery, params);
      console.log('Search result, articles count:', result.results.length);
      return result;
    } catch (error: any) {
      console.error('Error searching articles:', error);
      return rejectWithValue(error.message || ERROR_MESSAGES.SEARCH_ARTICLES);
    }
  }
);