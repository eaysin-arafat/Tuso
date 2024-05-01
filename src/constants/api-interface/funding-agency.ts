export interface FundingAgency {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  fundingAgencyName: string;
  projectId?: number;
}

export interface TypeFundingAgency {
  statusCode: number
  message: string
  data: Data
  isSuccess: boolean
}

interface Data {
  fundingAgency: FundingAgencys[]
  currentPage: number
  totalRows: number
}

interface FundingAgencys {
  oid: number
  fundingAgencyName: string
  projectId: number
  dateCreated: string
  createdBy: number
  dateModified: any
  modifiedBy: any
  isDeleted: boolean
}

export interface FundingAgencyOptions {
  statusCode: number;
  message: string;
  data: Datum[];
  isSuccess: boolean;
}
interface Datum {
  oid: number;
  fundingAgencyName: string;
  projectId: number;
  dateCreated: string;
  createdBy: number;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}