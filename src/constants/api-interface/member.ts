export interface Member {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  userAccountId?: number;
  teamId?: number;
  userAccountName?: string;
  surName?: string;
  isTeamLead: boolean;
}

export interface TypeMember {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  members: Members[];
  currentPage: number;
  totalRows: number;
}
interface Members {
  oid: number;
  userAccountId: number;
  userAccountName: string;
  surName: string;
  teamId: number;
  dateCreated: string;
  teamName: string;
  createdBy?: any;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
  isTeamLead?: boolean;
}

export interface MemberTypes {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  oid: number;
  userAccountId: number;
  teamId: number;
  dateCreated?: any;
  createdBy?: any;
  dateModified: string;
  modifiedBy: number;
  isDeleted: boolean;
}
