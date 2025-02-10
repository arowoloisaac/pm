import React from "react";
import Axios from "axios";
import { ApiUrl, Token } from "@/components/Storage/Storage";

const editProject = ({ data, projectId }: { data: any, projectId:string}) => {
  console.log(data)
  const response = Axios.post("");
  return null;
};

const projectDetail = async (projectId: string) => {
  try {
    const response = await Axios.get(`${ApiUrl}`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
    return response.data;
  } catch (err) {
    
  }
};

export { editProject, projectDetail };
