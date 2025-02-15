import React from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";
import { IProject } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const editProject = async (
  e: React.MouseEvent<HTMLButtonElement>,
  { data, projectId }: { data: any; projectId: string | any }
) => {
  const navigate = useNavigate();
  e.preventDefault();
  try {
    const response = await Axios.put(
      `${ApiUrl}/project/update/${projectId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/");
      window.location.reload();
    }
  } catch (err) {
    console.error("Error with:", err);
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

const deleteProject = async (
  e: React.MouseEvent<HTMLButtonElement>,
  projectId: any
) => {
  e.preventDefault();
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

export { editProject, projectDetail, deleteProject };
