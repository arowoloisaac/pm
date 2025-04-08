import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import IssueList from "@/components/Task/Issue";
import CreateIssue from "@/components/Task/layout/CreateTask";
import Setting from "../layout/Setting";
import Timeline from "../layout/Timeline";
import CalendarLayout from "../Calendar/CalendarLayout";
import GanttOverview from "../Gannt/GanttLayout";
import TaskLayout from "@/components/Task/Common/TaskLayout";

const ProjectOverview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>
        {" "}
        <Menubar className="w-[435px]">
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/project/${projectId}/overview/issues`)}
            >
              Issues
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/project/${projectId}/overview/timeline`)
              }
            >
              Activites
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/project/${projectId}/overview/gantt`)}
            >
              Gantt
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/project/${projectId}/overview/calendar`)
              }
            >
              Calendar
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Wiki</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/project/${projectId}/overview/settings`)
              }
            >
              Settings
            </MenubarTrigger>
          </MenubarMenu>
        </Menubar>
      </div>

      <div>
        <div className="w-full ">
          <div className="container mx-auto  px-4  pb-4">
            <Routes>
              <Route
                index
                element={
                  <Navigate
                    to={`/project/${projectId}/overview/issues`}
                    replace
                  />
                }
              />

              <Route path="/issue/:issueId/*" element={<TaskLayout />} />
              <Route path="/issues" element={<IssueList />} />
              <Route path="create" element={<CreateIssue />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/calendar" element={<CalendarLayout />} />
              <Route path="/gantt" element={<GanttOverview />} />
              <Route path="settings/*" element={<Setting />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
