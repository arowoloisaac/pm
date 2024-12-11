import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IProject } from "../utils";

const ProjectLayout = ({ items }: { items: IProject[] }) => {
  return (
    <>
      {items.length === 0 ? (
        <div>no project yet</div>
      ) : (
        items.map((project) => (
          <div id={project.id}>
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
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
        ))
      )}
   
    </>
  );
};

export default ProjectLayout;
