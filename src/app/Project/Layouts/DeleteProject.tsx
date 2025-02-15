"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject } from "../api-functions/project-api";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const DeleteProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    handleCheckboxChange;
  }, [isChecked]);

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Project </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this project. Changes can not be
            reversed when clicked.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <div className="flex justify-end">
              <Checkbox id="terms" onCheckedChange={handleCheckboxChange} />
            </div>
            <Label htmlFor="terms" className="col-span-3">
              I agree with the terms
            </Label>{" "}
          </div>
        </div>
        <DialogFooter>
          {isChecked ? (
            <Button
              variant="destructive"
              onClick={async (e: any) => {
                const statusCode = await deleteProject(e, projectId);

                 if (statusCode === 200) {
                   toast({
                     title: "Action Status ",
                     description: "Project successfully deleted",
                   });

                   navigate(`/project`);
                 } else {
                   toast({
                     variant: "destructive",
                     title: "Action Status",
                     description:
                       "Unable to Delete Project, due to system error ",
                   });
                   window.location.reload();
                 }
              }}
            >
              Delete Project
            </Button>
          ) : (
            <Button variant="destructive" disabled>
              Delete Project
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default DeleteProject;
