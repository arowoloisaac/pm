import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IOrganization } from "../utils/utils";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateOrganization from "./CreateOrganization";
import Loader from "@/components/loader";
import { deleteOrganization } from "../api/api";
import { useToast } from "@/hooks/use-toast";

const OrganizationList = ({
  items,
  isLoading,
}: {
  items: IOrganization[];
  isLoading: boolean;
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/organization/${id}`);
  };

  const handleDeleteOrganization = async (
    id: string,
    event: React.MouseEvent
  ) => {
    try {
      event.stopPropagation();
      const response = await deleteOrganization(event, id);
      if (response.status === 200) {
        toast({
          title: "Successfully Deleted Organization",
        });
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Delete Unsuccessful",
        // description: error.respon,
        variant: "destructive",
      });
    }
  };
  console.log(items);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="grid max-[500px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
            {items.map((Organization) => (
              <div>
                <div key={Organization.id}>
                  <Card
                    onClick={() => {
                      handleClick(Organization.id);
                    }}
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex justify-between items-stretch">
                          <div>
                            {Organization.name}
                            {Organization.name.length > 25 ? <>...</> : <></>}
                          </div>
                          <div className="self-start">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-px">
                                  <MoreHorizontal />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[150px]"
                              >
                                <DropdownMenuGroup>
                                  <DropdownMenuItem>Assign to</DropdownMenuItem>

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      handleDeleteOrganization(
                                        Organization.id,
                                        e
                                      );
                                    }}
                                    className="text-red-600"
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                          <CardDescription>
                            {Organization.description.slice(0, 30)}
                            {Organization.description.length > 30 ? (
                              <>.........</>
                            ) : Organization.description.length < 30 &&
                              Organization.description.length > 1 ? (
                              <></>
                            ) : (
                              <span>
                                <strong>No Organization overview</strong>
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                    </CardContent>
                    <Separator className="my" />
                    <CardFooter>
                      <div className="flex-1">
                        <div className="flex">
                          <div className="basis-1/2 max-[500px]:basis-2/5">
                            <CardDescription>
                              {Organization.role === "OrganizationAdministrator"
                                ? "Administrator"
                                : "Member"}
                            </CardDescription>
                          </div>
                          <div className="pr-3">
                            <Separator orientation="vertical" />
                          </div>
                          <div className="basis-1/2 max-[400px]::basis-10/12">
                            <CardDescription>
                              {" "}
                              {Organization.creator === "owned"
                                ? "Personal"
                                : "Joined"}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrganizationList;
