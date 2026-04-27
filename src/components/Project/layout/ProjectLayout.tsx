import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { IProject } from "../utils/utils";
import Loader from "@/components/loader";
import { deleteProject } from "../api/project-api";
import { useToast } from "@/hooks/use-toast";

const ProjectLayout = ({
  items,
  isLoading,
}: {
  items: IProject[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClick = (id: string) => {
    navigate(`/project/${id}/overview`);
  };

  const handleDelete = async (e: any, id: string) => {
    const statusCode = await deleteProject(e, id);
    if (statusCode === 200) {
      toast({
        title: "Action Status ",
        description: "Project successfully deleted",
      });

      window.location.reload();
    } else {
      toast({
        variant: "destructive",
        title: "Action Status",
        description: "Unable to Delete Project, due to system error ",
      });
      // window.location.reload();
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {items.length === 0 ? (
            <div className="lg:mx-[100px] h-[500px] border-2 content-center">
              <div className=" flex flex-row justify-center">
                <div>
                  <span>
                    <h2 className="font-serif text-pretty font-bold">
                      No project :{" "}
                      <a className="italic underline" href="/project/create">
                        Create Project
                      </a>
                    </h2>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid max-[500px]:grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
              {items.map((project) => (
                <div>
                  <div id={project.id}>
                    <Card
                      onClick={() => {
                        handleClick(project.id);
                      }}
                    >
                      <CardHeader>
                        <CardTitle>
                          <div className="flex justify-between items-stretch">
                            <div>
                              {project.name.slice(0, 25)}
                              {project.name.length > 25 ? <>...</> : <></>}
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
                                    <DropdownMenuItem>
                                      Assign to
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Set due date
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                      onClick={(event: any) => {
                                        handleDelete(event, project.id);
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
                              {project.overview.slice(0, 30)}
                              {project.overview.length > 30 ? (
                                <>.........</>
                              ) : project.overview.length < 30 &&
                                project.overview.length > 1 ? (
                                <></>
                              ) : (
                                <span>
                                  <strong>No project overview</strong>
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
                            <div className="basis-1/2 max-[400px]:basis-2/5">
                              <CardDescription>
                                {project.complexity}
                              </CardDescription>
                            </div>
                            <div className="pr-3">
                              <Separator orientation="vertical" />
                            </div>
                            <div className="basis-1/2 max-[400px]::basis-10/12">
                              <CardDescription>
                                {project.progress}
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
          )}
        </div>
      )}
    </>
  );
};

export default ProjectLayout;
