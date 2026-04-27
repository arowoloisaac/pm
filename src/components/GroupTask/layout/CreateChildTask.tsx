import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
// import { createSubIssue } from "../api/issue-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { createChildTask } from "../api/api";
import { Button } from "@/components/ui/button";
import { IGroupUser } from "@/components/group/utils/utils";
import { retrieveGroupUsers } from "@/components/group/api/api";
import { visibility } from "@/components/function/visibility";

const CreateChildIssue = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isVisible = visibility();

  const { projectId, issueId, organizationId, groupId } = useParams<{
    projectId: string | any;
    issueId: string | any;
    organizationId: string | any;
    groupId: string | any;
  }>();

  const { quill, quillRef } = useQuill();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedTimeInMinutes: "",
    complexity: "",
    issueType: "",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          description: quill.root.innerHTML, // Get Quill content as HTML
        }));
      });
    }
  }, [quill]);

  const data = {
    name: formData.title,
    description: formData.description,
    startDate: formData.startDate
      ? formData.startDate
      : new Date().toISOString().split("T")[0],
    endDate: formData.endDate
      ? formData.endDate
      : new Date().toISOString().split("T")[0],
    estimatedTimeInMinutes: formData.estimatedTimeInMinutes,
    complexity: formData.complexity,
    issueType: formData.issueType,
  };

  const [dateError, setDateError] = useState<string>("");

  const validateDates = (startDate: string, endDate: string) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (!start.isValid() || !end.isValid()) return;

    if (end.isBefore(start, "day")) {
      setDateError("End date must be the same as or after the start date.");
    } else {
      setDateError("");
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

  const handleCreateChildTask = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const response: any = await createChildTask(e, {
      data,
      projectId,
      issueId,
      organizationId,
      groupId,
    });

    if (response.status === 200) {
      toast({
        title: "Issue created ",
        description: response.data,
      });
      navigate(`/project/${projectId}/overview/issue/${issueId}`);
      window.location.reload();
    } else {
      toast({
        title: "Error creating issue ",
        description: response.response.data,
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
      <div>Create Child Issue</div>
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
              placeholder="Implement this ....."
              required
              value={formData.title}
              onChange={(e) => {
                handleChange("title", e.target.value);
              }}
            />
          </div>

          <div className="grid gap-6 mb-6 grid-cols-3">
            <div className="">
              <label
                htmlFor="estTime"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Est Time {isVisible ? <></> : <>(mins)</>}
              </label>
              <input
                type="number"
                id="estTime"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="60"
                required
                onChange={(e) => {
                  handleChange("estimatedTimeInMinutes", e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Type
              </label>
              <select
                onChange={(e) => handleChange("issueType", e.target.value)}
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected disabled>
                  Type
                </option>
                <option value="Task">Task</option>
                <option value="Documentation">Documentation</option>
                <option value="Research">Research</option>
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
                onChange={(e) => handleChange("complexity", e.target.value)}
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
          <div className="grid gap-6 mb-6 grid-cols-3">
            <div>
              <label
                htmlFor="startDt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Start Date
              </label>
              <Datepicker
                value={
                  formData.startDate ? new Date(formData.startDate) : undefined
                }
                onChange={(e) => {
                  if (e) {
                    const formattedDate = format(e, "yyyy-MM-dd");
                    handleChange("startDate", formattedDate);
                  }
                }}
                autoHide={true}
              />
              {/* {dateError && <p className="text-red-600 text-sm">{dateError}</p>} */}
            </div>
            {/* for end date */}
            <div>
              <label
                htmlFor="endDt"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                End Date
              </label>
              <Datepicker
                value={
                  formData.endDate ? new Date(formData.endDate) : undefined
                }
                onChange={(e) => {
                  if (e) {
                    const formattedDate = format(e, "yyyy-MM-dd");
                    handleChange("endDate", formattedDate);
                  }
                }}
                autoHide={true}
              />
              {dateError && <p className="text-red-600 text-sm">{dateError}</p>}
            </div>
            <div>
              <label
                htmlFor="assignUser"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Assign User
              </label>
              <select
                onChange={(e) => handleChange("assignedTo", e.target.value)}
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
                    <option selected disabled>
                      select user
                    </option>
                    {getGroupUser.map((user) => (
                      <option value={user.id}>{user.name}</option>
                    ))}
                  </>
                )}
              </select>
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
            <Button onClick={handleCreateChildTask}>Create Issue</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateChildIssue;
