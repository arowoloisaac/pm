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
  issueLevel: number|any,
  startDate: Date;
  endDate: Date;
  subIssues?: IIssues[] | any
}