import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";
import { IIssue } from "../utils/utils";

const createTask = async (
  e: React.MouseEvent<HTMLButtonElement>,
  organizationId: string | any,
  groupId: string | any,
  projectId: string | any,
  data: {}
) => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/create-issue`,
      data,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );

    return response;
  } catch (error: any) {
    return error;
  }
};

const createChildTask = async (
  e: React.MouseEvent<HTMLButtonElement>,
  {
    data,
    projectId,
    issueId,
    organizationId,
    groupId,
  }: {
    data: any;
    projectId: string;
    issueId: string;
    organizationId: string | any;
    groupId: string | any;
  }
) => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/create-subIssue`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.status;
  } catch (error: any) {
    console.error("Error creating sub issue:", error.message || error);
  }
};

const subTaskList = async (
  projectId: string,
  issueId: string,
  organizationId: string,
  groupId: string
): Promise<IIssue[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/parent/${issueId}`,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching issues:", err.message || err);
    // return null;
    return err;
  }
};

const taskDetail = async (
  projectId: string,
  issueId: string,
  organizationId: string,
  groupId: string
): Promise<IIssue> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return error;
  }
};

const updateTask = async (
  e: React.MouseEvent<HTMLButtonElement>,
  projectId: any,
  issueId: any,
  organizationId: string,
  groupId: string,
  data: {}
) => {
  e.preventDefault();
  try {
    const response = await Axios.put(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/update`,
      data,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );
    return response;
  } catch (error: any) {
    return error;
  }
};


const updateTaskProgress = async (
  e: React.MouseEvent<HTMLButtonElement>,
  projectId: any,
  issueId: any,
  organizationId: string,
  groupId: string,
  data: {} | any
): Promise<any> => {
  e.preventDefault();
  try {
    const response = await Axios.put(
      `${ApiUrl}/organization/${organizationId}/group/${groupId}/project/${projectId}/issue/${issueId}/update`,
      data,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );

    return response;
  } catch (error: any) {
    return error;
  }
};

export {
  createTask,
  createChildTask,
  subTaskList,
  taskDetail,
  updateTask,
  updateTaskProgress,
};
