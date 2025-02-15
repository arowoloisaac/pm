import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import EditProject from "./EditProject";
import { Separator } from "@/components/ui/separator";
import ProjectDetail from "./ProjectDetail";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteProject from "./DeleteProject";
const Setting = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // console.log(projectId)
  return (
    <>
      <div>Setting</div>

      <div>
        <div>
          <div>
            <div className="flex-1 border p-1">
              <div className="grid grid-cols-5 gap-2">
                <div className="col-start-1 border p-3 h-fit">
                  <div className="flex flex-col gap-2 ">
                    <div
                      onClick={() => {
                        navigate(
                          `/project/${projectId}/overview/settings/details`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">Details</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div
                      onClick={() => {
                        navigate(
                          `/project/${projectId}/overview/settings/edit`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">Edit Project</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <h5
                            className="italic font-serif"
                          >
                            Delete Project
                          </h5>
                        </DialogTrigger>
                        <DeleteProject />
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-end-7 border p-3 h-fit">
                  <div>
                    <Routes>
                      <Route path="details" element={<ProjectDetail />} />
                      <Route path="edit" element={<EditProject />} />
                    </Routes>
                  </div>
                </div>
                {/* another route in here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
