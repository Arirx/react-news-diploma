import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchArticleById } from '../../store/articles/articlesThunks';
import { clearCurrentArticle } from '../../store/articles/articlesSlice';
import { ROUTES, DATE_FORMAT_OPTIONS, UI_TEXTS, ERROR_MESSAGES } from '../../constants';
import styles from './ArticlePage.module.css';

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentArticle, isLoading, error } = useAppSelector((state) => state.articles);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(parseInt(id)));
    }

    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>{UI_TEXTS.LOADING}</p>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className={styles.errorContainer}>
        <h2>{UI_TEXTS.ERROR_TITLE}</h2>
        <p>{error || ERROR_MESSAGES.NOT_FOUND}</p>
        <Link to={ROUTES.HOME} className={styles.backButton}>
          {UI_TEXTS.BACK_TO_HOME}
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(currentArticle.published_at).toLocaleDateString(
    'en-US',
    DATE_FORMAT_OPTIONS
  );

  return (
    <div className={styles.articlePage}>
      <button onClick={handleGoBack} className={styles.backButton}>
        ← {UI_TEXTS.BACK_TO_HOME}
      </button>

      <article className={styles.article}>
        <div className={styles.articleImage}>
          <img src={currentArticle.image_url} alt={currentArticle.title} />
        </div>

        <div className={styles.articleContent}>
          <div className={styles.articleMeta}>
            <span className={styles.articleSource}>{currentArticle.news_site}</span>
            <span className={styles.articleDate}>{formattedDate}</span>
          </div>

          <h1 className={styles.articleTitle}>{currentArticle.title}</h1>

          <div className={styles.articleSummary}>
            <p>{currentArticle.summary}</p>
          </div>

          {currentArticle.authors && currentArticle.authors.length > 0 && (
            <div className={styles.articleAuthors}>
              <h3>Authors</h3>
              <ul>
                {currentArticle.authors.map((author, index) => (
                  <li key={index}>
                    <span className={styles.authorName}>{author.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentArticle.launches.length > 0 && (
            <div className={styles.articleLaunches}>
              <h3>Launches</h3>
              <ul>
                {currentArticle.launches.map((launch) => (
                  <li key={launch.launch_id}>
                    <span className={styles.launchId}>{launch.launch_id}</span>
                    <span className={styles.launchProvider}>{launch.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentArticle.events.length > 0 && (
            <div className={styles.articleEvents}>
              <h3>Events</h3>
              <ul>
                {currentArticle.events.map((event) => (
                  <li key={event.id}>
                    <span className={styles.eventId}>{event.id}</span>
                    <span className={styles.eventProvider}>{event.provider}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.articleLink}>
            <a 
              href={currentArticle.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.readMoreLink}
            >
              Read full article →
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};