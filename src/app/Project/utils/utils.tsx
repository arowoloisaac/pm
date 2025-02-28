export interface IProject {
  id: string;
  name: string;
  overview: string,
  description: string;
  progress: string;
  complexity: string;
}

export interface ProjectLayoutProps {
  items: IProject[];
}

export interface IPaginate {
  start: string;
  end: string;
  size: string;
  totalItems: string;
  current: number | any;
  count: number | any;
}

export interface ITimeline {
  id: string;
  issueName: string;
  comment: string;
  note: string;
  createdDate: string;
  updatedDate: string;
}


export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  avatarUrl: string;
}