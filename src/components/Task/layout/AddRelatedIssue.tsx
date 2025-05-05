import "../utils/styles.css";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { useParams } from "react-router-dom";
import { IIssue } from "../utils/utils";

const AddRelatedIssue = () => {
  const { projectId, issueId } = useParams();
  const [getTasks, setTasks] = useState<IIssue[]>([]);

  const [getSelected, setSelected] = useState<string | null>(null);

  console.log(getSelected);

  const handleGetTasks = async () => {
    try {
      const response = await Axios.get(
        `${ApiUrl}/project=${projectId}/default`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      setTasks(response.data);
    } catch (err: any) {
      alert(err.response.data);
    }
  };

  const handleAddRelated = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const req = await Axios.post(
        `${ApiUrl}/project=${projectId}/origin=${issueId}/related=${getSelected}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(req);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetTasks();
  }, []);

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Add Related Issue</DialogTitle>
        <DialogDescription>
          Add Related issue to this issue here
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Related Task
          </Label>
          <Select onValueChange={(val: string) => setSelected(val)}>
            <SelectTrigger className="w-[330px]">
              <SelectValue placeholder="Add Task" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tasks</SelectLabel>
                {getTasks.map((tsk) => (
                  <SelectItem value={tsk.id}>
                    {tsk.name.slice(0, 50)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={(e: React.MouseEvent) => {
            handleAddRelated(e);
          }}
          disabled={getSelected === null}
        >
          Add Issue
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddRelatedIssue;
