import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { issueDetail, updateTaskProgress } from "../api/issue-api";
import { useQuill } from "react-quilljs";
import { Textarea } from "@/components/ui/textarea";
import { IIssue, TaskComponent } from "../utils/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const UpdateQuest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { projectId, issueId } = useParams<{
    projectId: string | any;
    issueId: string | any;
  }>();

  const [questData, setQuestData] = useState<IIssue>();

  const { quill, quillRef } = useQuill();

  const [formData, setFormData] = useState({
    comment: "",
    estimatedTimeInMinute: 0,
    issueLevel: 0,
    note: "",
    timeSpent: 0,
    workdone: TaskComponent.Analysis,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          note: quill.root.innerHTML, // Get Quill content as HTML
        }));
      });
    }
  }, [quill]);

  const data = {
    estimatedTimeInMinute: formData.estimatedTimeInMinute
      ? formData.estimatedTimeInMinute
      : questData?.estimatedTimeInMinute,
    issueLevel: formData.issueLevel,
    comment: formData.comment,
    note: formData.note,
    timeSpent: formData.timeSpent,
    workdone: formData.workdone ? formData.workdone : TaskComponent.Development,
    startDate: questData?.startDate,
    endDate: questData?.endDate,
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getQuest = async () => {
    const response = await issueDetail(projectId, issueId);
    setQuestData(response);
  };

  const updateTaskData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const req = await updateTaskProgress(e, projectId, issueId, data);

    if (req.status === 200) {
      toast({
        title: "progress updated ",
        description: req.data,
      });
      navigate(`/project/${projectId}/overview/issue/${issueId}`);
      window.location.reload();
    } else {
      toast({
        title: "Error updating progress ",
        description: req.response.data,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    getQuest();
  }, []);

  return (
    <>
      <div className="prose"><h3 className="font-bold">Update Task Progress</h3></div>
      <div>
        <form>
          <div className=" flex mb-6">
            <label
              htmlFor="title"
              className="block pt-2 pr-2 text-md font-medium text-gray-900 dark:text-white"
            >
              Title:
            </label>
            <h4 className="block pt-2 pr-2 text-md font-medium text-gray-900 dark:text-white">
              {questData?.name}
            </h4>
          </div>

          <div className="grid gap-6 mb-6 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
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
                required
                defaultValue={questData?.estimatedTimeInMinute}
                onChange={(e) => {
                  handleChange("estimatedTimeInMinutes", e.target.value);
                }}
              />
            </div>
            <div className="">
              <label
                htmlFor="timespent"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time Spent (mins)
              </label>
              <input
                type="number"
                id="timespent"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="60"
                required
                defaultValue={questData?.timeSpent}
                onChange={(e) => {
                  handleChange("timeSpent", e.target.value);
                }}
              />
            </div>
            <div className="">
              <label
                htmlFor="lev"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Progress Level (%)
              </label>
              <input
                type="number"
                id="lev"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="60"
                required
                max={100}
                min={0}
                defaultValue={questData?.issueLevel}
                onChange={(e) => {
                  handleChange("issueLevel", e.target.value);
                }}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Performed
              </label>

              <select
                onChange={(e) => handleChange("workdone", e.target.value)}
                id="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected disabled>
                  Type
                </option>
                <option value={TaskComponent.Planning}>Planning</option>
                <option value={TaskComponent.Analysis}>Analysis</option>
                <option value={TaskComponent.Design}>Design</option>
                <option value={TaskComponent.Development}>Development</option>
                <option value={TaskComponent.Testing}>Testing</option>
                <option value={TaskComponent.Documentation}>
                  Documentation
                </option>
                <option value={TaskComponent.Deployment}>Deployment</option>
                <option value={TaskComponent.Monitoring}>Monitoring</option>
                <option value={TaskComponent.Coding}>Coding</option>
              </select>
            </div>
          </div>
          <div className="grid gap-6 mb-6 grid-cols-1">
            <div>
              <label
                htmlFor="comment"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comment
              </label>
              <Textarea
                onChange={(e) => handleChange("comment", e.target.value)}
                placeholder="Type your comment here."
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Note
            </label>
          </div>

          <div className="">
            <div className="">
              <div style={{ height: "200px" }} ref={quillRef} />
            </div>
          </div>

          <div className="flex pt-2 ">
            <Button onClick={updateTaskData}>Update</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateQuest;
