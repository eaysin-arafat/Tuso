import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { cookieManager } from "@/utilities/cookie-manager";
import { logout, setTokens } from "../auth/auth-slice";
import apiTags from "./tags";

interface TokenResponse {
  statusCode: number;
  data: {
    jwtToken: string;
    refreshToken: string;
  };
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL as string,
  // credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = cookieManager.getCookie("tuso_accessToken");
    console.log(getState);

    // const token = (getState() as RootState)?.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 401 ||
    (result?.error?.data as TokenResponse)?.statusCode === 401
  ) {
    const refreshResult = await baseQuery(
      {
        url: "/refresh-token",
        method: "POST",
        body: { refreshToken: cookieManager.getCookie("tuso_refreshToken") },
      },
      api,
      extraOptions
    );

    if ((refreshResult?.data as TokenResponse)?.statusCode === 200) {
      // update the token
      cookieManager.saveCookie(
        "tuso_accessToken",
        (refreshResult?.data as TokenResponse)?.data?.jwtToken,
        {
          sameSite: "Lax",
        }
      );

      cookieManager.saveCookie(
        "tuso_refreshToken",
        (refreshResult?.data as TokenResponse)?.data?.refreshToken,
        {
          sameSite: "Lax",
        }
      );

      api.dispatch(
        setTokens({
          accessToken: (refreshResult?.data as TokenResponse)?.data?.jwtToken,
          refreshToken: (refreshResult?.data as TokenResponse)?.data
            ?.refreshToken,
        })
      );
      // retry the initial request
      return baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const API = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),

  tagTypes: [...apiTags],
});
