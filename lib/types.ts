export type Priority = "High" | "Medium" | "Low";

export type Status = "Open" | "Pending" | "In Progress" | "Closed";

export type RootCause5MKey =
  | "man"
  | "machine"
  | "material"
  | "method"
  | "milieu";

export interface RootCause5M {
  man: string;
  machine: string;
  material: string;
  method: string;
  milieu: string;
}

export interface Inspection {
  id: string;
  ticketId: string;
  date: string;
  area: string;
  equipment: string;
  inspector: string;
  priority: Priority;
  status: Status;
  description: string;
  rootCause5M: RootCause5M;
  correctiveAction: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
}
