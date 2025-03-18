export interface IOrganization {
  id: string;
  name: string;
  description: string;
  role: string;
  creator: string;
  dateCreated: Date;
  dateJoined: Date;
}

export interface IOrganizationUser {
  userId: string;
  userImage: string;
  userName: string;
  userEmail: string;
  userRole: string;
}

export interface IOrganizationGroup {
  id: string;
  name: string;
  description: string
}

export interface IOrganizationProject {
  id: string;
  name: string;
  overview: string;
  description: string;
  assignedTo: string;
  progress: string;
  complexity: Date;
  dateCreated: Date;
}

export interface IRequestUser {
  id: string;
  name: string;
  email: string;
}