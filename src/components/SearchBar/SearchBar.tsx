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
  const [query, setQuery] = useState<string>(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery.length >= 2) {
      onSearch(trimmedQuery);
    } else if (trimmedQuery.length === 0) {
      onSearch('');
    }
  };

  const handleClear = (): void => {
    setQuery('');
    onSearch('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
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