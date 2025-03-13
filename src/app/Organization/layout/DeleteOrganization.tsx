"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrganization } from "../api/api";

const DeleteOrganization = () => {
  const { organizationId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    handleCheckboxChange;
  }, [isChecked]);

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Organization </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this organization. Changes can not be
            reversed when deleted!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 ">
            <div className="flex justify-end">
              <Checkbox id="terms" onCheckedChange={handleCheckboxChange} />
            </div>
            <Label htmlFor="terms" className="col-span-3">
              I agree with the terms
            </Label>{" "}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            disabled={!isChecked} //check this if any issue later on
            onClick={async (e: any) => {
              const statusCode = await deleteOrganization(e, organizationId);

              if (statusCode === 200) {
                toast({
                  title: "Action Status ",
                  description: "Organization successfully deleted",
                });

                navigate(`/organizations`);
              } else {
                toast({
                  variant: "destructive",
                  title: "Action Status",
                  description:
                    "Unable to Delete Organization, due to system error ",
                });
                navigate("/organizations")
                window.location.reload();
              }
            }}
          >
            Delete Organization
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default DeleteOrganization;
