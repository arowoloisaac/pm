import React from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { IProject, ITimeline } from "../utils/utils";
import { IIssue, IIssues } from "@/components/Task/utils/utils";

const editProject = async (
  e: React.MouseEvent<HTMLButtonElement>,
  { data, projectId }: { data: any; projectId: string | any }
): Promise<any> => {
  e.preventDefault();
  try {
    const response = await Axios.put(
      `${ApiUrl}/project/edit/${projectId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response;
  } catch (err) {
    return err;
  }
};

const projectTimeline = async (
  projectId: string | any
): Promise<ITimeline[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/project/${projectId}/timeline`,
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

const projectDetail = async (projectId: string | any): Promise<IProject> => {
  try {
    const response = await Axios.get(`${ApiUrl}/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error("Error with: ", err);
    return err;
  }
};

const deleteProject = async (e: React.MouseEvent, projectId: any) => {
  e.stopPropagation();
  try {
    const response = await Axios.delete(
      `${ApiUrl}/project/delete/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    return response.status;
  } catch (err: any) {
    return err.status;
  }
};

// function: aids in displaying calendar data
const projectIssues = async (projectId: any): Promise<IIssue[]> => {
  try {
    const response = await Axios.get(`${ApiUrl}/project=${projectId}/default`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return err;
  }
};

//function: aids in displaying the gannt data
const projectGanntIssue = async (id: string): Promise<IIssues[]> => {
  try {
    const response = await Axios.get(`${ApiUrl}/project/${id}/issues`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    return err;
  }
};

const createWiki = async (e: React.MouseEvent<HTMLButtonElement>, id: string, data: {}) => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/project/${id}/wiki/create`,
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

const fetchWiki = async (projectId: string|any, wikiId: string|any) => {
  try {
    const request = await Axios.get(
      `${ApiUrl}/project/${projectId}/wiki/${wikiId}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return request;
  } catch (error: any) {
    return error;
  }
};

export {
  editProject,
  projectDetail,
  deleteProject,
  projectTimeline,
  projectIssues,
  projectGanntIssue,
  createWiki,
  fetchWiki,
};
