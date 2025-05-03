"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { useQueryState, parseAsInteger } from "nuqs";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductsPaginationProps {
  refetchProducts: () => Promise<void>;
}

export default function ProductsPagination({
  refetchProducts,
}: ProductsPaginationProps) {
  const [offset, setOffset] = useQueryState(
    "offset",
    parseAsInteger.withDefault(1),
  );

  const handleOffsetChange = (value: number) => {
    setOffset(value);
    setTimeout(() => {
      refetchProducts();
    }, 300);
  }

  return (
    <Pagination className="pb-4">
      <PaginationContent>
        {offset > 1 && (
          <>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => handleOffsetChange(offset - 1)}
                disabled={offset === 0}
              >
                <ChevronLeft className="size-4" >Previous</ChevronLeft>
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant={"outline"}
                onClick={() => handleOffsetChange(offset - 1)}
                disabled={offset === 0}
              >
                {offset - 1}
              </Button>
            </PaginationItem>
          </>
          )}
        <PaginationItem>
          <Button
            variant={"outline"}
            disabled
          >
            {offset}
          </Button>          
        </PaginationItem>
        {offset <= 1 && (
          <>
            <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => handleOffsetChange(offset + 1)}
            >
              {offset + 1}
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => handleOffsetChange(offset + 1)}
              disabled={offset === 0}
            >
              <ChevronRight className="size-4" >Next</ChevronRight>
            </Button>
          </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>

  )
}