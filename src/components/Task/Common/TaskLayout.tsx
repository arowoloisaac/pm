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
import SubIssue from "../layout/SubTaskList";
import CreateChildIssue from "../layout/CreateChildTask";
import RelatedTaskList from "../layout/RelatedTaskList";
import UpdateQuest from "../layout/UpdateProgress";
import DetailedIssue from "../layout/UpdateTask";
import DeleteTask from "../layout/Delete";

const TaskLayout = () => {
  const { projectId, issueId } = useParams();
  const navigate = useNavigate();
  const visibile = visibility();
  return (
    <div>
      <div className="flex-1 p-1">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-start-1  p-3 h-fit">
            <div className="flex flex-col gap-2 border-r">
              <div
                onClick={() => {
                  navigate(
                    `/project/${projectId}/overview/issue/${issueId}/details`
                  );
                }}
              >
                <h5 className="italic font-serif">Detail</h5>
              </div>
              <Separator orientation="horizontal" />
              <div
                onClick={() => {
                  navigate(
                    `/project/${projectId}/overview/issue/${issueId}/edit`
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
                    `/project/${projectId}/overview/issue/${issueId}/children`
                  );
                }}
              >
                <h5 className="italic font-serif">Children</h5>
              </div>
              <Separator orientation="horizontal" />
              <div
                onClick={() => {
                  navigate(
                    `/project/${projectId}/overview/issue/${issueId}/related-task `
                  );
                }}
              >
                <h5 className="italic font-serif">Related</h5>
              </div>
              <Separator orientation="horizontal" />
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <h5 className="italic font-serif text-destructive">
                      Delete
                    </h5>
                  </DialogTrigger>
                  <DeleteTask />
                </Dialog>
              </div>{" "}
              <Separator orientation="horizontal" />
            </div>
          </div>
          <div className="col-start-2 col-end-7 p-3 h-fit">
            <div>
              <Routes>
                <Route
                  index
                  element={
                    <Navigate
                      to={`/project/${projectId}/overview/issue/${issueId}/details`}
                      replace
                    />
                  }
                />
                <Route path="details" element={<DetailedIssue />} />
                <Route path="edit" element={<UpdateQuest />} />
                <Route path="related-task" element={<RelatedTaskList />} />
                <Route path="children" element={<SubIssue />} />
                <Route path="create-child" element={<CreateChildIssue />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskLayout;
