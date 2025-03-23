import Axios from "axios";
import { ApiUrl, Token } from "../Storage/Storage";

const organizationRole = async (orgId: string) => {
  try {
    const response = await Axios.get(`${ApiUrl}/organization/${orgId}/user`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

const groupRole = async ({
  orgId,
  grpId,
}: {
  orgId: string;
  grpId: string;
}) => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization/${orgId}/group/${grpId}/user`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};

export { groupRole, organizationRole };
