export interface IIssue {
  id: string;
  name: string;
  complexity: string;
  issueType: string;
  progress: string;
  startDate: string;
  endDate: string;
}



export interface IIssues {
  id: string;
  name: string;
  complexity: string;
  issueType: string;
  progress: string;
  startDate: string;
  endDate: string;
  subIssues?: IIssues[] | any
}