export interface IGroup {
  id: string;
  name: string;
  projectCount: number;
}

export interface IGroupUser {
  id: string;
  userImage: string;
  name: string;
  email: string;
  role: string;
}
