import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";
import { IIssue } from "../utils/utils";

const subIssueList = async (
  projectId: string,
  issueId: string
): Promise<IIssue[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/parentId=${issueId}?projectId=${projectId}`,
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

const relatedIssueList = () => {
    
}

const issueDetail = async (id: string) => {
  try {
    const response = await Axios.get(`${ApiUrl}/`)
  } catch (error:any) {
    console.error("Error fetching issue", error.message ||error)
    return error
  }
}

const createIssue = async ( e: React.MouseEvent<HTMLButtonElement>,{data, projectId} : {data:any, projectId: string}) => {
e.preventDefault()
  try {
    const response = await Axios.post(`${ApiUrl}/project=${projectId}/ceate-issue`, data, {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    return response.status
  } catch (error:any) {
    console.error("Error creating issue:", error.message || error)
  }
}

export { subIssueList, relatedIssueList, createIssue, issueDetail };
