import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import Axios from "axios";
import { ApiUrl, Token } from "./Storage/Storage";

interface IInvitationList {
  organizationId: string;
  organizationName: string;
}

const RequestList = () => {
  const [getRequestList, setRequestList] = useState<IInvitationList[]>([]);

  const retieveInviteRequest = async () => {
    try {
      const response = await Axios.get<IInvitationList[]>(
        `${ApiUrl}/notification/request`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setRequestList(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const rejectRequest = async (event: any, organizationId: string) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(
        `${ApiUrl}/notification/request/reject/${organizationId}`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      alert(response.data);
      // window.location.reload();
      setRequestList((prevList) =>
        prevList.filter((request) => request.organizationId !== organizationId)
      );
    } catch (error: any) {
      console.log();
      error;
    }
  };

  const acceptRequest = async (event: any, organizationId: string) => {
    event.preventDefault();
    try {
      const response = await Axios.post(
        `${ApiUrl}/notification/request/accept/${organizationId}`, {},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      alert(response.data);
      // window.location.reload();
        setRequestList((prevList) =>
          prevList.filter(
            (request) => request.organizationId !== organizationId
          )
        );
    } catch (error: any) {
      console.log();
      error;
    }
  };

  useEffect(() => {
    retieveInviteRequest();
  }, []);

  return (
    <>
      <section className="  antialiased md:py-16">
        <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className=" ">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Invitation Requests
            </h2>
            {getRequestList.length > 0 ? (
              <>
                {" "}
                <div className="mx-auto mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
                  <dl>
                    <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                      The page contains the list of organization request to you.{" "}
                      <p>
                        NB: The request might be revoke by the administrator
                      </p>
                    </dd>
                  </dl>
                </div>
                <div className="mt-6 sm:mt-8">
                  <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                    <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {getRequestList.map((req, index) => (
                          <tr>
                            <td className="whitespace-nowrap py-4 md:w-[384px]">
                              <div className="flex items-center gap-4">
                                <a className="flex items-center aspect-square w-5 h-10 shrink-0">
                                  {index + 1}
                                </a>
                                <h5>{req.organizationName}</h5>
                              </div>
                            </td>
                            <td className=" p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                              <div className=" flex flex-row justify-end gap-2">
                                <Button
                                  className="rounded-sm py-1 px-2 text-xs border-0"
                                  variant="outline"
                                  onClick={async (event: any) => {
                                    await acceptRequest(
                                      event,
                                      req.organizationId
                                    );
                                  }}
                                >
                                  <Check className="text-green-500" />
                                </Button>
                                <Button
                                  className="rounded-sm py-1 px-2 text-xs border-0"
                                  variant="outline"
                                  onClick={async (event: any) =>
                                    await rejectRequest(
                                      event,
                                      req.organizationId
                                    )
                                  }
                                >
                                  <X className="text-red-600" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-44 content-center">
                <div className=" flex flex-row justify-start">
                  <div>
                    <span>
                      <h2 className="font-serif">There are no requests yet!</h2>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default RequestList;
