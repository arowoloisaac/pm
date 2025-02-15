import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject } from "../utils/utils";
import { projectDetail } from "../api-functions/project-api";
import { Token } from "@/components/Storage/Storage";
import RichTextViewer from "../utils/display";

const ProjectDetail = () => {
  const [getDetails, setDetails] = useState<IProject|any>({});
  const { projectId } = useParams<string>();

  const fetchDetails = async () : Promise<any> => {
    const data = await projectDetail(projectId);
    data ? setDetails(data) : null;
  };

  useEffect(() => {
    fetchDetails()
  }, [Token])

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
              <dd className="text-lg font-semibold">{getDetails.overview}</dd>
            </div>

            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Description
              </dt>
              {/* here there haas to be a button for  */}
              <dd className="">
                <RichTextViewer content={getDetails.description}/>
              </dd>
            </div>
            <div className="flex flex-col py-3">
              <div className="flex flex-row">
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Complexity
                  </dt>
                  <dd className="text-lg font-semibold">{getDetails.complexity}</dd>
                </div>
                <div className="flex-auto">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                    Progress
                  </dt>
                  <dd className="text-lg font-semibold">{getDetails.progress}</dd>
                </div>
              </div>
            </div>
            <div className="flex flex-col pt-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">
                Date Created
              </dt>
              <dd className="text-lg font-semibold">{getDetails.dateCreated}</dd>
            </div>
          </dl>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProjectDetail;
