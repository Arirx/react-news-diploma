import React, { useState, useEffect } from 'react';
import { UI_TEXTS } from '../../constants';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialValue = '',
  placeholder = UI_TEXTS.SEARCH_PLACEHOLDER,
}) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {query && (
          <button type="button" onClick={handleClear} className={styles.searchClear}>
            ×
          </button>
        )}
      </div>
      <button type="submit" className={styles.searchButton}>
        {UI_TEXTS.SEARCH_BUTTON}
      </button>
    </form>
  );
};