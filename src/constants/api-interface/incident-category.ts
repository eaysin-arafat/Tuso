export interface IncidentCategory {
  categoryId?: number;
  incidentCategorys: string;
  description?: string;
  parentId?: number;
  dateCreated?: string;
  createdBy?: number;
  modifiedBy?: any;
  dateModified: string;
  parentCategory?: ParentCategory;
  oid?: number;
}

interface ParentCategory {
  oid: number;
  incidentCategorys: string;
  description: string;
  parentId: number;
  dateCreated: string;
  createdBy: number;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}