import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface IPaginationProps {
  page: number;
  increasePage?: () => void;
  decreasePage: () => void;
  reset: () => void;
}

export const PaginationComponent: React.FC<IPaginationProps> = ({
  page,
  increasePage,
  decreasePage,
  reset,
}) => {
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
            <PaginationEllipsis onClick={reset} href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={increasePage} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};
