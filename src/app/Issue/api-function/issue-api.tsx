import { ApiUrl, Token } from "@/components/Storage/Storage";
import Axios from "axios";
import { IIssue } from "../utils/utils";

const subIssueList = async (
  projectId: string,
  issueId: string
): Promise<IIssue[] | any> => {
  try {
    const response = await Axios.get(
      `${ApiUrl}/parentId=${issueId}?projectId=${projectId}`,
      {
        headers: { Authorization: `Bearer ${Token}` },
      }
    );
    return response.data;
  } catch (err: any) {
    console.error("Error fetching profile:", err.message || err);
    return null;
  }
};

export { subIssueList };
