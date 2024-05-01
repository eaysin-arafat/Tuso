export interface IncidentPriority {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  priority: string;
}

export interface TypeIncidentPriority {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  data: Datum[];
  currentPage: number;
  totalRows: number;
}
interface Datum {
  oid: number;
  priority: string;
  dateCreated: string;
  createdBy: number;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}