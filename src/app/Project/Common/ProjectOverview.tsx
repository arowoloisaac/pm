import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import IssueList from "@/app/Issue/Issue";
import CreateIssue from "@/app/Issue/Layout/Create-Issue";

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
            <MenubarTrigger>Activites</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Gannt</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Calendar</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Wiki</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Settings</MenubarTrigger>
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
                  <Navigate to={`/project/${projectId}/overview/issues`} replace />
                }
              />
              <Route path="issues" element={<IssueList />} />
              <Route path="create" element={<CreateIssue />} />
              {/* <Route path="activities" element={<ActivitiesPage />} />
              <Route path="gantt" element={<GanttPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="wiki" element={<WikiPage />} />
              <Route path="settings" element={<SettingsPage />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
