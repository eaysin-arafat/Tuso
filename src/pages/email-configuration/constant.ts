export const emailConfigInitialState = {
  domainName: "",
  emailAddress: "",
  password: "",
  smtpServer: "",
  port: "",
  auditmails: "",
};

export interface EmailConfigType {
  domainName: string;
  emailAddress: string;
  password: string;
  smtpServer: string;
  port: string;
  auditmails: string;
}

export interface EmailConfigErrorType {
  domainName: string;
  emailAddress: string;
  password: string;
  smtpServer: string;
  port: string;
  auditmails: string;
}
