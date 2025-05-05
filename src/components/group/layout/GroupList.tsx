import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { IGroup } from "../utils/utils";
import CreateGroup from "./CreateGroup";
import { deleteGroup, retrieveGroup } from "../api/api";
import Loader from "@/components/loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const GroupList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [getGroups, setGroups] = useState<IGroup[]>([]);

  const { organizationId } = useParams();

  const fetchOrganizationGroups = async () => {
    const response = await retrieveGroup(organizationId);

    if (response.status === 200) {
      setGroups(response.data);
      setIsLoading(false);
    } else {
      alert(`Error fetching projects:`);
      setIsLoading(false);
    }
  };

  const handleClick = (id: string) => {
    navigate(`/organization/${organizationId}/group/${id}`);
  };

  const handleDeleteGroup = async (
    event: React.MouseEvent,
    groupId: string
  ) => {
    const response = await deleteGroup(event, organizationId, groupId);

    if (response.status === 200) {
      toast({
        description: response.data,
      });
      setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));
    } else {
      toast({
        description: response.response.data,
      });
    }
  };

  useEffect(() => {
    fetchOrganizationGroups();
  }, []);

  console.log(getGroups);

  return (
    <>
      <div>
        <div>
          {isLoading ? (
            <Loader />
          ) : getGroups.length < 1 ? (
            <>
              {" "}
              <div className="h-[200px] content-center">
                <div className="flex flex-row justify-center">
                  <div>
                    <span>
                      <h2 className="font-serif">
                        Their are no groups in your organization!!
                      </h2>
                    </span>
                    <div className="flex justify-center">
                      {" "}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="text-md">
                            - Add Group
                          </Button>
                        </DialogTrigger>
                        <CreateGroup onGroupCreated={fetchOrganizationGroups} />
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-end gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      {" "}
                      <Plus />
                      Add Group
                    </Button>
                  </DialogTrigger>
                  <CreateGroup onGroupCreated={fetchOrganizationGroups} />
                </Dialog>
              </div>
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
                        Projects
                      </th>
                      <th scope="col" className="px-1 py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getGroups.map((group, index) => (
                      <tr
                        className="border-b"
                        onClick={() => {
                          handleClick(group.id);
                        }}
                        key={group.id}
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4">{group.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex text-center">
                            {group.projectCount}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="self-start">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-[1px]">
                                  <MoreHorizontal />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[150px]"
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuItem>
                                    Edit Group
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />

                                  <DropdownMenuItem
                                    onClick={(event: any) => {
                                      handleDeleteGroup(event, group.id);
                                    }}
                                    className="text-red-600"
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
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
