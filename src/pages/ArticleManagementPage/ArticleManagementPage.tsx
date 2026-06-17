import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addArticle, updateArticle, deleteArticle } from '../../store/articles/articlesSlice';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { ArticleModal } from '../../components/ArticleModal/ArticleModal';
import { Article, ArticleFormData } from '../../types';
import styles from './ArticleManagementPage.module.css';

export const ArticleManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.articles);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const handleCreate = (): void => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (article: Article): void => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      dispatch(deleteArticle(id));
    }
  };

  const handleSubmit = (data: ArticleFormData): void => {
    if (editingArticle) {
      dispatch(updateArticle({
        ...editingArticle,
        ...data,
      }));
    } else {
      const newArticle = {
        title: data.title,
        summary: data.summary,
        image_url: data.image_url,
        news_site: data.news_site,
        url: data.url,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        featured: false,
        launches: [],
        events: [],
        authors: [{ name: 'Admin', socials: null }],
      };
      dispatch(addArticle(newArticle));
    }
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
    setEditingArticle(null);
  };

  const localArticles = articles.filter((a: Article) => a.id >= 10000);

  return (
    <div className={styles.managementPage}>
      <div className={styles.header}>
        <h1>Article Management</h1>
        <button onClick={handleCreate} className={styles.createButton}>
          + Create New Article
        </button>
      </div>

      <div className={styles.stats}>
        <p>Total articles: <strong>{articles.length}</strong></p>
        <p>Local articles: <strong>{localArticles.length}</strong></p>
        <p>API articles: <strong>{articles.length - localArticles.length}</strong></p>
      </div>

      <div className={styles.articlesList}>
        {localArticles.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No local articles yet. Create your first one!</p>
            <p className={styles.emptyStateSub}>Click the "Create New Article" button above to get started.</p>
          </div>
        ) : (
          <div className={styles.articlesGrid}>
            {localArticles.map((article: Article) => (
              <div key={article.id} className={styles.articleCard}>
                <div className={styles.articleImage}>
                  <img src={article.image_url} alt={article.title} />
                </div>
                <div className={styles.articleInfo}>
                  <h3>{article.title}</h3>
                  <p className={styles.articleSummary}>{article.summary.slice(0, 100)}...</p>
                  <div className={styles.articleMeta}>
                    <span className={styles.newsSite}>{article.news_site}</span>
                    <span className={styles.date}>
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.articleActions}>
                    <button 
                      onClick={() => handleEdit(article)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ArticleModal isOpen={isModalOpen} onClose={handleCancel}>
        <ArticleForm
          initialData={editingArticle}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEdit={!!editingArticle}
        />
      </ArticleModal>
    </div>
  );
};