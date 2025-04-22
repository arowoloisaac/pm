"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { deleteTask } from "../api/issue-api";

const DeleteTask = () => {
  const { projectId, issueId } = useParams<{
    projectId: string | any;
    issueId: string | any;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const [selected, setSelected] = useState<string>("");

  const handleCheckboxChange = (checked: boolean) => {
    setIsSelected(checked);
  };

  useEffect(() => {
    handleCheckboxChange;
  }, [isSelected, selected]);
  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task. Choose between deleting
            the task or with its children.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <Label htmlFor="terms" className=" col-span-1">
              Delete Children
            </Label>{" "}
            <Select
              onValueChange={(val) => {
                setSelected(val);
                setIsSelected(true);
              }}
            >
              <SelectTrigger className="w-[280px] col-span-2">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Options</SelectLabel>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={!isSelected}
            onClick={async (e: any) => {
              const response = await deleteTask(
                e,
                projectId,
                issueId,
                selected
              );

              if (response.status === 200) {
                toast({
                  title: "Action Status ",
                  description: "task successfully deleted",
                });
navigate(`/project/${projectId}/overview/issues`)
              } else {
                toast({
                  variant: "destructive",
                  title: "Action Status",
                  description: JSON.stringify(response.response.data) ,
                });
                // window.location.reload();
              }
            }}
          >
            Delete Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default DeleteTask;
