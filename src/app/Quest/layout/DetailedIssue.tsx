"use client";
// import SubIssue from "./SubIssue";
import { Button } from "@/components/ui/button";

import "../utils/styles.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import SubIssue from "./SubIssueList";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { issueDetail } from "../api/issue-api";
import { IIssue } from "../utils/utils";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import { Datepicker } from "flowbite-react";
import dayjs from "dayjs";
import { format } from "date-fns";
import { createIssue } from "../api/issue-api";
import { useToast } from "@/hooks/use-toast";
import RelatedIssue from "./AddRelatedIssue";

const DetailedIssue = () => {
  const { projectId, issueId } = useParams<{
    projectId: string | any;
    issueId: string | any;
  }>();

  const [questData, setQuestData] = useState<IIssue>();

  const getQuest = async () => {
    const data = await issueDetail(projectId, issueId);
    data ? setQuestData(data) : null;
  };

  useEffect(() => {
    getQuest();
  }, []);

  const { toast } = useToast();

  const navigate = useNavigate();

  const { quill, quillRef } = useQuill();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedTimeInMinutes: 0,
    complexity: "",
    issueType: "",
  });

  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = questData?.description
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
      window.location.reload();
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

  const [getUpdateButton, setUpdateButton] = useState<boolean>(false);

  return (
    <>
      <div>
        <div>
          <div>
            <div>
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
                      defaultValue={questData?.name}
                      // value={formData.title}
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
                        htmlFor="type"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Type
                      </label>
                      <select
                        onChange={(e) =>
                          handleChange("issueType", e.target.value)
                        }
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
                        // defaultValue={}

                        value={
                          formData.startDate
                            ? new Date(formData.startDate)
                            : new Date(questData?.startDate)
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
                          formData.endDate
                            ? new Date(formData.endDate)
                            : new Date(questData?.endDate)
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
                      {dateError && (
                        <div style={{ color: "red" }}>{dateError}</div>
                      )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedIssue;
