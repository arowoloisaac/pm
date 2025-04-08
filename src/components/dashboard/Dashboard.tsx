import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Project from "../Project/Project";
import Theme from "@/components/Theme";
import DashboardUserNav from "../Layout/userNav";
import CreateProject from "../Project/layout/CreateProject";
import ProjectOverview from "../Project/Common/ProjectOverview";
import SubIssue from "../Task/layout/SubTaskList";
import DetailedIssue from "../Task/layout/UpdateTask";
// import Setting from "../project/Layouts/Setting";
import Tiptap from "../../components/Markdown/tiptap";
import Basic from "../../components/Markdown/remirror";
import Organization from "../Organization/Organization";
import OrganizationOverview from "../Organization/common/OrganizationOverview";
import GroupOverview from "../group/common/GroupOverview";
import Overview from "../groupProject/common/Overview";
import Profile from "../auth/Profile/Profile";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                {/* to be changed later on depending on the page  */} Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="ml-auto flex items-center space-x-4 ">
            <div></div>
            <Theme />
            <DashboardUserNav />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Router>
            <Routes>
              <Route path="/" element={<Project />} />
              <Route path="/projects/*" element={<Project />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sub" element={<SubIssue />} />
              <Route path="/md" element={<Tiptap />} />
              <Route path="/basic" element={<Basic />} />
              <Route
                path="/project/:projectId/issue/:issueId"
                element={<DetailedIssue />}
              />

              <Route
                path="/organization/:organizationId/group/:groupId/project/:projectId/*"
                element={<Overview />}
              />
              {/* <Route
                path="/organization/:organizationId/group/:groupId/project/:projectId/*"
                element={<Overview />}
              /> */}
              <Route
                path="/organization/:organizationId/group/:groupId/*"
                element={<GroupOverview />}
              />

              <Route path="/organizations" element={<Organization />} />
              <Route path="/organizations/*" element={<Organization />} />
              <Route
                path="/organization/:organizationId/*"
                element={<OrganizationOverview />}
              />

              <Route
                path="/project/:projectId/overview/*"
                element={<ProjectOverview />}
              />
              <Route path="/project/create" element={<CreateProject />} />
            </Routes>
          </Router>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
