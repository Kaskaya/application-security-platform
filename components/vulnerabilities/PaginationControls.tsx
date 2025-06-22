import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const PaginationControls: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-6 text-sm">
      <span className="text-gray-400 ml-1">Total {totalCount} Records</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="flex items-center justify-center h-9 w-9 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-default hover:bg-gray-600 transition-colors cursor-pointer "
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-gray-400 font-medium">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isLoading}
          className="flex items-center justify-center h-9 w-9 bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-default hover:bg-gray-600 transition-colors cursor-pointer "
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
