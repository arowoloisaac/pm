"use client";
import SubIssue from "./SubIssue";
import { Button } from "@/components/ui/button";

import "../utils/styles.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const DetailedIssue = () => {
  return (
    <>
      <div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
        <div>
          <div className="flex border gap-2 p-2">
            <div className="basis-1/5 flex items-start">Child Issues</div>
            <div className="basis-2/3 flex-auto pr-5 pl-10">
              <SubIssue />
              <SubIssue />
              <SubIssue />
            </div>
            <div className="basis-1/8 flex items-end text-right add-child-container">
              <div className="flex-auto ">
                <Button>Add child</Button>
              </div>
            </div>
          </div>
          {/* Related Task */}
          <div className="flex border gap-2 p-2">
            <div className="basis-1/5 flex items-center">Related Issues</div>
            <div className="basis-2/3 flex-auto pr-5 pl-10">
              {/* <SubIssue />
              <SubIssue /> */}
            </div>
            <div className="basis-1/8 flex items-center text-right add-child-container">
              <div className="flex-auto ">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Related Issue</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Add Related Issue</DialogTitle>
                      <DialogDescription>
                        Add Related issue to this issue here
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Parent Issue
                        </Label>
                        <span id="name">Id of issue</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Child Issue
                        </Label>
                        <Select>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Add Task" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Fruits</SelectLabel>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Issue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default DetailedIssue;
