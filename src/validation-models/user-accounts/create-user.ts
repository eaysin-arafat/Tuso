import {
  UserCreateDataType,
  UserCreateErrorType,
} from "@/constants/form-interface/user-account";
import { checkPhoneNumber } from "../check-phone/check-phone-validation";

export const userValidator = (
  roleId: number,
  { districtId, facilityId, provinceId },
  formState: UserCreateDataType,
  prevData: unknown = null
) => {
  const errors: UserCreateErrorType = {};

  // for all user those are required
  if (!formState?.name) {
    errors.name = "Required";
  } else {
    const usernameRegex = /^[a-zA-Z ]+$/;
    if (!usernameRegex.test(formState.name)) {
      errors.name = "Name must be alphanumeric";
    }

    if (formState?.name?.length < 2) {
      errors.name = "Username must be at least 2 characters";
    }
  }

  if (!formState?.surname) {
    errors.surname = "Required";
  } else {
    const usernameRegex = /^[a-zA-Z ]+$/;
    if (!usernameRegex.test(formState.surname)) {
      errors.surname = "Surname must be alphanumeric";
    }

    if (formState?.surname?.length < 2) {
      errors.surname = "Surname must be at least 2 characters";
    }
  }

  if (!formState?.roleId) errors.roleId = "Required";
  if (!formState?.countryCode) errors.countryCode = "Required";

  // Custom email validation
  if (formState?.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      errors.email = "Invalid email address";
    }
  }

  checkPhoneNumber({
    code: formState?.countryCode,
    codeKey: "countryCode",
    phone: formState?.cellphone,
    phoneKey: "cellphone",
    errors: errors,
    required: true,
  });

  if (!prevData) {
    if (!formState?.username) {
      errors.username = "Required";
    }

    if (!formState?.password) errors.password = "Required";
  }
  // required for client
  if (roleId === 1) {
    if (!provinceId) errors.provinceId = "Required";
    if (!districtId) errors.districtId = "Required";
    if (!facilityId) errors.facilityId = "Required";
    // if (Array.isArray(selectSystem) && selectSystem?.length === 0)
    //   errors.systems = "Required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
