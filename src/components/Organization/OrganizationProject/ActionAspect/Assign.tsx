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
import { useEffect, useState } from "react";
import { getOrganizationGroup } from "../../api/api";
import { useParams } from "react-router-dom";
import { IOrganizationGroup } from "../../utils/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";

const Assign = ({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: string;
}) => {
  const { organizationId } = useParams();
  const { toast } = useToast();

  const [getGroups, setGroups] = useState<IOrganizationGroup[]>([]);
  const [isClicked, setIsClicked] = useState<string>("");

  const fetchGroups = async () => {
    const data = await getOrganizationGroup(organizationId);
    data ? setGroups(data) : null;
  };

  const handleAssignGroup = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const req = await Axios.put(
      `${ApiUrl}/organization=${organizationId}/group=${isClicked}/assign/project=${projectId}`, {}, {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      }
    );

    if (req.status === 200) {
      toast({
        title: "project assigned to group",
        description: req.data
      })

      window.location.reload()
    }
    else {
      toast({
        title: "Unable to assign project",
        variant:"destructive"
      });
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Assign Group</DialogTitle>
        <DialogDescription>
          Assign Project: "{projectName}" to any group within your organization
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Group
          </Label>
          <Select onValueChange={(value) => setIsClicked(value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Groups</SelectLabel>
                {getGroups.map((grp) => (
                  <SelectItem value={grp.id}>{grp.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={(event) => {
            handleAssignGroup(event);
          }}
          variant="secondary"
        >
          Assign
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default Assign;
