export interface INavigationItem {
  label: string;
  to: string;
}

export interface INavigationItemPayload {
  type: "employee" | "cvs";
  id: number;
}
