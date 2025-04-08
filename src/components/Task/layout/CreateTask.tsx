import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createIssue } from "../api/issue-api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CreateIssue = () => {
  const { projectId } = useParams();
  const { quill, quillRef } = useQuill();
  const { toast } = useToast();

  const navigate = useNavigate();

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
    startDate: formData.startDate ? formData.startDate : null,
    endDate: formData.endDate ? formData.endDate : null,
    estimatedTimeInMinutes: formData.estimatedTimeInMinutes,
    complexity: formData.complexity,
    issueType: formData.issueType,
  };

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

  const createIss = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = await createIssue(e, { data, projectId });

    if (response.status === 200) {
      toast({
        title: "Issue created ",
        description: response.data,
      });
      navigate(`/project/${projectId}/overview`);
      window.location.reload()
    } else {
      toast({
        title: "Error creating issue ",
        description: response.response.data,
        variant: "destructive",
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.startDate &&
      formData.endDate &&
      !dateError &&
      !startDateError &&
      !endDateError
    );
  };

  useEffect(() => {
    createIss;
  });
  return (
    <>
      <div>Create New Issue</div>
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
                Est Time (mins)
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
          <div className="grid gap-6 mb-6 grid-cols-2">
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
              />{" "}
              {endDateError && (
                <div style={{ color: "red" }}>{endDateError}</div>
              )}
              {dateError && <div style={{ color: "red" }}>{dateError}</div>}
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="startDate"
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
            <button
              onClick={createIss}
              disabled={!isFormValid()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateIssue;
