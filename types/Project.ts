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