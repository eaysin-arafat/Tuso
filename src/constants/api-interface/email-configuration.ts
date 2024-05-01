export interface EmailConfiguration {
  dateCreated: string;
  createdBy: number;
  dateModified: string;
  modifiedBy: number;
  isDeleted: boolean;
  oid: number;
  domainName: string;
  emailAddress: string;
  password: string;
  smtpServer: string;
  port: string;
  auditmails: string;
}
