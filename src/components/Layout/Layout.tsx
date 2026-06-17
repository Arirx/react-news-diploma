import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            🚀 Spaceflight News
          </Link>
          <nav className={styles.nav}>
            <Link 
              to={ROUTES.HOME} 
              className={`${styles.navLink} ${location.pathname === ROUTES.HOME ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link 
              to={ROUTES.ARTICLE_MANAGEMENT} 
              className={`${styles.navLink} ${location.pathname === ROUTES.ARTICLE_MANAGEMENT ? styles.active : ''}`}
            >
              Article Management
            </Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2024 Spaceflight News. Data provided by Spaceflight News API</p>
        </div>
      </footer>
    </div>
  );
};