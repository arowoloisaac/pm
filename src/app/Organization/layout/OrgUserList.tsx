import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { IOrganizationUser } from "../utils/utils";
import { getOrganizationUsers } from "../api/api";
import { useEffect, useState } from "react";

const OrgUserList = () => {
  const { organizationId } = useParams();

  const [getUser, setUsers] = useState<IOrganizationUser[]>([]);
  const fetchOrganizationUsers = async (): Promise<
    IOrganizationUser[] | any
  > => {
    try {
      const data = await getOrganizationUsers(organizationId);
      data ? setUsers(data) : null;
    } catch (error: any) {
      console.log("fix it later");
    }
  };

  useEffect(() => {
    fetchOrganizationUsers();
  }, [getUser]);
  
  return (
    <div>
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
            {getUser.map((user, index) => (
              <tr className=" border-b" key={user.userId}>
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
                      {user.userName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {user.userEmail}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">
                  {user.userRole === "OrganizationAdministrator"
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
    </div>
  );
};

export default OrgUserList;
