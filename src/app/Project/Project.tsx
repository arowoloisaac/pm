import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
Separator;

const Project = () => {
  return (
    <>
      <div className="container">
        <div className="flex">
          <Button >
            <Plus />
            Add
          </Button>
        </div>
        {/* this will have search bar */}
        <div className="flex flex-1 flex-col gap-5"></div>
        <div className="container">
          <div className="grid min-[360px]:grid-cols-1 sm:max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-5">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Project Title</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className=" flex items-center space-x-4 rounded-md border p-4">
                    <div className="flex-1 space-y-1">
                      <CardDescription>project description</CardDescription>
                    </div>
                  </div>
                </CardContent>
                <Separator className="my" />
                <CardFooter>
                  <div className="flex-1">
                    <div className="flex">
                      <div className="basis-10/12">
                        <CardDescription>01</CardDescription>
                      </div>

                      <div className="pr-3">
                        <Separator orientation="vertical" />
                      </div>

                      <div className="basis-1/2">
                        <CardDescription>01</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
