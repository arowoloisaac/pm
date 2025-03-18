import Axios from "axios";
import { IGroup } from "../utils/utils";
import { ApiUrl, Token } from "@/components/Storage/Storage";

const createGroup = async (
  e: React.MouseEvent<HTMLButtonElement>,
  { data, organizationId }: { data: any; organizationId: string | any }
): Promise<any> => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/org=${organizationId}/create?groupName=${data.groupName}`,{},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    console.error("Error creating issue:", error || error);
    return error;
  }
};

const retrieveGroup = async (id: string | any) => {
  try {
    const response = await Axios.get(`${ApiUrl}/org=${id}/groups`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error.Message;
  }
};


export {retrieveGroup, createGroup} 