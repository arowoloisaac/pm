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
import { IIssue } from "./utils/utils";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import IssueList from "./layout/TaskList";
import { IPaginate } from "../Project/utils/utils";
import PaginationComp from "../Layout/Paginator";

const Issue = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  // const { page } = useParams<{ page: number |any}>();
  // let page = 1
  const [isCollapsed, setIsCollapsed] = useState(true);

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const params = pathSegments.slice(4);

  console.log(params);

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

  const generateUrl = () => {
    const params = new URLSearchParams();
    params.append("page", currentPage.toString());
    if (progressFilter) params.append("progress", progressFilter);
    if (complexityFilter) params.append("complexity", complexityFilter);
    if (itemPerPageFilter) params.append("itemPerPage", itemPerPageFilter);

    return `${ApiUrl}/projectId=${projectId}/issues/page?${params.toString()}`;
  };

  const [getIssues, setIssues] = useState<IIssue[]>([]);
  const [getPaginations, setPaginations] = useState<IPaginate>();

  const fetchIssues = async () => {
    await Axios.get(generateUrl(), {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        setIssues(res.data.issues);
        setPaginations(res.data.pagination);
      })
      .catch((ex) => console.log(ex));
  };

  const handlePageChange = (newPage: number) => {
    const segments = ["issues"];
    if (progressFilter) segments.push(progressFilter);
    if (complexityFilter) segments.push(complexityFilter);
    segments.push(newPage.toString());
    if (itemPerPageFilter) segments.push(itemPerPageFilter);
    navigate(`/project/${projectId}/overview/${segments.join("/")}`);
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

    const segments = ["issues"];
    if (newProgress) segments.push(newProgress);
    if (newComplexity) segments.push(newComplexity);
    segments.push(currentPage.toString());
    if (newItemPerPage) segments.push(newItemPerPage);

    navigate(`/project/${projectId}/overview/${segments.join("/")}`);
  };

  useEffect(() => {
    // const currentPage = page ? page : 1;
    fetchIssues();
  }, [location.pathname]);

  return (
    <>
      {getIssues.length < 1 ? (
        <>
          <div className="lg:mx-[100px] md:mx-auto h-[500px] border-2 content-center">
            <div className=" flex flex-row justify-center">
              <div>
                <span>
                  <h2 className="font-serif text-pretty font-bold">
                    No Tasks in project :{" "}
                    <Button
                      className="italic text-md"
                      onClick={() => {
                        navigate(`/project/${projectId}/overview/create`);
                      }}
                      variant="link"
                    >
                      Create Task
                    </Button>
                  </h2>
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="py-1">
            <div className="border-x-2 my-1">
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
                <div className="flex flex-wrap md:flex-nowrap items-center p-2">
                  <div className="flex flex-auto flex-wrap md:flex-nowrap gap-2 ">
                    <Select
                      onValueChange={(value) => {
                        handleFilterChange("progress", value);
                      }}
                    >
                      <SelectTrigger className="w-[110px] md:w-44  p-2 ">
                        <SelectValue placeholder="Progress" />
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
                    <Select
                      onValueChange={(value) =>
                        handleFilterChange("itemPerPage", value)
                      }
                    >
                      <SelectTrigger className="w-[80px] md:w-20 p-2">
                        <SelectValue placeholder="Items" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Complexity</SelectLabel>
                          <SelectItem value="10">15</SelectItem>
                          <SelectItem value="15">20</SelectItem>
                          <SelectItem value="20">25</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <a href="">
                      <Button
                        onClick={() => {
                          navigate(`/project/${projectId}/overview/create`);
                        }}
                      >
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
          <div className="container mx-auto border-y-2 px-4 py-4">
            <IssueList items={getIssues} />
          </div>
          <div className="p-0.5"></div>
          {/* pagination */}
          {Number(getPaginations?.totalItems) < 1 || 15 ? (
            <span></span>
          ) : (
            <div className="container mx-auto  border-0 px-4 py-4">
              <div className="flex flex-auto flex-row">
                <div className="flex-1  justify-start">
                  <p className="pt-1">Task: {getPaginations?.totalItems}</p>
                </div>
                <PaginationComp
                  item={getPaginations}
                  fetchItem={fetchIssues}
                  handlePageChange={handlePageChange}
                />{" "}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Issue;
