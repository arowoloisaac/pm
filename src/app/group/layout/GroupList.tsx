import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { IGroup } from "../utils/utils";
import CreateGroup from "./CreateGroup";
import { retrieveGroup } from "../api/api";

const GroupList = () => {
//   const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [getGroups, setGroups] = useState<IGroup[]>([]);

  const { organizationId } = useParams();

  const fetchOrganizationGroups = async () => {
    const response = await retrieveGroup(organizationId);

    if (response.status === 200) {
      setGroups(response.data);
      setIsLoading(false);
    } else {
      console.error("Error fetching projects:", response);
      setIsLoading(false);
    }
    response ? setGroups(response.data) : null;
  };

  useEffect(() => {
    fetchOrganizationGroups();
  }, [location.pathname]);

  return (
    <>
      <div>
        <div className="py-1">
          <div className="border-2">
            <div className="flex justify-end p-4 md:hidden">
              {/* <h2 className="text-lg font-medium">Search</h2> */}
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
              
                </div>
                {/* Search Button */}
                <div className="flex justify-end gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        {" "}
                        <Plus />
                        Add Group
                      </Button>
                    </DialogTrigger>
                    <CreateGroup />
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="h-[32rem] content-center">
              <div className=" flex flex-row justify-center">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"></div>
                <table className="w-full text-sm text-left rtl:text-right">
                  <thead className="border-b">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center"></div>
                      </th>
                      <th scope="col" className="px-6 py-3 w-[700px]">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Assigned
                      </th>
                      <th scope="col" className="px-1 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getGroups.map((group, index) => (
                      <tr className="border-b" key={group.id}>
                        <td className="w-4 p-4">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">{group.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">0</div>
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
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

export default GroupList;
