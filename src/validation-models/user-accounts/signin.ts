import { SignInDataType } from "@/constants/interface";

/**
 * @description Validate login data
 * @param {object} loginData
 * @returns {object} {isValid: boolean, errors: object
 */

type errorType = {
  username?: string;
  password?: string;
};

export const signInValidator = (signInData: SignInDataType) => {
  const errors: errorType = {};

  // validate username
  if (!signInData.username) errors.username = "Required";
  else if (signInData.username.length < 3) errors.username = "Invalid";

  // validate password
  if (!signInData.password) errors.password = "Required";

  // return error state
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
