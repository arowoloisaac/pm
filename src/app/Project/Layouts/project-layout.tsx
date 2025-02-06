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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { IProject } from "../utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const ProjectLayout = ({
  items,
  isLoading,
}: {
  items: IProject[];
  isLoading: boolean;
}) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/project/overview/${id}`);
  };
  return (
    <>
      {isLoading ? (
        <div className="h-96 content-center">
          <div className=" flex flex-row justify-center">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {items.length === 0 ? (
            <div className="h-96 content-center">
              <div className=" flex flex-row justify-center">
                <div>
                  <span>
                    <h2 className="font-serif">No created projects yet</h2>
                  </span>
                  <div className="flex justify-center">
                    {" "}
                    <a className="italic underline" href="/project/create">
                      Create Project
                    </a>
                  </div>
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
                        // console.log(project.id);
                        handleClick(project.id)
                      }}
                    >
                      <CardHeader>
                        <CardTitle>
                          <div className="flex justify-between items-stretch">
                            <div>{project.name}</div>
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
                                  {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                                  <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                      Assign to
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      Set due date
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuSub>
                                      <DropdownMenuSubTrigger>
                                        Apply label
                                      </DropdownMenuSubTrigger>
                                      <DropdownMenuSubContent className="p-0"></DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
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
                                {" "}
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
