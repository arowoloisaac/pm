import { Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { projectGanntIssue } from "../api/project-api";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IIssues } from "@/app/Issue/utils/utils";
import { Button } from "@/components/ui/button";
import { IGanttIssue } from "../utils/utils";

const GanttOverview = () => {
  const { projectId } = useParams<{ projectId: string | any }>();
  const [getIssue, setGanntIssue] = useState<IIssues[]>([]);

  const retrieveIssue = async () => {
    try {
      const data = await projectGanntIssue(projectId);
      data ? setGanntIssue(data) : null;
    } catch (error: any) {
      alert(error.response.data);
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
      subTasks: issue.subIssues?.map((subIssue: IIssues) =>
        mapToTask(subIssue)
      ),
    };

    return task;
  }

  const ganttData = useMemo(() => {
    return getIssue.length > 0 ? getIssue.map(mapToTask) : [];
  }, [getIssue]);

  interface DisplayOption {
    viewMode?: "Hour" | "Day" | "Week" | "Month" | "Year" | any;
    viewDate?: Date;
    locale?: string;
  }

  const [viewMode, setViewMode] = useState<DisplayOption["viewMode"]>("Day");


  return ganttData.length > 0 ? (
    <>
      <div className="flex flex-row gap-1">
        {["Hour", "Day", "Week", "Month", "Year"].map((mode) => (
          <div>
            <Button key={mode} onClick={() => setViewMode(mode)}>
              {mode}
            </Button>
          </div>
        ))}
      </div>

      <Gantt tasks={ganttData} viewMode={viewMode} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default GanttOverview;
