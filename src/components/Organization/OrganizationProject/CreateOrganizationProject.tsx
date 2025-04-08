import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getOrganizationGroup } from "../api/api";
import { IOrganizationGroup } from "../utils/utils";

const CreateOrganizationProject = () => {
  const { organizationId } = useParams();
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

  let getGroupFilter: string | null = null;

  const generateUrl = () => {
    const param = new URLSearchParams();
    if (getGroupFilter) param.append(getGroupId, getGroupFilter);

    return `${ApiUrl}/organization/${organizationId}/create-project?${param.toString()}`;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProject = (event: any) => {
    event.preventDefault();
    Axios.post(generateUrl(), data, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          navigate(`/organization/${organizationId}/projects`);
          window.location.reload();
        }
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  //   to fetch groups under this organization
  const [getGroupId, setGroupId] = useState<string>("")
  const [getGroups, setGroups] = useState<IOrganizationGroup[]>([])
  const fetchOrganizationGroup = async () => {
    try {
        const response = await getOrganizationGroup(organizationId)
        response ? setGroups(response) : null
    } catch (error:any) {
        console.log(error)
    }
  };

  useEffect(() => {
    fetchOrganizationGroup()
  }, [location.pathname])

  return (
    <Card className="max-w-full">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
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
            <div className="flex flex-row gap-4">
              <div className="basis-1/2">
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
              <div className="basis-1/2">
                <Label htmlFor="framework">Select Group</Label>
                <Select onValueChange={setGroupId}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Groups</SelectLabel>
                      {getGroups.length < 1 ? (
                        <SelectLabel>No Created Group</SelectLabel>
                      ) : (
                        getGroups.map((grp) => (
                          <SelectItem value={grp.id}>
                            {grp.name.substring(0,15)}
                          </SelectItem>
                        ))
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
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
  );
};

export default CreateOrganizationProject;
