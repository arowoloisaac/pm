import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

const Project = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <div className="w-full ">
        <div className="container mx-auto  px-4  pb-4">
          <div className="flex flex-row justify-end pb-1">
            <Button>
              <Plus />
              Add
            </Button>
          </div>

          <div className="py-1">
            {/* Collapsible Search Bar */}
            <div className="border border-gray-300 ">
              {/* Toggle Button (visible on small screens) */}
              <div className="flex justify-between items-center bg-gray-200 p-4 md:hidden">
                <h2 className="text-lg font-medium">Search</h2>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  {isCollapsed ? "Expand" : "Collapse"}
                </button>
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isCollapsed ? "max-h-0" : "max-h-[500px]"
                } md:max-h-full`}
              >
                <div className="flex flex-wrap md:flex-nowrap items-center gap-4 p-2">
                  <div className="flex flex-auto flex-wrap md:flex-nowrap gap-4 ">
                    <Select>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-300 rounded">
                        <SelectValue placeholder="Filter by progress" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Progress</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select>
                      <SelectTrigger className="w-full md:w-44 p-2 border border-gray-300 rounded">
                        <SelectValue placeholder="filter by Complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Complexity</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search Button */}
                  <div className="flex justify-end">
                    <Button className="w-full md:w-auto px-4 py-2 rounded">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* for displaying the project container */}
          <div className="container mx-auto border-2 px-4 py-4">
            <div className="grid max-[500px]:grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
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
          <div className="p-0.5"></div>
          {/* pagination */}
          <div className="container mx-auto  border-2 px-4 py-4">
            <div className="flex flex-auto flex-row">
              <div className="flex-1  justify-start">
                <p className="pt-2">Projects: 1004</p>
              </div>
              <div className="justify-end ">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationLink>
                        <Button>
                          <ChevronLeft />
                        </Button>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="px-2">1-12</PaginationItem>
                    <PaginationItem>
                      <PaginationLink>
                        <Button>
                          <ChevronRight />
                        </Button>
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Project;
