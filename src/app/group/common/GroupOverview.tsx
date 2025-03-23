import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import GroupUserList from "../layout/GroupUserList";

const GroupOverview = () => {
  const navigate = useNavigate();
  const { organizationId, groupId } = useParams();
  return (
    <>
      <div>
        {" "}
        <Menubar className="w-[350px]">
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/organization/${organizationId}/home`)}
            >
              Home
              {/* this is for the admin
                    while for the member, will have show the group them belong in */}
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/organization/${organizationId}/groups`)}
            >
              Projects
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/organization/${organizationId}/group/${groupId}/users`)}
            >
              Users
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Wiki</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/organization/${organizationId}/group/${groupId}/settings`)
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
                    <Route path="users" element={<GroupUserList />}/>
                    {/* <Route
                      index
                      element={
                        <Navigate
                          to={`/project/overview/issues`}
                          replace
                        />
                      }
                    /> */}
                    {/* <Route path="issues" element={<IssueList />} />
                    <Route path="create" element={<CreateIssue />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/calendar" element={<CalendarLayout />} /> */}
                    {/* <Route path="activities" element={<ActivitiesPage />} />
                    <Route path="gantt" element={<GanttPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="wiki" element={<WikiPage />} />*/}
                  </Routes>
                </div>
              </div>
            </div>
    </>
  );
};

export default GroupOverview;
