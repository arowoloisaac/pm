import { useEffect, useState } from "react";
import { sentRequests } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { IRequestUser } from "../utils/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import RemoveRequest from "./RemoveRequest";
import SendRequest from "./SendRequest";
import Loader from "@/components/loader";

const Request = () => {
  const { organizationId } = useParams<{ organizationId: string }>();
  const navigate = useNavigate();
  const [getRequests, setRequests] = useState<IRequestUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const fetchRequest = async () => {
    try {
      const data = await sentRequests(organizationId);

      if (data) {
        setIsLoading(false);
        setRequests(data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [getRequests]);

  return (
    <>
      <div>
        {isLoading ? (
          <Loader />
        ) : getRequests.length < 1 ? (
          <div className="h-[200px] content-center">
            <div className="flex flex-row justify-center">
              <div>
                <span>
                  <h2 className="font-serif">
                    No pending request, invite users to join your organization!
                  </h2>
                </span>
                <div className="flex justify-center">
                  {" "}
                  click here -{" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="link"
                        className="h-6 font-serif pl-2 underline text-md"
                      >
                        Send Request
                      </Button>
                    </DialogTrigger>
                    <SendRequest />
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
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
                    <div className="flex flex-auto flex-wrap md:flex-nowrap gap-2 "></div>

                    {/* Search Button */}
                    <div className="flex justify-end gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">
                            <Plus />
                            Send Request
                          </Button>
                        </DialogTrigger>
                        <SendRequest />
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* for request display */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4"></div>
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="border-b">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center"></div>
                    </th>
                    <th scope="col" className="px-6 py-3 w-44">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-1 py-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {getRequests.map((req, index) => (
                    <tr className="border-b" key={req.id}>
                      <td className="w-4 p-4">
                        <div className="flex items-center">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4">{req.name}</td>
                      <td className="px-6 py-4">{req.email}</td>

                      <td className="px-6 py-4">Pending</td>
                      <td className="px-6 py-4 ">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-2">
                          <div className="flex flex-auto flex-wrap md:flex-nowrap gap-2 "></div>

                          <div className="flex justify-end gap-3">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="destructive">Remove</Button>
                              </DialogTrigger>
                              <RemoveRequest requestMail={req.email} />
                            </Dialog>
                          </div>
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
    </>
  );
};

export default Request;
