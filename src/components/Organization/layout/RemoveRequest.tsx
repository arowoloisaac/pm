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
import { removeSentRequest } from "../api/api";
import { useParams } from "react-router-dom";

const RemoveRequest = ({requestMail} : { requestMail: string}) => {
  const { toast } = useToast();
  const { organizationId } = useParams<{organizationId: string | any}>();
  /*const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  useEffect(() => {
    handleCheckboxChange;
  }, [isChecked]);*/

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Project </DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke this request. Changes can not be
            reversed when clicked.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <h5>{requestMail}</h5>
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4 ">
            <div className="flex justify-end">
              <Checkbox id="terms" onCheckedChange={handleCheckboxChange} />
            </div>
            <Label htmlFor="terms" className="col-span-3">
              I agree with the terms
            </Label>{" "}
          </div> */}
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            // disabled={!isChecked}
            onClick={async (e: any) => {
              const response = await removeSentRequest(
                e,
                organizationId,
                requestMail
              );
              if (response.status === 200) {
                toast({
                  title: "Action Status ",
                  description: response.data,
                });
              } else {
                toast({
                  variant: "destructive",
                  title: "Action Status",
                  description: "Unable to revoke request, due to system error ",
                });
              }
            }}
          >
            Revoke Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default RemoveRequest;
