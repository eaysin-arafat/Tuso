export interface ModuleData {
  oid: number;
  moduleName: string;
  description: string;
  dateCreated: string;
  createdBy?: string;
  dateModified?: string;
  modifiedBy?: string;
  isDeleted: boolean;
}
