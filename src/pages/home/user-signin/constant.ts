/*
 * Created by    : Andrew
 * Date created  : 10.11.2023
 * Modified by   :
 * Last modified :
 * Reviewed by   :
 * Date Reviewed :
 */

import { SignInDataType } from "@/constants/interface";

// initial state
export const initialState: SignInDataType = {
  username: "",
  password: "",
  rememberMe: false,
};

export type SignInErrorTypes = Partial<SignInDataType>;
// user SignIn rerror types
// export type SignInErrorTypes = {
//   username?: string;
//   password?: string;
//   rememberMe?: boolean;
// };
