export interface UserCreateDataType {
  name: string;
  surname: string;
  username?: string;
  email: string;
  password?: string;
  roleId: string;
  cellphone: string;
  countryCode: string;
  isAccountActive?: boolean;
  deviceTypeId: string;
  facilityId?: string;
  districtId?: string;
  provinceId?: string;
  systems?: number[];
}

export interface UserCreateErrorType {
  name?: string;
  surname?: string;
  username?: string;
  email?: string;
  password?: string;
  roleId?: string;
  cellphone?: string;
  countryCode?: string;
  isAccountActive?: boolean;
  deviceTypeId?: string;
  facilityId?: string;
  districtId?: string;
  provinceId?: string;
  systems?: string;
}

export const userCreateInitialState = {
  name: "",
  surname: "",
  username: "",
  email: "",
  password: "",
  roleId: "",
  cellphone: "",
  countryCode: "",
  isAccountActive: false,
  deviceTypeId: "",
  facilityId: "",
  districtId: "",
  provinceId: "",
  systems: [],
};
