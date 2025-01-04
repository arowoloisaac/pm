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


export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate: string;
  avatarUrl: string;
}