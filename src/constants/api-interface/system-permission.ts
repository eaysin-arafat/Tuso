export interface SystemPermissionDataType {
  oid: number;
  systemPermissionId: number;
  userAccountId: number;
  username: string;
  systemName: string;
  systemId: number;
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface TypeSystemPermissionByUser {
  statusCode: number;
  message: string;
  data: Datum[];
  isSuccess: boolean;
}
interface Datum {
  oid: number;
  userAccountId: number;
  systemId: number;
  dateCreated: string;
  SystemName: string;
  createdBy: number;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}
