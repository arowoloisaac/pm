// import { ApiUrl, Token } from "@/components/Storage/Storage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProject, projectDetail } from "../api-functions/project-api";
import { IProject } from "../utils/utils";
import { Token } from "@/components/Storage/Storage";
import { toast } from "@/hooks/use-toast";



const EditProject = () => {
 const [getDetails, setDetails] = useState<IProject | any>({});

 const fetchDetails = async (): Promise<any> => {
   const data = await projectDetail(projectId);
   data ? setDetails(data) : null;
 };

 enum ComplexityEnum {
   Easy = "Easy",
   Medium = "Medium",
   Complex = "Complex",
 }

 useEffect(() => {
   fetchDetails();
 }, [Token]);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    overview: "",
    description: "",
    complexity: "",
  });

  const [getComplexity, setComplexity] = useState<ComplexityEnum | null>(null);

  const data = {
    name: formData.name,
    overview: formData.overview,
    description: formData.description,
    complexity: getComplexity,
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async (e: any) => {
     var response = await editProject(e, { data, projectId });

     if (response.status === 200) {
      toast({
        title: "Project edited ",
        description: response.data,
      });
      navigate(`/project/${projectId}/overview/settings`);
     } else {
      toast({
        title: "Error ",
        description: response.data,
      });
     }
  };

  return (
    <div>
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>Edit Project Details</CardTitle>
          <CardDescription>Edit project details in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => {
                    handleChange("name", e.target.value);
                  }}
                  id="name"
                  placeholder="Name of your project"
                  defaultValue={getDetails.name}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="overview">Overview</Label>
                <Input
                  id="overview"
                  placeholder="A little overview of the project"
                  onChange={(e) => handleChange("overview", e.target.value)}
                  defaultValue={getDetails.overview}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  rows={3}
                  placeholder="Write the description of the project here"
                  onChange={(e) => handleChange("description", e.target.value)}
                  defaultValue={getDetails.description}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Choose Complexity</Label>
                <Select
                  onValueChange={(value) =>
                    setComplexity(value as ComplexityEnum)
                  }
                >
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select Complexity" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value={ComplexityEnum.Easy}>Easy</SelectItem>
                    <SelectItem value={ComplexityEnum.Medium}>
                      Medium
                    </SelectItem>
                    <SelectItem value={ComplexityEnum.Complex}>
                      Complex
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end pr-6">
          <Button onClick={handleEdit}>Update Project</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditProject;
