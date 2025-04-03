import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useStorePagination } from "@/hooks/useStore";

export const PaginationComponent = () => {
  const { page, increasePage, decreasePage, reset } = useStorePagination();

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={decreasePage} href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis onClick={reset} href="#"/>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={increasePage} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
