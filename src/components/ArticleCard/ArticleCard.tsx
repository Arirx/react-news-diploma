import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types';
import { ROUTES, DATE_FORMAT_OPTIONS, SUMMARY_MAX_LENGTH } from '../../constants';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    'en-US',
    DATE_FORMAT_OPTIONS
  );

  const truncatedSummary = article.summary.length > SUMMARY_MAX_LENGTH
    ? `${article.summary.slice(0, SUMMARY_MAX_LENGTH)}...`
    : article.summary;

  return (
    <Link to={ROUTES.ARTICLE_BY_ID(article.id)} className={styles.articleCard}>
      <div className={styles.articleCardImage}>
        <img src={article.imageUrl} alt={article.title} />
      </div>
      <div className={styles.articleCardContent}>
        <div className={styles.articleCardMeta}>
          <span className={styles.articleCardSource}>{article.newsSite}</span>
          <span className={styles.articleCardDate}>{formattedDate}</span>
        </div>
        <h3 className={styles.articleCardTitle}>{article.title}</h3>
        <p className={styles.articleCardSummary}>{truncatedSummary}</p>
      </div>
    </Link>
  );
};