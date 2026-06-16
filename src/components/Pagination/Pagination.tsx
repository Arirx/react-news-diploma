import React from 'react';
import { MAX_VISIBLE_PAGES, PAGINATION_RANGE, UI_TEXTS } from '../../constants';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const pages: number[] = [];
  let startPage = Math.max(1, currentPage - PAGINATION_RANGE);
  let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        {UI_TEXTS.PREVIOUS}
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={styles.paginationButton}>
            1
          </button>
          {startPage > 2 && <span className={styles.paginationEllipsis}>…</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.paginationButton} ${page === currentPage ? styles.active : ''}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className={styles.paginationEllipsis}>…</span>}
          <button onClick={() => onPageChange(totalPages)} className={styles.paginationButton}>
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        {UI_TEXTS.NEXT}
      </button>
    </div>
  );
};