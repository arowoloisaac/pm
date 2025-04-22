import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";
import React from "react";
import {
  IOrganization,
  IOrganizationGroup,
  IOrganizationUser,
  IRequestUser,
} from "../utils/utils";

const getOrganization = async (id: string | any): Promise<IOrganization> => {
  try {
    const response = await Axios.get(`${ApiUrl}/organization/${id}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

const createOrganization = async (
  event: React.MouseEvent<HTMLButtonElement>,
  data: any
) => {
  event.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/organization/create-organization`,
      data,
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

const editOrganization = async (
  event: any,
  data: any,
  id: string | any
): Promise<any> => {
  event.preventDefault();

  try {
    const response = await Axios.put(
      `${ApiUrl}/organization/${id}/update`,
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

const deleteOrganization = async (
  event: any,
  id: string | any
): Promise<any> => {
  // event.preventDefault();

  try {
    const response = await Axios.delete(`${ApiUrl}/organization/${id}/delete`, {
      headers: { Authorization: `Bearer ${Token}` },
    });

    return response;
  } catch (err: any) {
    return err;
  }
};

const getOrganizations = async (id: string | any): Promise<IOrganization[]> => {
  try {
    const respone = await Axios.get(`${ApiUrl}/organization=${id}/users`, {
      headers: { Authorization: `Bearer ${Token}` },
    });
    return respone.data;
  } catch (error: any) {
    return error;
  }
};

const getOrganizationUsers = async (
  id: string | any
): Promise<IOrganizationUser[]> => {
  try {
    const response = await Axios.get(`${ApiUrl}/organization=${id}/users`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    return err.Message;
  }
};

const getOrganizationGroup = async (
  id: string | any
): Promise<IOrganizationGroup[]> => {
  try {
    const response = await Axios.get(`${ApiUrl}/org=${id}/groups`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.Message;
  }
};

const sentRequests = async (id: string | any): Promise<IRequestUser[]> => {
  try {
    const response = await Axios.get(`${ApiUrl}/organization/${id}/request`, {
      headers: { Authorization: `Bearer ${Token}` },
    });
    return response.data;
  } catch (error: any) {
    return error;
  }
};

const removeSentRequest = async (
  event: any,
  id: string | any,
  requestEmail: string
) => {
  event.preventDefault();
  try {
    const encodedEmail = encodeURIComponent(requestEmail);
    const response = await Axios.delete(
      `${ApiUrl}/organization/${id}/invite=${encodedEmail}`,
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

const sendRequest = async (event: any, id: string | any, email: string) => {
  event.preventDefault();
  try {
    // const encodedEmail = encodeURIComponent(requestEmail);
    const response = await Axios.post(
      `${ApiUrl}/organization/${id}/invite=${email}`,{},
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


// const retrieveGroup = async (id: string | any) => {
//   try {
//     const response = await Axios.get(`${ApiUrl}/org=${id}/groups`, {
//       headers: {
//         Authorization: `Bearer ${Token}`,
//       },
//     });
//     return response;
//   } catch (error: any) {
//     return error.Message;
//   }
// };

export {
  // retrieveGroup,
  getOrganization,
  createOrganization,
  editOrganization,
  deleteOrganization,
  getOrganizations,
  getOrganizationUsers,
  getOrganizationGroup,
  sentRequests,
  removeSentRequest,
  sendRequest
};
