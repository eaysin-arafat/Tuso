import {
  ChangedPassword,
  RecoveryPassword,
  RefreshToken,
  RevokeRefreshToken,
  User,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { SignInDataType } from "@/constants/interface";
import { cookieManager } from "@/utilities/cookie-manager";
import { API } from "../API/API";
import { login, logout } from "./auth-slice";

interface UsernameResponse {
  statusCode: number;
  message: string;
  data: User;
  isSuccess: boolean;
}

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description login user
     * @URI /user-account/login
     * @Method POST
     */
    userLogin: builder.mutation({
      query: (body: SignInDataType) => ({
        url: "/user-account/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        // if login success
        if (result.data?.statusCode === 200) {
          cookieManager.saveCookie(
            "tuso_accessToken",
            result?.data?.data?.jwtToken,
            {
              sameSite: "Lax",
            }
          );
          cookieManager.saveCookie(
            "tuso_refreshToken",
            result?.data?.data?.refreshToken,
            { sameSite: "Lax" }
          );

          // dispatch login action
          dispatch(
            login({
              user: result.data?.data?.user,
              accessToken: result?.data?.data?.jwtToken,
              refreshToken: result?.data?.data?.refreshToken,
            })
          );
        } else {
          // if login failed
          dispatch(logout());
        }
      },
    }),

    /**
     * @Description read user by username
     * @URI /user-account/{username}
     * @Method GET
     */
    readUserByUsername: builder.query<UsernameResponse, string>({
      query: (username) => `/user-account/username/${username}`,

      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        // if login success
        if (result.data?.statusCode === 200) {
          // dispatch login action
          dispatch(
            login({
              user: result.data?.data,
              accessToken: cookieManager.getCookie("tuso_accessToken"),
              refreshToken: cookieManager.getCookie("tuso_refreshToken"),
            })
          );
        } else {
          // if login failed
          dispatch(logout());
        }
      },
      providesTags: ["ReadUserByUsername"]
    }),

    /**
     * @Description refresh token
     * @URI /refresh-token
     * @Method POST
     */
    refreshToken: builder.mutation<RefreshToken, RefreshToken>({
      query: (body) => ({
        url: "/refresh-token",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description revoke refresh token
     * @URI /revoke-token
     * @Method POST
     */
    revokeRefreshToken: builder.mutation<
      RevokeRefreshToken,
      RevokeRefreshToken
    >({
      query: (body) => ({
        url: "/revoke-token",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description change password
     * @URI /user-account/changepassword
     * @Method POST
     */
    changedPassword: builder.mutation<
      RootResponse<ChangedPassword>,
      ChangedPassword
    >({
      query: (body) => ({
        url: "/user-account/changepassword",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description recovery password
     * @URI /user-account/recovery-password
     * @Method POST
     */
    recoveryPassword: builder.mutation<
      RootResponse<RecoveryPassword>,
      RecoveryPassword
    >({
      query: (body) => ({
        url: "/user-account/recovery-password",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read user by device type
     * @URI /user-account/device/{deviceTypeId}
     * @Method GET
     */
    readUserByDeviceType: builder.query<User[], string>({
      query: (deviceTypeId) => `/user-account/device/${deviceTypeId}`,
    }),
  }),
});

// export api hooks
export const {
  useUserLoginMutation,
  useRefreshTokenMutation,
  useRevokeRefreshTokenMutation,
  useChangedPasswordMutation,
  useRecoveryPasswordMutation,
  useReadUserByDeviceTypeQuery,
  useReadUserByUsernameQuery,
} = authApi;

// export endpoints
export const { endpoints: authApiEndpoints } = authApi;

// export api
export default authApi;
