import { ApiUrl, Token } from "@/components/Storage/Storage";
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
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import { IOrganizationProject } from "../utils/utils";
import { Skeleton } from "@/components/ui/skeleton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Assign from "./ActionAspect/Assign";
import Unassign from "./ActionAspect/Unassign";
import { visibility } from "@/components/function/visibility";
import DeleteProject from "./ActionAspect/DeleteProject";
import Loader from "@/components/loader";

const OrganizationProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isvisible = visibility();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { organizationId } = useParams<{ organizationId: string }>();

  // Default filters
  let progressFilter: string | null = null;
  let complexityFilter: string | null = null;
  let isAssignedFilter: string | null = null;

  const searchParams = new URLSearchParams(location.search);
  progressFilter = searchParams.get("progress");
  complexityFilter = searchParams.get("complexity");
  isAssignedFilter = searchParams.get("isAssigned");

  const [projects, setProjects] = useState<IOrganizationProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  const generateUrl = () => {
    const params = new URLSearchParams();
    if (progressFilter) params.append("progress", progressFilter);
    if (complexityFilter) params.append("complexity", complexityFilter);
    if (isAssignedFilter) params.append("isAssigned", isAssignedFilter);

    return `${ApiUrl}/organization=${organizationId}/get/projects?${params.toString()}`;
  };

  const getProjects = async () => {
    try {
      const res = await Axios.get(generateUrl(), {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (res.status === 200) {
        setProjects(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      alert("can't load data at the moment");
    }
  };

  const handleFilterChange = (
    filterType: "progress" | "complexity" | "isAssigned",
    value: string
  ) => {
    const params = new URLSearchParams();
    if (filterType === "progress") {
      params.set("progress", value);
    } else if (progressFilter) {
      params.set("progress", progressFilter);
    }

    if (filterType === "complexity") {
      params.set("complexity", value);
    } else if (complexityFilter) {
      params.set("complexity", complexityFilter);
    }

    if (filterType === "isAssigned") {
      params.set("isAssigned", value);
    } else if (isAssignedFilter) {
      params.set("isAssigned", isAssignedFilter);
    }

    navigate(`/organization/${organizationId}/projects?${params.toString()}`);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      <div>
        <div>
          {isLoading ? (
            <Loader />
          ) : projects.length < 1 ? (
            <div className="h-[200px] content-center">
              <div className="flex flex-row justify-center">
                <div>
                  <span>
                    <h2 className="font-serif">
                     There are no projects in the organization!!
                    </h2>
                  </span>
                  <div className="flex justify-center">
                    {" "}
                    click here -{" "}
                    <Button
                      variant="link"
                      className="h-6 font-serif pl-2 underline text-md"
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/create-project`
                        );
                      }}
                    >Create Project</Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-3">
              <div className="border-2">
                <div className="flex justify-between items-center p-4 md:hidden">
                  <h2 className="text-lg font-medium">Search</h2>
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  >
                    {isCollapsed ? "Expand" : "Collapse"}
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ${
                    isCollapsed ? "max-h-0" : "max-h-[500px]"
                  } md:max-h-full`}
                >
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-2">
                    <div className="flex flex-auto flex-wrap md:flex-nowrap gap-2 ">
                      <Select
                        onValueChange={(value) => {
                          handleFilterChange("progress", value);
                        }}
                      >
                        <SelectTrigger className="w-full md:w-36 p-2 rounded">
                          <SelectValue placeholder="Filter by progress" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="Todo">Todo</SelectItem>
                            <SelectItem value="InProcess">
                              In Progress
                            </SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Select
                        onValueChange={(value) =>
                          handleFilterChange("complexity", value)
                        }
                      >
                        <SelectTrigger className="w-full md:w-40 p-2 rounded">
                          <SelectValue placeholder="filter by Complexity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Complexity</SelectLabel>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* item filter */}
                      <Select
                        onValueChange={(value) =>
                          handleFilterChange("isAssigned", value)
                        }
                      >
                        <SelectTrigger className="w-full md:w-24 p-2 rounded">
                          <SelectValue placeholder="Assigned" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-end gap-3">
                      {/* <a href=`/organization/${organizationId}/home`> */}
                      <Button
                        onClick={() => {
                          navigate(
                            `/organization/${organizationId}/create-project`
                          );
                        }}
                      >
                        <Plus />
                        Add Project
                      </Button>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"></div>
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center"></div>
                      </th>
                      <th scope="col" className="px-6 py-3 2xl:w-[400px] lg:w-[250px] md:w-[400px]">
                        Title
                      </th>{" "}
                      {!isvisible ? (
                        <></>
                      ) : (
                        <th scope="col" className=" px-6 py-3 w-1/3">
                          Overview
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3">
                        Assigned
                      </th>
                      {!isvisible ? (
                        <></>
                      ) : (
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                      )}
                      <th scope="col" className="px-1 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, index) => (
                      <tr className="border-b" key={project.id}>
                        <td className="w-4 p-4">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">{project.name}</td>
                        {!isvisible ? (
                          <></>
                        ) : (
                          <td className="px-6 py-4">
                            {project.overview.length >= 30
                              ? project.overview.substring(0, 27) + "..."
                              : project.overview.length < 1
                              ? "No content"
                              : project.overview}
                          </td>
                        )}

                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {project.assignedTo !== null
                              ? project.assignedTo
                              : "None"}
                          </div>
                        </td>
                        {!isvisible ? (
                          <></>
                        ) : (
                          <td className="px-6 py-4">{project.progress}</td>
                        )}
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="size-px">
                                <MoreHorizontal />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[150px]"
                            >
                              <DropdownMenuGroup>
                                {project.assignedTo !== null ? (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                      >
                                        Unassign
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <Unassign
                                      groupProjectId={project.id}
                                      assignedId={project.assignedGroupId}
                                      assignedGroupName={project.assignedTo}
                                    />
                                  </Dialog>
                                ) : (
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                      >
                                        Assign To
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                    <Assign
                                      projectName={project.name}
                                      projectId={project.id}
                                    />
                                  </Dialog>
                                )}

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onSelect={(e) => e.preventDefault()}
                                    >
                                      Delete
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DeleteProject projectId={project.id} />
                                </Dialog>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationProjects;
