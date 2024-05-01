export interface Message {
  oid: number;
  messageDate: string;
  messages: string;
  sender: string;
  isOpen: boolean;
  openDate: string;
  incidentId: number;
  dateCreated: string;
  createdBy: number;
  dateModified?: any;
  modifiedBy?: any;
  isDeleted: boolean;
}

export interface MessageByKey {
  result: Result;
  id: number;
  exception?: any;
  status: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  creationOptions: number;
  asyncState?: any;
  isFaulted: boolean;
}
interface Result {
  oid: number;
  messages: string;
  messageDate: string;
  createdBy: number;
  modifiedBy?: any;
  dateCreated: string;
  dateModified?: any;
  isOpen: boolean;
  isDeleted: boolean;
  sender: string;
}