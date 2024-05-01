// Change password page types
export type ChangePasswordFormType = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePasswordFormErrorType = {
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
};

// Password recovery page types
export type PasswordRecoveryFormType = {
  countryCode: string;
  cellphone: string;
  username: string;
};

export type PasswordRecoveryFormErrorType = {
  countryCode?: string;
  cellphone?: string;
  username?: string;
  common?: string;
  formAlertMsg?: string;
};

export type PasswordRecoverySubmitType = {
  countryCode?: string;
  cellphone?: string;
  username?: string;
};

export interface PersonalInfoType {
  firstName: string;
  surname: string;
  dob: string | null;
  sex: string;
  designation: string;
}

export interface ContactInfoType {
  contactAddress: string;
  countryCode: string;
  cellphone: string;
}

export interface LoginInfoType {
  password: string;
  confirmPassword: string;
}

export interface ErrorsType {
  firstName?: string;
  surname?: string;
  dob?: string;
  sex?: string;
  designation?: string;
  contactAddress?: string;
  countryCode?: string;
  password?: string;
  confirmPassword?: string;
  nrc?: string;
  cellphone?: string;
  username?: string;
}

export type TypeUser = {
  oid?: string;
  firstName?: string;
  surname?: string;
  dob?: string;
  sex?: number;
  designation?: string;
  nrc?: string;
  noNRC?: boolean;
  contactAddress?: string;
  countryCode?: string;
  cellphone?: string;
  username?: string;
  password?: string;
  userType?: number;
  isAccountActive?: string;
  dateCreated?: string;
  isDeleted?: boolean;
  isSynced?: boolean;
};
