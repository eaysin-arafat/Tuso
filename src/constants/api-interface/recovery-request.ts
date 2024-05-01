import { User } from ".";

export interface RecoveryRequest {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  cellphone: string;
  username?: string | null;
  dateRequested: string;
  isRequestOpen: boolean;
  userAccountId?: number;
  userAccounts?: User;
}
