export interface IProject {
    id: string,
    name: string,
    description: string
    dateCreated: string,
    complexity: string
}

export interface ProjectLayoutProps {
  items: IProject[];
}


export interface IPaginate {
  start: string,
  end: string,
  size: string,
  totalItems: string
}