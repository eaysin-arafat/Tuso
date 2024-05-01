export interface Data {
  systems: SystemDataType[];
  currentPage: number;
  totalRows: number;
}

export interface SystemDataType {
  oid: number;
  title: string;
  dateCreated?: string;
  createdBy?: number;
  systemPermissions?: any;
  description: string;
  implementingPartners?: ImplementingPartner[];
  fundingAgencies: FundingAgency[];
  isDeleted?: boolean;
  modifiedBy?: number;
  dateModified?: string;
}

interface FundingAgency {
  oid: number;
  fundingAgencyName: string;
  projectId: number;
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy?: any;
  isDeleted: boolean;
}
interface ImplementingPartner {
  oid: number;
  implementingPartnerName: string;
  projectId: number;
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy?: any;
  isDeleted: boolean;
}