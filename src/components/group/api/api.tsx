import Axios from "axios";
import { IGroup, IGroupUser } from "../utils/utils";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import React from "react";

const createGroup = async (
  // e: React.MouseEvent<HTMLButtonElement>,
  { data, organizationId }: { data: any; organizationId: string | any }
): Promise<any> => {
  // e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/org=${organizationId}/create?groupName=${data.groupName}`,
      {},
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

const retrieveGroup = async (id: string | any) => {
  try {
    const response = await Axios.get(`${ApiUrl}/organization/${id}/groups`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response;
  } catch (error: any) {
    return error.Message;
  }
};

const retrieveAdminGroupUsers = async (
  orgId: string,
  grpId: string
): Promise<IGroupUser[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization=${orgId}/group=${grpId}/users/admin`,
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

const retrieveGroupUsers = async (
  orgId: string,
  grpId: string
): Promise<IGroupUser[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/organization=${orgId}/group=${grpId}/users`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
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
  } catch (error: any) {}
};

const deleteGroup = async (event: React.MouseEvent, organizationId: string|any, groupId: string) => {
  event.stopPropagation();
  try {
    const request = await Axios.delete(
      `${ApiUrl}/org=${organizationId}/delete/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return request
  } catch (error: any) {
    return error;
  }
};

export {
  retrieveGroup,
  createGroup,
  retrieveAdminGroupUsers,
  retrieveGroupUsers,
  addUserToGroup,
  deleteGroup,
};
