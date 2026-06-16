import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, UI_TEXTS } from '../../constants';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.errorTitle}>Page Not Found</h2>
      <p className={styles.errorDescription}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to={ROUTES.HOME} className={styles.homeLink}>
        {UI_TEXTS.BACK_TO_HOME}
      </Link>
    </div>
  );
};