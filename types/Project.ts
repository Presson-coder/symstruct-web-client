export interface Project {
  _id?: string;
  owner: ProjectOwner;
  Name: string;
  Description: string;
  Location: Location;
  Categories: string[];
  Duration: number;
  CompletionDate: Date | string;
  Images: string[] | any;
  Status?: string;
}

export interface ProjectOwner {
  _id: string;
  name: string;
}

export interface Location {
  lng: number;
  lat: number;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  name?: string;
  details?: string;
}

export interface ClientProject {
  serviceProviderId: string;
  clientId: string;
  clientProjectDetails: {
    projectDescription: string;
    projectBudget: number;
  };
  projectTargetDate:
    | "WITHIN_NEXT_FEW_DAYS"
    | "WITHIN_NEXT_WEEK"
    | "IN_A_MONTH_OR_MORE"
    | "NOT_SURE_YET";
  projectLocation: Location;
}
