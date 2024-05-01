export interface TypeFacility {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  facility: Facility[];
  currentPage: number;
  totalRows: number;
}
export interface Facility {
  oid?: number;
  facilityName: string;
  facilityMasterCode: string;
  hmisCode: string;
  longitude: string;
  countryId: number;
  provinceId: number;
  latitude: string;
  location: number;
  facilityType: number;
  ownership: number;
  isPrivate: boolean;
  districtId: number;
  districtName?: string;
  dateCreated: string;
  createdBy: number;
  modifiedBy?: number;
  dateModified?: string;
  facilityId?: number;
}
