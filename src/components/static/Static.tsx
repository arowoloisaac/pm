"use client";
import Theme from "@/components/Theme";
import { Button } from "@/components/ui/button";
const LandingPage = () => {
  return (
    <>
      <div className="w-full">
        <div className=" mx-auto h-14 bg-slate-950">
          <div className="flex flex-row">
            <div
              className="basis-1/3 text-red-100 text-start"
              style={{ paddingTop: "10px", paddingLeft: "10px" }}
            >
              Logo
            </div>
            <div className="basis-1/2"></div>
            <div className="flex gap-1 text-end" style={{ paddingTop: "10px" }}>
              <a href="/login">
                <Button variant={"outline"}>Login</Button>
              </a>
              <a href="/register">
                <Button variant={"outline"}>Register</Button>
              </a>

              <Theme />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
