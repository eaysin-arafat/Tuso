export interface Country {
  oid: number;
  countryName: string;
  isoCodeAlpha2: string;
  countryCode: string;
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy?: any;
  isDeleted: boolean;
}

export interface TypeCountries {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  country: Countries[];
  currentPage: number;
  totalRows: number;
}
interface Countries {
  oid: number;
  countryName: string;
  isoCodeAlpha2: string;
  countryCode: string;
  dateCreated: string;
  createdBy?: number;
  dateModified?: string;
  modifiedBy?: number;
  isDeleted: boolean;
}

export interface TypeCountriesData {
  statusCode: number;
  message: string;
  data: Daum[];
  isSuccess: boolean;
}

export interface Daum {
  oid: number;
  countryName: string;
  isoCodeAlpha2: string;
  countryCode: string;
  dateCreated: string;
  createdBy: number;
  dateModified?: string;
  modifiedBy?: number;
  isDeleted: boolean;
}
