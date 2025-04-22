// "use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { IOrganizationUser } from "@/components/Organization/utils/utils";
import { getOrganizationUsers } from "@/components/Organization/api/api";
import { useParams } from "react-router-dom";
import { addUserToGroup } from "../api/api";
import { useToast } from "@/hooks/use-toast";

const Role = [
  {
    label: "Administrator",
    value: "GroupAdministrator",
  },
  {
    label: "Member",
    value: "GroupUser",
  },
];

const AddUser = () => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const { organizationId, groupId } = useParams<{
    organizationId: string | any;
    groupId: string | any;
  }>();

  const [getOrgUsers, setOrgUsers] = React.useState<IOrganizationUser[]>([]);

  const fetchOrganizationUsers = async (): Promise<
    IOrganizationUser[] | any
  > => {
    try {
      const data = await getOrganizationUsers(organizationId);
      data ? setOrgUsers(data) : null;
    } catch (error: any) {
      alert("fix it later");
    }
  };

  React.useEffect(() => {
    fetchOrganizationUsers();
  }, [getOrgUsers]);

  const [getUser, setUser] = React.useState("");
  const [getRole, setRole] = React.useState("");

  const encodedEmail = encodeURIComponent(getUser);

  const handleAddUserToGroup = async (event: any) => {
    try {
      const response = await addUserToGroup({
        event: event,
        orgId: organizationId,
        grpId: groupId,
        mail: encodedEmail,
        role: getRole,
      });
      if (response.status === 200) {
        toast({
          title: "Group Created ",
          description: response.data,
        });
        window.location.reload();
      } else {
        toast({
          title: "Error adding user to group",
          //   description: response.data,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error adding user to group ",
        // description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>
          Add user to the organization's group. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="col-span-3 justify-between"
              >
                {getUser
                  ? getOrgUsers.find((user) => user.userEmail === getUser)
                      ?.userName
                  : "Select user..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="col-span-2 p-0">
              <Command>
                <CommandInput placeholder="Search user..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {getOrgUsers.map((user) => (
                      <CommandItem
                        key={user.userId}
                        value={user.userEmail}
                        onSelect={(currentValue) => {
                          setUser(currentValue === getUser ? "" : currentValue);
                          //   setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {user.userName}
                        <Check
                          className={cn(
                            "ml-auto",
                            getUser === user.userEmail
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Select onValueChange={(event) => setRole(event)}>
            <SelectTrigger className=" col-span-3">
              <SelectValue placeholder="Select User Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                {Role.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={handleAddUserToGroup}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddUser;
