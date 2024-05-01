export interface Role {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  roleName: string;
  description: string;
}

export interface TypeRoles {
  oid: number;
  roleName: string;
  description: string;
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy: number;
  isDeleted: boolean;
}
