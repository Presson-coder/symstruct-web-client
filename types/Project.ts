export interface Project {
  _id?: string;
  Name: string;
  Description: string;
  Location: Location;
  Categories: string[];
  Duration: number;
  CompletionDate: Date | string;
  Images: string[] | any;
  Status?: string;
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
  projectDescription: string;
  projectBudget: number;
  projectTargetDate:
    | "Within the next few days"
    | "Within the next week"
    | "In a month or more"
    | "Not sure yet";
  projectLocation: Location;
}
