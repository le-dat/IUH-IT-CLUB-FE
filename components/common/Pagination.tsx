import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  itemName: string;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  itemName,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* <p className="text-sm text-muted-foreground whitespace-nowrap">
        {startIndex + 1}-{endIndex} of {totalItems} {itemName}
      </p> */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm px-2">
          Trang {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
