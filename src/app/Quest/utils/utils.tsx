export interface IIssue {
  id: string;
  name: string;
  complexity: string;
  issueType: string;
  progress: string;
  startDate: Date | any;
  endDate: Date | any;
  estimatedTimeInMinute: number;
  timeSpent: number;
  issueLevel: number;
  description: string|any
}

export interface IIssues {
  id: string;
  name: string;
  complexity: string;
  issueType: string;
  progress: string;
  issueLevel: number | any;
  startDate: Date;
  endDate: Date;
  subIssues?: IIssues[] | any;
}

export enum TaskComponent {
  Planning,
  Analysis,
  Design,
  Development,
  Testing,
  Documentation,
  Deployment,
  Monitoring,
  Coding,
}
