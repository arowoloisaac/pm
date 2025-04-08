import { IGanttIssue } from "@/components/Project/utils/utils";
import { IIssues } from "@/components/Task/utils/utils";
import { Button } from "@/components/ui/button";
import { Gantt } from "gantt-task-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { projectGanttIssue } from "../../api/api";

const GanttLayout = () => {
  const { organizationId, groupId, projectId } = useParams<{
    organizationId: string | any;
    groupId: string | any;
    projectId: string | any;
  }>();
  const [getIssue, setGanntIssue] = useState<IIssues[]>([]);

  const retrieveIssue = async () => {
    try {
      const data = 0;
      await projectGanttIssue(organizationId, groupId, projectId);
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
    <div className="h-96 content-center">
      <div className=" flex flex-row justify-center">
        <div>
          <span>
            <h2 className="font-serif">No assigned projects yet</h2>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GanttLayout;
