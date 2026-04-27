
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import GanttLayout from "../libraries/gantt/Gantt";
import Calendar from "../libraries/calendar/Calendar";
import Task from "@/components/GroupTask/Task";
import CreateTask from "@/components/GroupTask/layout/CreateTask";
import GroupTaskOverview from "@/components/GroupTask/common/Overview";

const Overview = () => {
  const {organizationId, groupId, projectId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div>
        {" "}
        <Menubar className="w-[435px]">
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(
                  `/organization/${organizationId}/group/${groupId}/project/${projectId}/issues`
                )
              }
            >
              Issues
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(
                  `/organization/${organizationId}/group/${groupId}/project/${projectId}/timeline`
                )
              }
            >
              Activites
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(
                  `/organization/${organizationId}/group/${groupId}/project/${projectId}/gantt`
                )
              }
            >
              Gantt
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(
                  `/organization/${organizationId}/group/${groupId}/project/${projectId}/calendar`
                )
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
                navigate(
                  `/organization/${organizationId}/group/${groupId}/project/${projectId}/settings`
                )
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
                    to={`/organization/${organizationId}/group/${groupId}/project/${projectId}/issues`}
                    replace
                  />
                }
              />

              <Route path="/gantt" element={<GanttLayout />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/issues" element={<Task />} />
              <Route path="/create" element={<CreateTask />} />
              <Route path="/issue/:issueId/*" element={<GroupTaskOverview />} />
              {/* <Route path="/issue/:issueId/*" element={<TaskLayout />} />
              <Route path="/issues" element={<IssueList />} />
              <Route path="create" element={<CreateIssue />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/calendar" element={<CalendarLayout />} />
             
              <Route path="settings/*" element={<Setting />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview