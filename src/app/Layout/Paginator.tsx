import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPaginate } from "../Project/utils";
// Button.setAttribute;
const PaginationComp = ({item}: {item? : IPaginate}) => {

    console.log(item?.start)
  return (
    <>
      
      <div className="justify-end ">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>
                <Button>
                  <ChevronLeft />
                </Button>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="px-2">{item?.start.toString()}-{item?.end}</PaginationItem>
            <PaginationItem>
              <PaginationLink>
                <Button>
                  <ChevronRight />
                </Button>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};


export default PaginationComp