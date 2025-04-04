import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";

const fetchProjectDetail = async (
  orgId: string,
  grpId: string,
  prtId:string,
): Promise<any> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization=${orgId}/get/project=${grpId}?groupId=${prtId}`,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );

    return response.data;
  } catch (error: any) {
    return error;
  }
};

const addUserToGroup = async ({
  event,
  orgId,
  grpId,
  mail,
  role,
}: {
  event: React.MouseEvent<HTMLButtonElement>;
  orgId: string;
  grpId: string;
  mail: string;
  role: string;
}): Promise<any> => {
  event.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/organization=${orgId}/group=${grpId}/add-user?userEmail=${mail}&roleName=${role}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error(error);
  }
};

export { fetchProjectDetail };
