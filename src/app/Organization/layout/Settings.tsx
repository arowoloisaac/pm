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
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams();

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
                          `/organization/${organizationId}/settings/details`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">detail</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div>
                      <Dialog
                      >
                        <DialogTrigger asChild>
                          <h5 className="italic font-serif">edit</h5>
                        </DialogTrigger>
                        <EditOrganization />
                      </Dialog>
                    </div>
                    <Separator orientation="horizontal" />
                    <div
                      onClick={() => {
                        navigate(
                          `/organization/${organizationId}/settings/edit`
                        );
                      }}
                    >
                      <h5 className="italic font-serif">users</h5>
                    </div>
                    <Separator orientation="horizontal" />
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <h5 className="italic font-serif">delete</h5>
                        </DialogTrigger>
                        <DeleteOrganization />
                      </Dialog>
                    </div>
                  </div>
                </div>
                <div className="col-start-2 col-end-7 border p-3 h-fit">
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
