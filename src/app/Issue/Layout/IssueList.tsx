
import { Button } from "@/components/ui/button";

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BookOpen,
  BookX,
  Brush,
  Bug,
  Check,
  Code,
  LayoutList,
  ListTodo,
  MoreHorizontal,
  School,
  TestTubeDiagonal,
} from "lucide-react";
import { IIssue } from "@/app/Issue/utils/utils";
import { visibility } from '@/components/function/visibility';


const IssueList = ({
  items,
  projectId,
}: {
  items: IIssue[];
  projectId: any;
}) => {
  const isVisible = visibility();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right">
            Project: {projectId}
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse the list of your project based on the issue type,
              complexity and progress.
            </p>
          </caption>
        </table>

        <div className="container mx-auto border-2 px-4 py-4">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table className="border-collapse border">
              <TableHeader className="">
                <TableRow className="items-center">
                  <TableHead className="">#</TableHead>
                  <TableHead className="lg:w-[600px] 2xl:w-[1000px]">
                    Title
                  </TableHead>

                  <TableHead className="text-center">Type</TableHead>
                  {isVisible ? (
                    <>
                      {" "}
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Priority</TableHead>
                    </>
                  ) : (
                    <></>
                  )}

                  <TableHead className=" text-right">
                    <span className="sr-only">Edit</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((issue, index) => (
                  <TableRow className="h-14" key={issue.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{issue.name}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-1 justify-center">
                        {
                          {
                            Task: <LayoutList size={18} />,
                            Design: <Brush size={18} />,
                            Test: <TestTubeDiagonal size={18} />,
                            Documentation: <BookOpen size={18} />,
                            Bug: <Bug />,
                            Code: <Code />,
                          }[issue.issueType]
                        }{" "}
                        {issue.issueType}
                      </div>
                    </TableCell>

                    {isVisible ? (
                      <>
                        <TableCell>
                          <div className="flex gap-1 justify-center">
                            {
                              {
                                Todo: <ListTodo size={18} />,
                                InProcess: <School size={18} />,
                                Done: <Check size={18} />,
                                Cancelled: <BookX size={18} />,
                              }[issue.progress]
                            }
                            {issue.progress}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 justify-center">
                            {
                              {
                                Easy: <ArrowDown size={18} />,
                                Medium: <ArrowRight size={18} />,
                                Complex: <ArrowUp size={18} />,
                              }[issue.complexity]
                            }
                            {issue.complexity}
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <></>
                    )}

                    <TableCell className=" text-right">
                      <div className="self-start">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-[1px]">
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[150px]"
                          >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueList