import { visibility } from "@/components/function/visibility";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import CreateChildTask from "../layout/CreateChildTask";
import TaskDetails from "../layout/UpdateTask";
import SubTaskList from "../layout/SubTaskList";
import UpdateProgress from "../layout/UpdateProgress";

const GroupTaskOverview = () => {
  const { projectId, issueId, organizationId, groupId } = useParams();
  const navigate = useNavigate();
  const visibile = visibility();
  return (
    <>
      <div>
        <div>
          <div>
            <div className="flex-1 p-1">
              <div className="grid grid-cols-5 gap-2">
                <div className="col-start-1  p-3 h-fit">
                  <div className="flex flex-col gap-2 ">
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/details`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">Detail</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/progress`
                        );
                      }}
                    >
                      {visibile ? (
                        <>
                          <h5 className="italic font-serif">Update progress</h5>
                        </>
                      ) : (
                        <>
                          <h5 className="italic font-serif">Update</h5>
                        </>
                      )}
                    </div>
                    <Separator orientation="horizontal" />
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/children`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">Children</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/related-task `
                        );
                      }}
                    >
                      <h5 className="italic font-serif">Related</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <h5 className="italic font-serif">Delete</h5>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-end-7 p-3 h-fit">
                  <div>
                    <Routes>
                      <Route
                        index
                        element={
                          <Navigate
                            to={`/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/details`}
                            replace
                          />
                        }
                      />
                      <Route path="details" element={<TaskDetails />} />
                      <Route
                        path="create-child"
                        element={<CreateChildTask />}
                      />
                      <Route path="children" element={<SubTaskList />} />
                      <Route path="progress" element={<UpdateProgress />} />
                      {/* <Route
                        index
                        element={
                          <Navigate
                            to={`/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/details`}
                            replace
                          />
                        }
                      /> */}
                      {/* <Route path="details" element={<DetailedIssue />} />
                      <Route path="edit" element={<UpdateQuest />} />
                      <Route
                        path="related-task"
                        element={<RelatedTaskList />}
                      />
                      <Route path="children" element={<SubIssue />} />
                      <Route
                        path="create-child"
                        element={<CreateChildIssue />}
                      /> */}
                    </Routes>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupTaskOverview;
