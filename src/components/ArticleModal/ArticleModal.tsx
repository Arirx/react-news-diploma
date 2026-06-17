import React, { useEffect } from 'react';
import styles from './ArticleModal.module.css';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};