export interface DeviceType {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  deviceTypeName: string;
}

export interface Data {
  deviceTypes: DeviceTypes[];
  currentPage: number;
  totalRows: number;
}
export interface DeviceTypes {
  oid: number;
  deviceTypeName: string;
  dateCreated: string;
  createdBy?: number;
  dateModified?: string;
  modifiedBy?: string;
  isDeleted: boolean;
}
