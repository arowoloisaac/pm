import { useEffect, useState } from "react";
import { IIssue } from "../utils/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddRelatedIssue from "./AddRelatedIssue";
import { subIssueList } from "../api/issue-api";

const RelatedTaskList = () => {
  const navigate = useNavigate();
  const { projectId, issueId } = useParams<{
    projectId: string | any;
    issueId: string | any;
  }>();
  const [getSubIssues, setSubIssues] = useState<IIssue[]>([]);

  const fetchSubs = async () => {
    const data = await subIssueList(projectId, issueId);
    data ? setSubIssues(data) : null;
  };
  useEffect(() => {
    fetchSubs();
  }, []);

  console.log(getSubIssues, setSubIssues);
  return (
    <>
      {getSubIssues.length < 1 ? (
        <div className="h-[200px] content-center">
          <div className="flex flex-row justify-center">
            <div>
              <span>
                <h2 className="font-serif">
                  The task does have any relationship(s) !!
                </h2>
              </span>
              <div className="flex justify-center">
                {" "}
                click here -  {" "}
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <h5 className="italic font-serif pl-2 underline"> Add related task</h5>
                    </DialogTrigger>
                    <AddRelatedIssue />
                  </Dialog>
                </div>
                {/* Add related task */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-7">
            <div className="flex justify-between">
              <h2 className="font-bold mt-3">Related Tasks</h2>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="italic font-serif">Add related</Button>
                  </DialogTrigger>
                  <AddRelatedIssue />
                </Dialog>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSubIssues.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium w-1.5">
                    {index + 1}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      navigate(`/project/${projectId}/overview/issue/${item.id}`);
                    }}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive">delete</Button>
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

export default RelatedTaskList;
