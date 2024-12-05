import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <>
      <div className="w-full">
        <div className=" mx-auto h-14 bg-slate-950">
          <div className="flex flex-row">
            <div
              className="basis-1/3 text-red-100 text-start"
              style={{ paddingTop: "10px" }}
            >
              Logo
            </div>
            <div className="basis-1/2"></div>
            <div className="flex gap-1 text-end" style={{ paddingTop: "10px" }}>
              <Button variant={"outline"}>Login</Button>
              <Button variant={"outline"}>Register</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default LandingPage