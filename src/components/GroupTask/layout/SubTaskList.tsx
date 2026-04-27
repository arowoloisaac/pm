import { useEffect, useState } from "react";
import { IIssue } from "../utils/utils";
// import { subIssueList } from "../api/issue-api";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useNavigate, useParams } from "react-router-dom";
import { subTaskList } from "../api/api";

const SubTaskList = () => {
  const navigate = useNavigate();
  const { projectId, issueId, organizationId, groupId } = useParams<{
    projectId: string | any;
    issueId: string | any;
    organizationId: string | any;
    groupId: string | any;
  }>();
  const [getSubIssues, setSubIssues] = useState<IIssue[]>([]);

  const fetchSubs = async () => {
    const data = await subTaskList(projectId, issueId, organizationId, groupId);

    data ? setSubIssues(data) : null;
  };
  useEffect(() => {
    fetchSubs();
  }, []);

  return (
    <>
      {getSubIssues.length < 1 ? (
        <div className="h-[200px] content-center">
          <div className="flex flex-row justify-center">
            <div>
              <span>
                <h2 className="font-serif">The task does have a child yet!!</h2>
              </span>
              <div className="flex justify-center">
                {" "}
                click here -{" "}
                <Button
                  onClick={() => {
                    navigate(
                      `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/create-child`
                    );
                  }}
                  variant="link"
                  className="h-6 font-serif pl-2 underline text-md"
                >
                  Create child
                </Button>
               
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className="">
              <div className="">
                <div className="flex justify-between">
                  <h2 className="font-bold mb-4">Child Task</h2>
                  <div>
                    <Button
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/create-child`
                        );
                      }}
                    >
                      Add Child
                    </Button>
                  </div>
                </div>

                <p>
                  This contains the list of child(ren) that belongs to the task
                </p>
              </div>
            </div>
          </div>
          <Table>
            <TableBody>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">id</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              {getSubIssues.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium w-1.5">
                    {index + 1}
                  </TableCell>
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
        </div>
      )}
    </>
  );
};

export default SubTaskList;
