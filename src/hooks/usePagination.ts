import { useState, useCallback } from "react";

type PaginationStateProps = {
  currentPage: number;
  pageSize: number;
  setCurrentPage: (page: number) => void;
  goToFirstPage: () => void;
};

/**
 * Hook for managing pagination state locally
 * Keeps pagination separate from persistent filter state
 */
export function usePagination(initialPageSize = 10): PaginationStateProps {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(initialPageSize);

  const setCurrentPageCallback = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    pageSize,
    setCurrentPage: setCurrentPageCallback,
    goToFirstPage,
  };
}
