import React from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeleteProject = ({projectId}: {projectId:string}) => {
  const { organizationId } = useParams();
  const { toast } = useToast();

  const handleDeleteProject = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const req = await Axios.delete(
      `${ApiUrl}/organization=${organizationId}/delete/project=${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    if (req.status === 200) {
      toast({
        title: "project has been deleted",
      });

      window.location.reload();
    } else {
      toast({
        title: "Unable to delete project",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Unassign Group</DialogTitle>
          <DialogDescription>
           A deleted project and its contents can not retrieved
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter>
          <Button
            onClick={(event) => {
              handleDeleteProject(event);
            }}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default DeleteProject;
