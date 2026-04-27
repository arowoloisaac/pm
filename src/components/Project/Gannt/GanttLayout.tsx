import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { projectGanntIssue } from "../api/project-api";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IIssues } from "@/components/Task/utils/utils";
import { Button } from "@/components/ui/button";
import { IGanttIssue } from "../utils/utils";

const GanttOverview = () => {
  const { projectId } = useParams<{ projectId: string | any }>();
  const [getIssue, setGanntIssue] = useState<IIssues[]>([]);

  console.log(getIssue);

  const retrieveIssue = async () => {
    try {
      const data = await projectGanntIssue(projectId);
      data ? setGanntIssue(data) : null;
    } catch (error: any) {
      // alert(error.response.data);
    }
  };

  useEffect(() => {
    retrieveIssue();
  }, []);

  function mapToTask(issue: IIssues): IGanttIssue {
    const startDateObject = new Date(issue.startDate);
    startDateObject.setHours(0, 0, 0, 0);

    const endDateObject = new Date(issue.endDate);
    endDateObject.setHours(23, 59, 59, 999);
    const task: IGanttIssue = {
      start: startDateObject,
      end: endDateObject,
      name: issue.name,
      id: issue.id,
      type: "task",
      progress: issue.issueLevel,
      isDisabled: false,
      // styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
      subTasks: issue.subIssue?.map((subIssue: IIssues) =>
        mapToTask(subIssue)
      ),
    };
    return task;
  }

  const ganttData = useMemo(() => {
    return getIssue.length > 0 ? getIssue.map(mapToTask) : [];
  }, [getIssue]);

console.log(ganttData);

  /*function mapToTask(issue: IIssues, parentId?: string | null): IGanttIssue[] {
    const startDateObject = new Date(issue.startDate);
    startDateObject.setHours(0, 0, 0, 0);

    const endDateObject = new Date(issue.endDate);
    endDateObject.setHours(23, 59, 59, 999);

    const task: IGanttIssue = {
      start: startDateObject,
      end: endDateObject,
      name: issue.name,
      id: issue.id, // id: parentId ? `${parentId}-${issue.id}` : issue.id,
      type: "task",
      progress: issue.issueLevel,
      isDisabled: false,
      parent: issue.parentId, // <--- This is key for subtasks
    };

    // Flatten subtasks recursively
    const subTasks =
      issue.subIssue?.flatMap((subIssue: IIssues) =>
        mapToTask(subIssue, issue.parentId)
      ) || [];

    return [task, ...subTasks];
  }
  // Then, to get all tasks:
  const ganttData = useMemo(() => {
    return getIssue.length > 0
      ? getIssue.flatMap((issue) => mapToTask(issue))
      : [];
  }, [getIssue]);*/

  interface DisplayOption {
    viewMode?: "Hour" | "Day" | "Week" | "Month" | "Year" | any;
    viewDate?: Date;
    locale?: string;
  }

  const [viewMode, setViewMode] = useState<DisplayOption["viewMode"]>("Day");

  return ganttData.length > 0 ? (
    <>
      <div className="flex justify-end shadow-xs pb-2" role="group">
        {["Hour", "Day", "Week", "Month", "Year"].map((mode) => (
          <Button
            key={mode}
            onClick={() => setViewMode(mode)}
            className="px-4 py-2 h-8 rounded-sm text-sm font-medium"
            variant="outline"
          >
            {mode}
          </Button>
        ))}
      </div>

      <Gantt tasks={ganttData} viewMode={viewMode} />
    </>
  ) : (
    <div>No items to display</div>
  );
};

export default GanttOverview;
