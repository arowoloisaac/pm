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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganization } from "../api/api";
import { useToast } from "@/hooks/use-toast";

const CreateOrganization = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const data = {
    name: formData.name,
    description: formData.description,
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateOrganization = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const response = await createOrganization(event, data);

    if (response.status === 200) {
      toast({
        title: "Organization has been created ",
      });
      const id = response.data

      navigate(`/organization/${id}`);
    } else {
      toast({
        title: "Error creating organization ",
        description: response.response.data,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Organization</DialogTitle>
        <DialogDescription>
          Click create when you're done to add the organization.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            onChange={(val) => handleChange("name", val.target.value)}
            placeholder="Ozon Education"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Overview
          </Label>
          <Input
            id="description"
            onChange={(val) => handleChange("description", val.target.value)}
            placeholder="overview of organization"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleCreateOrganization}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateOrganization;
