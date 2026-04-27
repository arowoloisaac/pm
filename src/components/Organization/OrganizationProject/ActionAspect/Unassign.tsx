import { ApiUrl, Token } from "@/components/Storage/Storage";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Unassign = ({
  groupProjectId,
  assignedId,
  assignedGroupName,
}: {
  groupProjectId: string;
  assignedId: string;
  assignedGroupName: string;
}) => {
  const { organizationId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleUnassignGroup = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const req = await Axios.put(
      `${ApiUrl}/organization=${organizationId}/group=${assignedId}/unassign/project=${groupProjectId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    if (req.status === 200) {
      toast({
        title: "Group Unassigned ",
        description: req.data,
      });
      navigate(`/organization/${organizationId}/projects`);
      window.location.reload();
    } else {
      alert(req.data);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Unassign Group</DialogTitle>
        <DialogDescription>
          When a group is unassign from a project.{" "}
          <span className="text-red-400">
            All info relating to the project will be removed.
          </span>
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Group:
          </Label>
          <h4 className="w-[280px]">{assignedGroupName}</h4>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={(event) => {
            handleUnassignGroup(event);
          }}
          variant="destructive"
        >
          Revoke
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default Unassign;
