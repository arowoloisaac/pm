import { IIssue, IIssues } from "@/components/Task/utils/utils";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";

const fetchProjectDetail = async (
  orgId: string,
  grpId: string,
  prtId: string
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
    alert(error);
  }
};

const projectGanttIssue = async (
  organizationId: string,
  groupId: string,
  projectId: string
): Promise<IIssues[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issues`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    return err;
  }
};

// function: aids in displaying calendar data
const retrieveProjectCalendar = async (
  projectId: string,
  organizationId: string,
  groupId: string
): Promise<IIssue[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/default`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response.data;
  } catch (err: any) {
    return err;
  }
};

export { fetchProjectDetail, projectGanttIssue, retrieveProjectCalendar };
