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
import { IPaginate, IProject } from "./utils";
import ProjectLayout from "../Layout/project-layout";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import PaginationComp from "../Layout/Paginator";

const Project = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [projects, getProjects] = useState<IProject[]>([]);

  const [getPaginations, setPaginations] = useState<IPaginate>();

  const getProject = async () => {
    await Axios.get(`${ApiUrl}/project/get`, {
      headers: { Authorization: `Bearer ${Token}` },
    })
      .then((res) => {
        getProjects(res.data.projects);
        setPaginations(res.data.pagination);
      })
      .catch((ex) => console.log(ex.Message));
  };

  useEffect(() => {
    getProject();
  }, [Token]);

  return (
    <>
      <div className="w-full ">
        <div className="container mx-auto  px-4  pb-4">
          <div className="py-1">
            <div className="border border-gray-300 ">
              <div className="flex justify-between items-center bg-gray-200 p-4 md:hidden">
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
                    <Select>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-300 rounded">
                        <SelectValue placeholder="Filter by progress" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Progress</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-300 rounded">
                        <SelectValue placeholder="filter by Complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Complexity</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <Button className="w-full md:w-auto px-4 py-2 rounded">
                      Search
                    </Button>

                    <Button>
                      <Plus />
                      Add Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            <div className="grid max-[500px]:grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
              <ProjectLayout items={projects} />
            </div>
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          <div className="container mx-auto  border-2 px-4 py-4">
            <div className="flex flex-auto flex-row">
              <div className="flex-1  justify-start">
                <p className="pt-2">Projects: {getPaginations?.totalItems}</p>
              </div>
              <PaginationComp item={getPaginations} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
