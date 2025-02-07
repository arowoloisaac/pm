import { useEffect, useState } from "react";
import { IIssue } from "../utils/utils";
import { subIssueList } from "../api-function/issue-api";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SubIssue = () => {
  const [getSubIssues, setSubIssues] = useState<IIssue[]>([]);

  const fetchSubs = async () => {
    const data = await subIssueList(
      "881a3f46-050d-4449-94a2-1a8eccc4e715",
      "674f4bb4-62c8-42cc-8d7b-2dedc062d1a9"
    );

    data ? setSubIssues(data) : null;
  };
  useEffect(() => {
    fetchSubs();
  }, []);

  console.log(getSubIssues);
  return (
    <>
      <Table>
        <TableBody>
          {getSubIssues.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium w-1.5">{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-right">
                <div className="pt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-[1px]">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[150px]">
                      {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Assign to</DropdownMenuItem>
                        <DropdownMenuItem>Set due date</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Apply label
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent className="p-0"></DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default SubIssue;
