export interface District {
  district: Districts[];
  currentPage: number;
  totalRows: number;
  // dateCreated?: string | null;
  // createdBy?: number | null;
  // dateModified?: string | null;
  // modifiedBy?: number | null;
  // isDeleted?: boolean;
  // oid?: number;
  // districtName: string;
  // provinceId?: number;
  // countryId?: number;
}
export interface Districts {
  oid: number;
  id: number;
  districtName: string;
  provinceId: number;
  provinceName: string;
  countryId: number;
  countryName: string;
  dateCreated: string;
  createdBy: number;
  dateModified?: string;
  modifiedBy?: string;
  isDeleted: boolean;
}
