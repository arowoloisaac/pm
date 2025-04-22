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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IIssue } from "./utils/utils";
import TaskList from "./layout/TaskList";

const Task = () => {
  const navigate = useNavigate();
  const { projectId, organizationId, groupId } = useParams();
  const { page } = useParams<{ page: string }>();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [progressFilter, setProgressFilter] = useState<string>("");
  const [complexityFilter, setComplexityFilter] = useState<string>("");
  const [itemPerPageFilter, setItemPerPageFilter] = useState<string>("");

  const generateUrl = (page = 1) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (progressFilter) params.append("progress", progressFilter);
    if (complexityFilter) params.append("complexity", complexityFilter);
    if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);

    return `${ApiUrl}/organization=${organizationId}/group/${groupId}/projectId/${projectId}/issues/page?${params.toString()}`;
  };

  const [getIssues, setIssues] = useState<IIssue[]>([]);
  // const [getPaginations, setPaginations] = useState<IPaginate>();

  const fetchIssues = async (page = 1) => {
    await Axios.get(generateUrl(page), {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => setIssues(res.data.issues))
      .catch((ex) => console.log(ex));
  };

  useEffect(() => {
    const currentPage = page ? parseInt(page) : 1;
    fetchIssues(currentPage);
  }, [Token, progressFilter, complexityFilter, itemPerPageFilter, page]);

  const handleCreate = () => {
    navigate(
      `/organization/${organizationId}/group/${groupId}/project/${projectId}/create`
    );
  };

  return (
    <>
      {getIssues.length < 1 ? (
        <>
          {" "}
          <div className="h-96 content-center">
            <div className=" flex flex-row justify-center">
              <div>
                <span>
                  <h2 className="font-serif">No created tasks yet</h2>
                </span>
                <div className="flex justify-center">
                  {" "}
                  <a className="italic underline" onClick={handleCreate}>
                    Create Task
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-1">
            <div className="">
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
                    {getIssues.length < 10 ? (
                      <></>
                    ) : (
                      <>
                        {" "}
                        <Select onValueChange={setProgressFilter}>
                          <SelectTrigger className="w-[110px] md:w-44  p-2 ">
                            <SelectValue placeholder="Progress" />
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
                        <Select onValueChange={setComplexityFilter}>
                          <SelectTrigger className="w-[110px] md:w-44 p-2">
                            <SelectValue placeholder="Complexity" />
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
                        <Select onValueChange={setItemPerPageFilter}>
                          <SelectTrigger className="w-[80px] md:w-20 p-2">
                            <SelectValue placeholder="Items" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Complexity</SelectLabel>
                              <SelectItem value="10">10</SelectItem>
                              <SelectItem value="15">15</SelectItem>
                              <SelectItem value="20">20</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <a href="">
                      <Button onClick={handleCreate}>
                        <Plus />
                        Add Issue
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto  px-4 pb-4">
            <TaskList items={getIssues} />
          </div>
          <div className="p-0.5"></div>

          {/* pagination */}
          <div className="container mx-auto  border-2 px-4 py-4">
            <div className="flex flex-auto flex-row">
              <div className="flex-1  justify-start">
                <p className="pt-2">
                  {/* Projects: {getPaginations?.totalItems} */}
                </p>
              </div>
              {/* <PaginationComp
                     item={getPaginations}
                     fetchItem={getProject}
                     handlePageChange={handlePageChange}
                   />{" "} */}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Task;
