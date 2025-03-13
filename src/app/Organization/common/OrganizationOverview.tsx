import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Settings from "../layout/Settings";
import OrgUserList from "../layout/OrgUserList";
import OrganizationProjects from "../OrganizationProject/OrganizationProjects";
import CreateOrganizationProject from "../OrganizationProject/CreateOrganizationProject";

const OrganizationOverview = () => {
  const { organizationId } = useParams();

  console.log(organizationId)
  const navigate = useNavigate();

  return (
    <>
      <div>
        {" "}
        <Menubar className="w-[510px]">
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
              onClick={() =>
                navigate(`/organization/${organizationId}/timeline`)
              }
            >
              Groups
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/organization/${organizationId}/timeline`)
              }
            >
              Requests
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() =>
                navigate(`/organization/${organizationId}/projects`)
              }
            >
              Projects
            </MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => navigate(`/organization/${organizationId}/users`)}
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
                navigate(`/organization/${organizationId}/settings`)
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
              {/* <Route path="issues" element={<IssueList />} />
                <Route path="create" element={<CreateIssue />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/calendar" element={<CalendarLayout />} /> */}
              {/* <Route path="activities" element={<ActivitiesPage />} />
              <Route path="gantt" element={<GanttPage />} />
              <Route path="calendar" element={<CalendarPage />} />*/}
              <Route path="create-project" element={<CreateOrganizationProject />} />
              <Route path="projects" element={<OrganizationProjects />} />
              <Route path="projects/*" element={<OrganizationProjects />} />
              <Route path="users" element={<OrgUserList />} />
              <Route path="settings/*" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationOverview;
