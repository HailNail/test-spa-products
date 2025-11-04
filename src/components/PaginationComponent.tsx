import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export function PaginationComponent({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationComponentProps) {
  return (
    <Pagination className="justify-center mt-6 hover:cursor-default">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className={
              currentPage === 1 ? "opacity-50 pointer-events-none" : ""
            }
          >
            Prev
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => setCurrentPage(page)}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className={
              currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
            }
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
