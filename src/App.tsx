import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { ArticlePage } from './pages/ArticlePage/ArticlePage';
import { ArticleManagementPage } from './pages/ArticleManagementPage/ArticleManagementPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { ROUTES } from './constants';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ARTICLE} element={<ArticlePage />} />
          <Route path={ROUTES.ARTICLE_MANAGEMENT} element={<ArticleManagementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;