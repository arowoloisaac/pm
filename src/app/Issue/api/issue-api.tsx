import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";
import { IIssue, IIssues } from "../utils/utils";

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

const issueDetail = async (projectId:string, issueId: string) => {
  try {
    const response = await Axios.get(`${ApiUrl}/`)
    projectId
    issueId
    console.log(response)
  } catch (error:any) {
    console.error("Error fetching issue", error.message ||error)
    return error
  }
}

const createIssue = async ( e: React.MouseEvent<HTMLButtonElement>,{data, projectId} : {data:any, projectId: string|any}) : Promise<any> => {
e.preventDefault()
  try {
    const response = await Axios.post(`${ApiUrl}/project=${projectId}/create-issue`, data, {
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    return response
  } catch (error:any) {
    console.error("Error creating issue:", error.message || error)
    return error.response
  }
}


const createSubIssue = async (
  e: React.MouseEvent<HTMLButtonElement>,
  { data, projectId, issueId }: { data: any; projectId: string; issueId: string }
) => {
  e.preventDefault();
  try {
    const response = await Axios.post(
      `${ApiUrl}/project=${projectId}/issue=${issueId}/create-subIssue`,
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

const getIssueAndChildren = async (projectId: any): Promise<IIssues[]> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/projectId=${projectId}/issues`,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );
    return response.data;
  } catch (err: any) {
    return err;
  }
};

function mapTasks(apiResponse: any[]): IIssues[] | any {
  return apiResponse.map((issue) => ({
    id: issue.id, // Map API "id" to "TaskID"
    name: issue.name, // Map API "name" to "TaskName"
    startDate: issue.startDate, // Convert API field names
    endDate: issue.endDate,
    progress: issue.progress,
    subIssues: issue.subtasks ? mapTasks(issue.subtasks) : undefined, // Recursively map subtasks
  }));
}


// export interface IIssues {
//   id: string;
//   name: string;
//   complexity: string;
//   issueType: string;
//   progress: string;
//   startDate: string;
//   endDate: string;
//   subIssues?: IIssues[];
// }

export {
  subIssueList,
  relatedIssueList,
  createIssue,
  issueDetail,
  createSubIssue,
  getIssueAndChildren
};
