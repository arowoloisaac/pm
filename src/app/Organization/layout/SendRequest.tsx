import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { sendRequest } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SendRequest = () => {
  const [getEmail, setEmail] = useState<string>("");
  const { organizationId } = useParams<{ organizationId: string }>();
  const encodedEmail = encodeURIComponent(getEmail);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSendRequestToUser = async (event: any) => {
    try {
      const response = await sendRequest(event, organizationId, encodedEmail);
      // console.log(response)
      if (response.status === 200) {
        toast({
          title: "request sent ",
          description: response.data,
        });
        const id = response.data;

        navigate(`/organization/${organizationId}/requests`);
        window.location.reload()
      } else {
        toast({
          title: "Error sending request ",
          description: response.data,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Request To User</DialogTitle>
          <DialogDescription>
            The request will be received by the user via their mail and visible
            on their dashboard. Click send when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              placeholder="receiver@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSendRequestToUser}>Send request</Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default SendRequest;
