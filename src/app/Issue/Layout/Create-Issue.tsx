import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { createIssue } from "../api-function/issue-api";
import { useParams } from "react-router-dom";

const CreateIssue = () => {
  const { projectId } = useParams();
  const { quill, quillRef } = useQuill();
  // console.log(quill);
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
    startDate: formData.startDate,
    endDate: formData.endDate,
    estimatedTimeInMinutes: formData.estimatedTimeInMinutes,
    complexity: formData.complexity,
    issueType: formData.issueType,
  };

  // console.log(data);

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

  const createIss = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const issue = await createIssue(e, { data, projectId});
    console.log("Issue Created:", issue);
  };

  useEffect(() => {
    console.log(data);
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
              {/* {dateError && <p className="text-red-600 text-sm">{dateError}</p>} */}
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
              />
              {dateError && <p className="text-red-600 text-sm">{dateError}</p>}
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
