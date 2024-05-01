export interface Team {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  title: string;
  description: string;
}

export interface TeamLead {}

export interface TypeTeam {
  team: Teams[];
  currentPage: number;
  totalRows: TotalRows;
}
interface TotalRows {
  result: number;
  id: number;
  exception?: any;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState?: any;
  isFaulted: boolean;
}
interface Teams {
  oid: number;
  title: string;
  description: string;
  dateCreated: string;
  createdBy?: any;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}