"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import OrganizationDetails from "./OrganizationDetails";
import DeleteOrganization from "./DeleteOrganization";
import EditOrganization from "./EditOrganization";

const Settings = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams();

  return (
    <>
      <div className="prose p-2">
        <h3 className="text-md font-bold">Setting</h3>
      </div>
      <div>
        <div>
          <div>
            <div className="flex-1 p-1">
              <div className="grid grid-cols-5 gap-2">
                <div className="col-start-1 p-3 h-fit">
                  <div className="flex flex-col gap-2 ">
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/settings/details`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">detail</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <h5 className="italic font-serif">edit</h5>
                        </DialogTrigger>
                        <EditOrganization />
                      </Dialog>
                    </div>
                    <Separator orientation="horizontal" />

                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <h5 className="italic font-serif text-red-500">
                            delete
                          </h5>
                        </DialogTrigger>
                        <DeleteOrganization />
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-end-7 border-l p-3 h-fit">
                  <div>
                    <Routes>
                      <Route
                        index
                        element={
                          <Navigate
                            to={`/organization/${organizationId}/settings/details`}
                            replace
                          />
                        }
                      />
                      <Route path="details" element={<OrganizationDetails />} />
                      {/* <Route path="edit" element={<EditProject />} /> */}
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

export default Settings;
