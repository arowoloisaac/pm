import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPaginate } from "../Project/utils/utils";
import { useState } from "react";

const PaginationComp = ({
  item,
  fetchItem,
  handlePageChange,
}: {
  item?: IPaginate;
  fetchItem: (page: number) => void;
  handlePageChange: (page: number) => void;
}) => {
  const [getNumber, setNumber] = useState<number>(item?.current ?? 1);

  const handleForward = async () => {
    if (getNumber < (item?.count || 1)) {
      const nextPage = getNumber + 1;
      setNumber(nextPage);
      fetchItem(nextPage);
      handlePageChange(nextPage);
    }
  };

  const handleBackward = async () => {
    if (getNumber > 1) {
      const prevPage = getNumber - 1;
      setNumber(prevPage);
      fetchItem(prevPage);
      handlePageChange(prevPage);
    }
  };

  return (
    <div className="-end">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>
              <Button onClick={handleBackward} disabled={getNumber === 1}>
                <ChevronLeft />
              </Button>
            </PaginationLink>
          </PaginationItem>
          <PaginationItem className="px-2">
            {item?.start || 0} - {item?.end || 0}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>
              <Button
                onClick={handleForward}
                disabled={getNumber >= (item?.count || 1)}
              >
                <ChevronRight />
              </Button>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComp;
