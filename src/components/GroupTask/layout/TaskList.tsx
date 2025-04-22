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
  Brush,
  Bug,
  Code,
  LayoutList,
  MoreHorizontal,
  TestTubeDiagonal,
} from "lucide-react";
import { visibility } from "@/components/function/visibility";
import { useNavigate, useParams } from "react-router-dom";
import { IIssue } from "../utils/utils";
import { Progress } from "@/components/ui/progress";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { useToast } from "@/hooks/use-toast";

const TaskList = ({ items }: { items: IIssue[] }) => {
  const { projectId, organizationId, groupId } = useParams<{
    projectId: string | any;
    organizationId: string | any;
    groupId: string | any;
  }>();
  const navigate = useNavigate();
  const isVisible = visibility();
  const { toast } = useToast();

  const handleClick = (id: string) => {
    navigate(
      `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${id}`
    );
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, issueId: string) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(
        `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      response.status === 200
        ? toast({
            title: "Deleted successfully",
            variant: "default",
          })
        : toast({
            title: "An error occur while deleting",
            variant: "destructive",
          });
    } catch (error: any) {
      alert("Unable to delete task");
    }
  };

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
                  <TableHead className="lg:w-[400px] 2xl:w-[600px]">
                    Title
                  </TableHead>
                  <TableHead className="text-center">Assigned</TableHead>
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
                  <TableRow
                    className="h-14"
                    key={issue.id}
                    onClick={() => {
                      handleClick(issue.id);
                    }}
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{issue.name}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex gap-1 justify-center">
                        {issue.assignedTo}
                      </div>
                    </TableCell>

                    {isVisible ? (
                      <>
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
                              <DropdownMenuItem>Assign to</DropdownMenuItem>
                              <DropdownMenuItem>Set due date</DropdownMenuItem>
                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={(event: any) => {}}
                                className="text-red-600"
                              >
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

export default TaskList;
