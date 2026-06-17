import React, { useState, useEffect } from 'react';
import { Article, ArticleFormData } from '../../types';
import styles from './ArticleForm.module.css';

interface ArticleFormProps {
  initialData?: Article | null;
  onSubmit: (data: ArticleFormData) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    summary: '',
    image_url: '',
    news_site: '',
    url: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        summary: initialData.summary || '',
        image_url: initialData.image_url || '',
        news_site: initialData.news_site || '',
        url: initialData.url || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required';
    }
    if (!formData.news_site.trim()) {
      newErrors.news_site = 'News site is required';
    }
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!formData.url.startsWith('http')) {
      newErrors.url = 'URL must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.articleForm}>
      <h2>{isEdit ? 'Edit Article' : 'Create New Article'}</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter article title"
          className={errors.title ? styles.error : ''}
        />
        {errors.title && <span className={styles.errorMessage}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="summary">Summary*</label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Enter article summary"
          rows={4}
          className={errors.summary ? styles.error : ''}
        />
        {errors.summary && <span className={styles.errorMessage}>{errors.summary}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image_url">Image URL*</label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className={errors.image_url ? styles.error : ''}
        />
        {errors.image_url && <span className={styles.errorMessage}>{errors.image_url}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="news_site">News Site*</label>
        <input
          type="text"
          id="news_site"
          name="news_site"
          value={formData.news_site}
          onChange={handleChange}
          placeholder="e.g., NASA, SpaceX, SpaceNews"
          className={errors.news_site ? styles.error : ''}
        />
        {errors.news_site && <span className={styles.errorMessage}>{errors.news_site}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="url">URL*</label>
        <input
          type="url"
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="https://example.com/article"
          className={errors.url ? styles.error : ''}
        />
        {errors.url && <span className={styles.errorMessage}>{errors.url}</span>}
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {isEdit ? 'Update Article' : 'Create Article'}
        </button>
      </div>
    </form>
  );
};