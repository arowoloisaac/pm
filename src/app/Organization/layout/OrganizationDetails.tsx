import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IOrganization } from "../utils/utils";
import { getOrganization } from "../api/api";
// import RichTextViewer from "@/app/Project/utils/display";

const OrganizationDetails = () => {
  const { organizationId } = useParams<string>();
  const [getDetails, setDetails] = useState<IOrganization | any>({});

  const fetchOrganizationDetails = async (): Promise<IOrganization | any> => {
    const data = await getOrganization(organizationId);
    data ? setDetails(data) : null;
  };

  useEffect(()=> {
    fetchOrganizationDetails()
  }, [getDetails])

    const dateCreated = new Date(getDetails.dateCreated);
    const formattedCreatedDate = dateCreated.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const dateJoined = new Date(getDetails.dateJoined);
    const formattedJoinedDate = dateJoined.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  console.log(getDetails)
  return (
    <div>
      <div>
        <div>
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Name
              </dt>
              <dd className="text-lg font-semibold">{getDetails.name}</dd>
            </div>

            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Overview
              </dt>
              {/* here there haas to be a button for  */}
              <dd className="text-lg font-semibold">
                {getDetails.description}
                {/* <RichTextViewer content={getDetails.description} /> */}
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <div className="flex flex-row">
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Role
                  </dt>
                  <dd className="text-lg font-semibold">
                    {getDetails.role === "OrganizationAdministrator"
                      ? "Administrator"
                      : "Member"}
                  </dd>
                </div>
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Owner
                  </dt>
                  <dd className="text-lg font-semibold">
                    {getDetails.creator}
                  </dd>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-3">
              <div className="flex flex-row">
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Date Created
                  </dt>
                  <dd className="text-lg font-semibold">
                    {formattedCreatedDate}
                  </dd>
                </div>
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Date Joined
                  </dt>
                  <dd className="text-lg font-semibold">
                    {formattedJoinedDate}
                  </dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
