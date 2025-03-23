import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectTimeline } from "../api/project-api";
import { ITimeline } from "../utils/utils";
import { Token } from "@/components/Storage/Storage";
import MarkdownIt from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";

const Timeline = () => {
  const { projectId } = useParams<string>();
  const [getTimeline, setTimeline] = useState<ITimeline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchTimeline = async () => {
    setIsLoading(true);
    try {
      const data = await projectTimeline(projectId);
      if (data) {
        setTimeline(data);
      }
    } catch (error) {
      console.error("Error fetching timeline:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [Token]);

  const md = new MarkdownIt();
  return (
    <>
      <div className="container flex">
        <div className="p-4">
          {isLoading ? (
            <div className="h-[32rem] ">
              <div className=" flex flex-row ">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[70px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {getTimeline.length < 1 ? (
                <div>
                  <div className="container">
                    <div className="max-2xl:min-h-[32rem] max-[2680px]:min-h-[50rem] content-center">
                      <div className=" flex flex-row justify-center">
                        <div>
                          <span>
                            <h2 className="font-serif">No Activities Yet!</h2>
                          </span>
                        </div>
                      </div>
                      <div className=" flex flex-row justify-center">
                        <div>
                          <span>
                            <h2 className="font-serif">
                              Your activities over the time will be displayed!
                            </h2>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    {getTimeline.map((item) => {
                      const dateObj = new Date(item.createdDate);

                      const formattedDate = dateObj.toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      );

                      const formattedTime = dateObj.toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      );
                      return (
                        <li className="mb-10 ms-4">
                          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            {formattedDate} - {formattedTime}
                          </time>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.issueName}
                          </h3>
                          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            {item.comment}
                          </p>
                          <p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: md.render(item.note),
                              }}
                            />
                          </p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Timeline;
