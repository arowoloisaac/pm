import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation, useParams } from "react-router-dom";
// import { IOrganizationUser } from "../utils/utils";
// import { getOrganizationUsers } from "../api/api";
import { useEffect, useState } from "react";
import { IGroupUser } from "../utils/utils";
import { retrieveAdminGroupUsers, retrieveGroupUsers } from "../api/api";
import { groupRole, organizationRole } from "@/components/function/role";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddUser from "./AddUser";

const GroupUserList = () => {
  const location = useLocation();
  const { organizationId, groupId } = useParams<{
    organizationId: string | any;
    groupId: string | any;
  }>();

   const [isCollapsed, setIsCollapsed] = useState(true);
  const [getAdminGroupUser, setAdminGroupUser] = useState<IGroupUser[]>([]);
  const [getGroupUser, setGroupUser] = useState<IGroupUser[]>([]);

  const fetchAdminUsers = async () => {
    const data = await retrieveAdminGroupUsers(organizationId, groupId);
    data ? setAdminGroupUser(data) : null;
  };

  const fetchUsers = async () => {
    const data = await retrieveGroupUsers(organizationId, groupId);
    data ? setGroupUser(data || null) : null;
  };

  const [orgRole, setOrgRole] = useState<string | null>("");
  const [grpRole, setGrpRole] = useState<string | null>("");

  const fetchRole = async () => {
    try {
      const response = await organizationRole(organizationId);
      response ? setOrgRole(response.userRole) : null;
    } catch (error: any) {
      alert(error);
    }
  };

  const fetchGroupRole = async () => {
    try {
      const response = await groupRole({
        orgId: organizationId,
        grpId: groupId,
      });
      response ? setGrpRole(response.userRole || null) : null;
    } catch (error: any) {
      // setGrpRole(response.userRole || null);
    }
  };
  useEffect(() => {
    fetchAdminUsers();
    fetchRole();
    fetchUsers();
    fetchGroupRole();
  }, [location.pathname]);

  return (
    <div>
      {orgRole == "OrganizationAdministrator" ? (
        <>
          {" "}
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
                  <div className="flex flex-auto flex-wrap md:flex-nowrap gap-2 "><h3 className="font-bold">Users</h3></div>
                  {/* Search Button */}
                  <div className="flex justify-end gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          {" "}
                          <Plus />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <AddUser />
                      {/* <CreateGroup /> */}
                    </Dialog>
                  </div>
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
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {getAdminGroupUser.map((user, index) => (
                  <tr className=" border-b" key={user.id}>
                    <td className="w-4 p-4">
                      <div className="flex items-center">{index + 1}</div>
                    </td>
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Avatar>
                        <AvatarImage src={user.userImage} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {user.name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {user.role === "GroupAdministrator"
                        ? "Administrator"
                        : "Member"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                        Online
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit user
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : grpRole !== null ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"></div>
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="border-b">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {getGroupUser.map((user, index) => (
                <tr className=" border-b" key={user.id}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">{index + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Avatar>
                      <AvatarImage src={user.userImage} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {user.role === "GroupAdministrator"
                      ? "Administrator"
                      : "Member"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      Online
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit user
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}

      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"></div>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="border-b">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {getAdminGroupUser.map((user, index) => (
              <tr className=" border-b" key={user.id}>
                <td className="w-4 p-4">
                  <div className="flex items-center">{index + 1}</div>
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Avatar>
                    <AvatarImage src={user.userImage} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ps-3">
                    <div className="text-base font-semibold">{user.name}</div>
                    <div className="font-normal text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {user.role === "OrganizationAdministrator"
                    ? "Administrator"
                    : "Member"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                    Online
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit user
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default GroupUserList;
