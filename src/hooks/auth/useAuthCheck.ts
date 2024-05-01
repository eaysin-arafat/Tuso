import { useReadUserByUsernameQuery } from "@/features/auth/auth-api";
import { logout, setTokens } from "@/features/auth/auth-slice";
import { cookieManager } from "@/utilities/cookie-manager";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useDispatch } from "react-redux";

interface Payload {
  id: string;
  iat: number;
}

// useAuthCheck hook for checking if the user is authenticated
const useAuthCheck = () => {
  const dispatch = useDispatch();

  // set auth checking state
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);

  const token = cookieManager.getCookie("tuso_accessToken") || "";
  const refreshToken = cookieManager.getCookie("tuso_refreshToken") || "";

  dispatch(setTokens({ accessToken: token, refreshToken }));

  // decode token
  let decode: Payload | null = null;

  // decode token
  try {
    decode = jwtDecode<Payload>(token);
  } catch (error) {
    dispatch(logout());
  }

  const { isLoading, status } = useReadUserByUsernameQuery(
    decode?.id as string,
    {
      skip: !decode?.id,
      refetchOnMountOrArgChange: true,
    }
  );

  React.useEffect(() => {
    if (!isLoading && status !== "pending") {
      setIsAuthChecking(false);
    }
  }, [isLoading, status]);

  return { isAuthChecking };
};

export default useAuthCheck;
