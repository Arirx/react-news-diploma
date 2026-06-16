import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchArticles } from '../../store/articles/articlesThunks';
import { setCurrentPage, setSearchQuery, setSortBy } from '../../store/articles/articlesSlice';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { Pagination } from '../../components/Pagination/Pagination';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { SORT_OPTIONS, SORT_LABELS, UI_TEXTS } from '../../constants';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, isLoading, error, totalCount, currentPage, pageSize, searchQuery, sortBy } =
    useAppSelector((state) => state.articles);
  
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedArticles = useMemo(() => {
    if (!articles.length) return [];
    
    const sorted = [...articles];
    switch (sortBy) {
      case SORT_OPTIONS.NEWEST:
        sorted.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        break;
      case SORT_OPTIONS.OLDEST:
        sorted.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        break;
      case SORT_OPTIONS.TITLE_ASC:
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SORT_OPTIONS.TITLE_DESC:
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    return sorted;
  }, [articles, sortBy]);

  useEffect(() => {
    console.log('Fetching articles with:', { currentPage, searchQuery, sortBy });
    dispatch(fetchArticles());
  }, [dispatch, currentPage, searchQuery, sortBy]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    console.log('Searching:', query);
    dispatch(setSearchQuery(query));
  };

  const handleSortChange = (sortOption: typeof SORT_OPTIONS[keyof typeof SORT_OPTIONS]) => {
    console.log('Changing sort to:', sortOption);
    dispatch(setSortBy(sortOption));
    setShowSortMenu(false);
  };

  console.log('Current state:', { articles: articles.length, sortBy, currentPage, searchQuery });

  if (isLoading && articles.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>{UI_TEXTS.LOADING}</p>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className={styles.errorContainer}>
        <h2>{UI_TEXTS.ERROR_TITLE}</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Spaceflight News</h1>
        <div className={styles.controls}>
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          
          <div className={styles.sortWrapper}>
            <button 
              className={styles.sortButton}
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              Sort: {SORT_LABELS[sortBy]} ▼
            </button>
            {showSortMenu && (
              <div className={styles.sortMenu}>
                {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                  <button
                    key={key}
                    className={`${styles.sortMenuItem} ${sortBy === value ? styles.active : ''}`}
                    onClick={() => handleSortChange(value)}
                  >
                    {SORT_LABELS[value]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {sortedArticles.length === 0 ? (
        <div className={styles.emptyState}>
          <p>{UI_TEXTS.NO_ARTICLES}</p>
        </div>
      ) : (
        <>
          <div className={styles.articlesGrid}>
            {sortedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};