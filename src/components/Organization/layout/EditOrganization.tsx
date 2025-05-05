"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IOrganization } from "../utils/utils";
import { getOrganization } from "../api/api";

const EditOrganization = () => {
  const { organizationId } = useParams<string>();
    const [getDetails, setDetails] = useState<IOrganization | any>({});
  
    const fetchOrganizationDetails = async (): Promise<IOrganization | any> => {
      const data = await getOrganization(organizationId);
      data ? setDetails(data) : null;
    };
  
    useEffect(()=> {
      fetchOrganizationDetails()
    }, [getDetails])

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Organization</DialogTitle>
        <DialogDescription>
          Make changes to your organization here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input id="name" defaultValue={getDetails.name} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Overview
          </Label>
          <Input id="username" defaultValue={getDetails.description} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default EditOrganization;
