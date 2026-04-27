"use client";
import "../../Task/utils/styles.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { taskDetail, updateTask } from "../api/api";
import { IIssue } from "../utils/utils";
import { IGroupUser } from "@/components/group/utils/utils";
import { retrieveGroupUsers } from "@/components/group/api/api";
import { visibility } from "@/components/function/visibility";

const TaskDetails = () => {
  const { projectId, issueId, organizationId, groupId } = useParams<{
    projectId: string | any;
    issueId: string | any;
    organizationId: string | any;
    groupId: string | any;
  }>();

  const isVisible = visibility();

  const [questData, setQuestData] = useState<IIssue | null>(null);

  const getQuest = async () => {
    const data = await taskDetail(projectId, issueId, organizationId, groupId);
    data ? setQuestData(data) : null;
  };

  useEffect(() => {
    getQuest();
  }, []);

  const { toast } = useToast();
  const { quill, quillRef } = useQuill();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedTimeInMinutes: 0,
    complexity: "",
    assignedTo: "",
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = questData?.description;
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          description: quill.root.innerHTML, // Get Quill content as HTML
        }));
      });
    }
  }, [quill, questData]);

  const data = {
    name: formData.title,
    description: formData.description,
    startDate: formData.startDate ? formData.startDate : questData?.startDate,
    endDate: formData.endDate ? formData.endDate : questData?.endDate,
    estimatedTimeInMinute: formData.estimatedTimeInMinutes
      ? formData.estimatedTimeInMinutes
      : questData?.estimatedTimeInMinute,
    complexity: formData.complexity
      ? formData.complexity
      : questData?.complexity,
    assignedTo: formData.assignedTo ? formData.assignedTo: questData?.assignedToId
  };
  console.log(data);

  const [dateError, setDateError] = useState<string>("");
  const [startDateError, setStartDateError] = useState<string>("");
  const [endDateError, setEndDateError] = useState<string>("");

  const validateDates = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) {
      setStartDateError("Start date is required.");
      setEndDateError("End date is required.");
      return;
    }
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) {
      setStartDateError("Invalid start date.");
      setEndDateError("Invalid end date.");
      return;
    }

    if (end.isBefore(start, "day")) {
      setDateError("End date must be the same as or after the start date.");
    } else {
      setDateError("");
      setStartDateError("");
      setEndDateError("");
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "endDate" && formData.startDate) {
      validateDates(formData.startDate, value);
    }
    if (field === "startDate" && formData.endDate) {
      validateDates(value, formData.endDate);
    }
  };

  const handleUpdateTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await updateTask(
      e,
      projectId,
      issueId,
      organizationId,
      groupId,
      data
    );

    if (response.status === 200) {
      toast({
        title: "task updated ",
        description: response.data,
      });
      //   window.location.reload();
    } else {
      toast({
        title: "Error updating task ",
        variant: "destructive",
      });
    }
  };

  const [getGroupUser, setGroupUser] = useState<IGroupUser[]>([]);

  const fetchUsers = async () => {
    const data = await retrieveGroupUsers(organizationId, groupId);
    data ? setGroupUser(data || null) : null;
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <div>Update Task</div>
              <div>
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      defaultValue={questData?.name}
                      onChange={(e) => {
                        handleChange("title", e.target.value);
                      }}
                    />
                  </div>

                  <div className="grid gap-6 mb-6 xl:grid-cols-3 md:grid-cols-2">
                    <div className="">
                      <label
                        htmlFor="estTime"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Est Time {isVisible ? <>(mins)</> : <></>}
                      </label>
                      <input
                        type="number"
                        id="estTime"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={questData?.estimatedTimeInMinute}
                        onChange={(e) => {
                          handleChange(
                            "estimatedTimeInMinutes",
                            e.target.value
                          );
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="assignUser"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Assign User
                      </label>
                      <select
                        onChange={(e) =>
                          handleChange("assignedTo", e.target.value)
                        }
                        id="assignUser"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        {getGroupUser.length < 1 ? (
                          <>
                            <option selected disabled>
                              No users
                            </option>
                          </>
                        ) : (
                          <>
                            {questData?.assignedTo ? (
                              <></>
                            ) : (
                              <option selected disabled>
                                select user
                              </option>
                            )}

                            {getGroupUser.map((user) => (
                              <>
                                {user.name == questData?.assignedTo ? (
                                  <option selected disabled>
                                    {questData.assignedTo}
                                  </option>
                                ) : (
                                  <option value={user.id}>{user.name}</option>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="complexity"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Complexity
                      </label>
                      <select
                        onChange={(e) =>
                          handleChange("complexity", e.target.value)
                        }
                        id="complexity"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected disabled>
                          complexity
                        </option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Intermediate</option>
                        <option value="Complex">Complex</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid gap-6 mb-6 grid-cols-2">
                    <div>
                      <label
                        htmlFor="startDt"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Start Date
                      </label>
                      <Datepicker
                        onChange={(e) => {
                          if (e) {
                            const formattedDate = format(e, "yyyy-MM-dd");
                            handleChange("startDate", formattedDate);
                          }
                        }}
                        autoHide={true}
                      />
                      {startDateError && (
                        <div style={{ color: "red" }}>{startDateError}</div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="endDt"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        End Date
                      </label>
                      <Datepicker
                        onChange={(e) => {
                          if (e) {
                            const formattedDate = format(e, "yyyy-MM-dd");
                            handleChange("endDate", formattedDate);
                          }
                        }}
                        autoHide={true}
                      />{" "}
                      {endDateError && (
                        <div style={{ color: "red" }}>{endDateError}</div>
                      )}
                      {dateError && (
                        <div style={{ color: "red" }}>{dateError}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="desc"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                  </div>

                  <div className="">
                    <div className="">
                      <div style={{ height: "250px" }} ref={quillRef} />
                    </div>
                  </div>

                  <div className="flex pt-2 ">
                    <Button onClick={handleUpdateTask}>Update Changes</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
