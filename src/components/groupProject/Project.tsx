// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import PaginationComp from "../Layout/Paginator";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ProjectList from "./layout/ProjectList";
import { IPaginate } from "../../components/Project/utils/utils";

const Project = () => {
  const { organizationId, groupId } = useParams();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const [isLoading, setIsLoading] = useState(true);

  const params = pathSegments.slice(5);

  let progressFilter: string | null = null;
  let complexityFilter: string | null = null;
  let currentPage = 1;
  let itemPerPageFilter: string | null = null;

  if (params.length === 0) {
  } else if (params.length === 1) {
    if (!isNaN(Number(params[0]))) {
      currentPage = Number(params[0]);
    } else {
      progressFilter = params[0];
    }
  } else if (params.length === 2) {
    if (!isNaN(Number(params[0]))) {
      currentPage = Number(params[0]);
      itemPerPageFilter = params[1];
    } else {
      progressFilter = params[0];
      if (!isNaN(Number(params[1]))) {
        currentPage = Number(params[1]);
      } else {
        complexityFilter = params[1];
      }
    }
  } else if (params.length === 3) {
    if (!isNaN(Number(params[1]))) {
      progressFilter = params[0];
      currentPage = Number(params[1]);
      itemPerPageFilter = params[2];
    } else {
      progressFilter = params[0];
      complexityFilter = params[1];
      if (!isNaN(Number(params[2]))) {
        currentPage = Number(params[2]);
      }
    }
  } else if (params.length >= 4) {
    progressFilter = params[0];
    complexityFilter = params[1];
    if (!isNaN(Number(params[2]))) {
      currentPage = Number(params[2]);
    }
    itemPerPageFilter = params[3];
  }

  const [projects, setProjects] = useState<any[]>([]);
  const [getPaginations, setPaginations] = useState<IPaginate | any>({});

  const generateUrl = () => {
    const params = new URLSearchParams();

    params.append("page", currentPage.toString());
    if (progressFilter) params.append("progress", progressFilter);
    if (complexityFilter) params.append("complexity", complexityFilter);
    if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);
    return `${ApiUrl}/organization=${organizationId}/group=${groupId}/get/projects?${params.toString()}`;
  };

  const getProject = async () => {
    try {
      const res = await Axios.get(generateUrl(), {
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (res.status === 200) {
        setIsLoading(false);
        setProjects(res.data.projects);
        setPaginations(res.data.pagination);
      }
    } catch (error) {
      alert(`Error fetching projects: ${error}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    const segments = ["projects"];
    if (progressFilter) segments.push(progressFilter);
    if (complexityFilter) segments.push(complexityFilter);
    segments.push(newPage.toString());
    if (itemPerPageFilter) segments.push(itemPerPageFilter);
    navigate(
      `/organization/${organizationId}/group/${groupId}/${segments.join("/")}`
    );
  };

  const handleFilterChange = (
    filterType: "progress" | "complexity" | "itemPerPage",
    value: string
  ) => {
    const newProgress = filterType === "progress" ? value : progressFilter;
    const newComplexity =
      filterType === "complexity" ? value : complexityFilter;
    const newItemPerPage =
      filterType === "itemPerPage" ? value : itemPerPageFilter;

    const segments = ["projects"];
    if (newProgress) segments.push(newProgress);
    if (newComplexity) segments.push(newComplexity);
    segments.push(currentPage.toString());
    if (newItemPerPage) segments.push(newItemPerPage);

    navigate(
      `/organization/${organizationId}/group/${groupId}/${segments.join("/")}`
    );
  };

  useEffect(() => {
    getProject();
  }, [location.pathname]);

  return (
    <>
      <div className="w-full ">
        <div className="container mx-auto  px-4  pb-4">
          <div className="py-1">
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
                  <div className="flex flex-auto flex-wrap md:flex-nowrap gap-4 ">
                    <Select
                      onValueChange={(value) => {
                        handleFilterChange("progress", value);
                      }}
                    >
                      <SelectTrigger className="w-full md:w-44 p-2 rounded">
                        <SelectValue placeholder="Filter by progress" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Todo">Todo</SelectItem>
                          <SelectItem value="InProcess">In Progress</SelectItem>
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
                      <SelectTrigger className="w-full md:w-44 p-2 rounded">
                        <SelectValue placeholder="filter by Complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Complexity</SelectLabel>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Complex">Hard</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {/* item filter */}
                    {Number(getPaginations.totalItems) < 10 ? (
                      <span></span>
                    ) : (
                      <Select
                        onValueChange={(value) =>
                          handleFilterChange("itemPerPage", value)
                        }
                      >
                        <SelectTrigger className="w-full md:w-20 p-2 rounded">
                          <SelectValue placeholder="Items" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="14">14</SelectItem>
                            <SelectItem value="24">12</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            <ProjectList items={projects} isLoading={isLoading} />
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          {Number(getPaginations?.totalItems) < 1 || 8 ? (
            <span></span>
          ) : (
            <div className="container mx-auto  border-2 px-4 py-4">
              <div className="flex flex-auto flex-row">
                <div className="flex-1  justify-start">
                  <p className="pt-2">Projects: {getPaginations?.totalItems}</p>
                </div>
                <PaginationComp
                  item={getPaginations}
                  fetchItem={getProject}
                  handlePageChange={handlePageChange}
                />{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
