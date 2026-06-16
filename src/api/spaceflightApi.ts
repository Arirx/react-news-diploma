import axios, { AxiosError } from 'axios';
import { Article, ApiResponse, GetArticlesParams } from '../types';
import { API_BASE_URL, API_TIMEOUT, ERROR_MESSAGES } from '../constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('URL:', error.config?.url);
    } else if (error.request) {
      console.error('Network Error:', ERROR_MESSAGES.NETWORK_ERROR);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const spaceflightApi = {
  getArticles: async (params: GetArticlesParams = {}): Promise<ApiResponse<Article>> => {
    const { data } = await api.get<ApiResponse<Article>>('/articles', { params });
    return data;
  },

  getArticleById: async (id: number): Promise<Article> => {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  },

  searchArticles: async (search: string, params: GetArticlesParams = {}): Promise<ApiResponse<Article>> => {
    const { data } = await api.get<ApiResponse<Article>>('/articles', {
      params: { ...params, search },
    });
    return data;
  },
};