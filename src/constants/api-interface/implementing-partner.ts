export interface ImplementingPartner {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  implementingPartnerName: string;
  projectId?: number;
}

export interface TypeImplementingPartner {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}

interface Data {
  implementions: Implemention[];
  currentPage: number;
  totaRows: number;
}

export interface ImplementingPartnerOptions {
  statusCode: number;
  message: string;
  data: Implemention[];
  isSuccess: boolean;
}
interface Implemention {
  oid: number;
  implementingPartnerName: string;
  projectId: number;
  dateCreated: string;
  createdBy: number;
  dateModified: any;
  modifiedBy: any;
  isDeleted: boolean;
}