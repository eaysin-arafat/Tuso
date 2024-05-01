export interface EmailConfiguration {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  domainName: string;
  emailAddress: string;
  password: string;
  smtpServer: string;
  port?: string | null;
  auditmails?: string | null;
}

export interface EmailControl {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  isEmailSendForIncidentCreate?: boolean;
  isEmailSendForIncidentClose?: boolean;
}

export interface EmailTemplate {
  dateCreated?: string | null;
  createdBy?: number | null;
  dateModified?: string | null;
  modifiedBy?: number | null;
  isDeleted?: boolean;
  oid?: number;
  subject: string;
  mailBody: string;
  bodyType?: number | null;
}
