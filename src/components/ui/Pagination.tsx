import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "./Button";
import { cn } from "./utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className,
}: PaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate start and end of visible range
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, currentPage + halfVisible);

      // Adjust if we're near the beginning or end
      if (currentPage <= halfVisible) {
        end = maxVisiblePages;
      } else if (currentPage > totalPages - halfVisible) {
        start = totalPages - maxVisiblePages + 1;
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("ellipsis");
        }
      }

      // Add visible pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("ellipsis");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageClick = (pageNumber: number) => {
    if (
      pageNumber !== currentPage &&
      pageNumber >= 1 &&
      pageNumber <= totalPages
    ) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    onPageChange(1);
  };

  const handleLast = () => {
    onPageChange(totalPages);
  };

  return (
    <nav
      className={cn("flex items-center justify-center space-x-1", className)}
      aria-label="Pagination"
    >
      {/* First page button */}
      {showFirstLast && currentPage > 1 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleFirst}
          aria-label="Go to first page"
          className="px-2"
        >
          First
        </Button>
      )}

      {/* Previous button */}
      {showPrevNext && (
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
          className="px-2"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
      )}

      {/* Page numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <div
                key={`ellipsis-${index}`}
                className="flex items-center justify-center w-8 h-8"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
                <span className="sr-only">More pages</span>
              </div>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <Button
              key={page}
              variant={isCurrentPage ? "primary" : "outline"}
              size="sm"
              onClick={() => handlePageClick(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isCurrentPage ? "page" : undefined}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next button */}
      {showPrevNext && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
          className="px-2"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      )}

      {/* Last page button */}
      {showFirstLast && currentPage < totalPages && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleLast}
          aria-label="Go to last page"
          className="px-2"
        >
          Last
        </Button>
      )}
    </nav>
  );
}

export { Pagination };
