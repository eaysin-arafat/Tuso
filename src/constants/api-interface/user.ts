import { IncidentActionLog } from ".";

export interface User {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  name: string;
  surname: string;
  email?: string | null;
  username?: string;
  password?: string;
  countryCode: string;
  cellphone: string;
  isAccountActive: boolean;
  roleId: number;
  userAccountAgentsList?: IncidentActionLog[] | null;
  userAccountSupervisedsList?: IncidentActionLog[] | null;
  userAccountExpertsList?: IncidentActionLog[] | null;
  userAccountAdminsList?: IncidentActionLog[] | null;
  userAccountsTeamLeadsList?: IncidentActionLog[] | null;
  userAccountsClosedList?: IncidentActionLog[] | null;
  deviceTypeId?: number | null | string;
  systemPermissionList?: number[] | null;
  facilityId?: number | string | null;
  districtId?: string;
  modules?: string[] | null;
  image?: string | null;
  provinceId?: string;
  systems?: number[];
  isUserAlreadyUsed?: boolean;
  isTeamLead?: boolean;
  teamId?: number;
  isRequestOpen?: boolean;
  faclityName?: string | null;
  districtName?: string | null;
  provinceName?: string | null;
}

export interface RefreshToken {}

export interface RevokeRefreshToken {}

export interface ChangedPassword {}

export interface RecoveryPassword {}

export interface TypeUsers {
  statusCode: number;
  message: string;
  data: Datum[];
  isSuccess: boolean;
}
interface Datum {
  oid: number;
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  countryCode: string;
  cellphone: string;
  isAccountActive: boolean;
  roleId: number;
  userAccountAgentsList?: any;
  userAccountSupervisedsList?: any;
  userAccountExpertsList?: any;
  userAccountAdminsList?: any;
  userAccountsTeamLeadsList?: any;
  userAccountsClosedList?: any;
  deviceTypeId?: any;
  systemPermissionList?: any;
  dateCreated: string;
  createdBy?: any;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}

export interface TypeAllUser {
  statusCode: number;
  message: string;
  data: Data;
  isSuccess: boolean;
}
interface Data {
  totalUser: number;
  currentPage: number;
  list: User[];
}
// interface List {
//   oid: number;
//   name: string;
//   surname: string;
//   email: string;
//   username: string;
//   password: string;
//   countryCode: string;
//   cellphone: string;
//   isAccountActive: boolean;
//   roleId: number;
//   roleName: string;
//   facilityId?: any;
//   districtId?: any;
//   provinceId?: any;
//   deviceTypeId?: any;
//   modules?: unknown;
//   isUserAlreadyUsed: boolean;
//   isRequestOpen: boolean;
// }
