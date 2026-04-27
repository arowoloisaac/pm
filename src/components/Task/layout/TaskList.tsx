import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
  Brush,
  Bug,
  Code,
  FeatherIcon,
  LayoutList,
  MoreHorizontal,
  TestTubeDiagonal,
} from "lucide-react";
import { IIssue } from "@/components/Task/utils/utils";
import { visibility } from "@/components/function/visibility";
import { useNavigate, useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DeleteTask from "./DeleteTask";

const IssueList = ({ items }: { items: IIssue[] }) => {
  const { projectId } = useParams<{
    projectId: string | any;
  }>();

  const navigate = useNavigate();
  const isVisible = visibility();

  const handleClick = (id: string) => {
    navigate(`/project/${projectId}/overview/issue/${id}`);
  };


  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right">
            Your Tasks
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse the list of your project based on the issue type,
              complexity and progress.
            </p>
          </caption>
        </table>

        <div className="container mx-auto border-x-2 px-4 py-4">
          <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
            <Table className="border-collapse border">
              <TableHeader className="">
                <TableRow className="items-center">
                  <TableHead className="">#</TableHead>
                  <TableHead className="lg:w-[500px] 2xl:w-[750px]">
                    Title
                  </TableHead>

                  <TableHead className="text-center ">Type</TableHead>
                  {isVisible ? (
                    <>
                      {" "}
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center ">Priority</TableHead>
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
                    <TableCell
                      className="font-medium"
                      onClick={() => {
                        handleClick(issue.id);
                      }}
                    >
                      {issue.name}
                    </TableCell>
                    <TableCell className="">
                      <div className="flex gap-1 justify-center">
                        {
                          {
                            Task: <LayoutList size={18} />,
                            Research: <Brush size={18} />,
                            Incident: <TestTubeDiagonal size={18} />,
                            Documentation: <BookOpen size={16} />,
                            Bug: <Bug size={18} />,
                            Improvement: <Code size={18} />,
                            Feature: <FeatherIcon size={18} />,
                          }[issue.issueType]
                        }{" "}
                        {issue.issueType}
                      </div>
                    </TableCell>

                    {isVisible ? (
                      <>
                        <TableCell>
                          <div className="flex gap-1 justify-center">
                            <Progress value={issue.issueLevel} />
                            {/* {
                              {
                                Todo: <ListTodo size={18} />,
                                InProcess: <School size={18} />,
                                Done: <Check size={18} />,
                                Cancelled: <BookX size={18} />,
                              }[issue.progress]
                            }
                            {issue.progress} */}
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
                            <DropdownMenuGroup>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onSelect={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DeleteTask issueId={issue.id} />
                                {/* <Unassign
                                  groupProjectId={project.id}
                                  assignedId={project.assignedGroupId}
                                  assignedGroupName={project.assignedTo}
                                /> */}
                              </Dialog>
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

export default IssueList;
