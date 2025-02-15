import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
import { IPaginate, IProject } from "./utils/utils";
import ProjectLayout from "./Layouts/ProjectLayout";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import PaginationComp from "../Layout/Paginator";
import { useParams, useNavigate } from "react-router-dom";

const Project = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [progressFilter, setProgressFilter] = useState<string>("");
  const [complexityFilter, setComplexityFilter] = useState<string>("");
  const [itemPerPageFilter, setItemPerPageFilter] = useState<string>("");

  const generateUrl = (page = 1) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    // params.append("itemPerPage", "4");
    if (progressFilter) params.append("progress", progressFilter);
    if (complexityFilter) params.append("complexity", complexityFilter);
    if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);

    return `${ApiUrl}/project/get?${params.toString()}`;
  };

  const [projects, setProjects] = useState<IProject[]>([]);
  const [getPaginations, setPaginations] = useState<IPaginate>();
  console.log(projects);

  const getProject = async (page = 1) => {
    try {
      const res = await Axios.get(generateUrl(page), {
        headers: { Authorization: `Bearer ${Token}` },
      });
      if (res.status === 200) {
        setIsLoading(false);
        setProjects(res.data.projects);
        setPaginations(res.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/project/${newPage}`); // Navigate to the new page
  };

  useEffect(() => {
    const currentPage = page ? parseInt(page) : 1;
    getProject(currentPage);
  }, [Token, progressFilter, complexityFilter, itemPerPageFilter, page]);

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
                    <Select onValueChange={setProgressFilter}>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-400 rounded">
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

                    <Select onValueChange={setComplexityFilter}>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-400 rounded">
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
                    <Select onValueChange={setItemPerPageFilter}>
                      <SelectTrigger className="w-full md:w-20 p-2 border border-gray-400 rounded">
                        <SelectValue placeholder="Items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Complexity</SelectLabel>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="12">12</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <a href="project/create">
                      <Button>
                        <Plus />
                        Add Project
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            <ProjectLayout items={projects} isLoading={isLoading} />
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          {Number(getPaginations?.totalItems) < 1 ? (
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
