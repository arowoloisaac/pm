import { ApiUrl, Token } from "@/components/Storage/Storage";
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
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    overview: "",
    description: "",
    complexity: "",
  });

  const [getComplexity, setComplexity] = useState<string>("");

  const data = {
    name: formData.name,
    overview: formData.overview,
    description: formData.description,
    complexity: getComplexity,
  };

   const handleChange = (field: string, value: string) => {
     setFormData((prev) => ({ ...prev, [field]: value }));
   };

   const handleCreateProject = (event: any) => {
     event.preventDefault();
     Axios.post(`${ApiUrl}/project/create`, data, {
       headers: {
         Authorization: `Bearer ${Token}`,
       },
     })
       .then((res) => {
         if (res.status === 200) {
           navigate("/");
           window.location.reload();
         }
       })
       .catch((ex) => {
         console.log(ex);
       });
   };


  return (
    <div>
      <Card className="max-w-full">
        <CardHeader>
          <CardTitle>Edit Project Details</CardTitle>
          <CardDescription>
            Edit project details in one-click.
          </CardDescription>
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
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="overview">Overview</Label>
                <Input
                  id="overview"
                  placeholder="A little overview of the project"
                  onChange={(e) => handleChange("overview", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  rows={3}
                  placeholder="Write the description of the project here"
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Choose Complexity</Label>
                <Select onValueChange={setComplexity}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Complex">Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <a href="/">
            <Button variant="destructive">Cancel</Button>
          </a>

          <Button onClick={handleCreateProject}>Create Project</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditProject;
