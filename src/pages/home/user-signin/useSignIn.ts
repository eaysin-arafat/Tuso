import React from "react";
import { SignInErrorTypes } from "./constant";

/**
 * @description this hook is responsible for managing the login logic of user
 */

const useUserSignIn = () => {
  // login form data

  // validation error message
  const [errors] = React.useState<SignInErrorTypes>({});

  // credential error message

  return {
    errors,
  };
};

export default useUserSignIn;
