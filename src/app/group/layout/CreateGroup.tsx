import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createGroup } from "../api/api";
import { useToast } from "@/hooks/use-toast";

const CreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { organizationId } = useParams<{organizationId: string}>();

  const [name, setGroupName] = useState<string>("")

  const data = {
    groupName: name
  }

  console.log(data.groupName)
  const createGrp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await createGroup(e, {data, organizationId});

    if (response.status === 200) {
      toast({
        title: "Group Created ",
        description: response.data,
      });
      navigate(`/organization/${organizationId}/groups`);
      window.location.reload()
    } else {
      toast({
        title: "Error creating group ",
        description: response.response.data,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    createGrp
  })

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Group</DialogTitle>
        <DialogDescription>
          Create organization group or team in this page. Click save when you're
          done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" placeholder="Frontend Team" onChange={e => setGroupName(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4"></div>
      </div>
      <DialogFooter>
        <Button onClick={createGrp}>Add Group</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateGroup;
