import {
  Pagination,
  TypeAllUser,
  TypeUsers,
  User,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const countryCodeEncode = (countryCode: string): string =>
  countryCode.replace(/\+/g, "%2B");

export const userAccountsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create user account
     * @URI /user-account
     * @Method POST
     */
    createUserAccount: builder.mutation({
      query: (body) => ({
        url: "/user-account",
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserList", "ExpertUser"],
    }),

    /**
     * @Description read user accounts page
     * @URI /user-accounts/pagination
     * @Method GET
     */
    readUserAccountsPage: builder.query<
      RootResponse<{ totalUser: number; currentPage: number; list: User[] }>,
      Pagination
    >({
      query: ({ start, take }) =>
        `/user-accounts/pagination?start=${start}&take=${take}`,
      providesTags: ["UserList"],
    }),

    /**
     * @Description read user accounts page
     * @URI /user-accounts/pagination
     * @Method GET
     */
    readUserAccount: builder.query<TypeAllUser, undefined>({
      query: () => `/user-accounts/pagination?start=1&take=5000`,
    }),

    /**
     * @Description read user accounts
     * @URI /user-accounts/count
     * @Method GET
     */
    readUserAccounts: builder.query<
      RootResponse<{
        totalUser: number;
        totalClientUser: number;
        totalAgentUser: number;
        totalSuperUser: number;
        totalExpertUser: number;
        totalOfflineUser: number;
        totalOnlineUser: number;
      }>,
      void
    >({
      query: () => "/user-accounts/count",
    }),

    /**
     * @Description read user accounts by name
     * @URI /user-accounts/name
     * @Method GET
     */
    readUserAccountsByName: builder.query<TypeAllUser, Pagination>({
      query: ({ key, start, take }) =>
        `/user-accounts/name?name=${key}&start=${start}&take=${take}`,
    }),

    /**
     * @Description read user account by key
     * @URI /user-account/key/{key}
     * @Method GET
     */
    readUserAccountByKey: builder.query<RootResponse<User>, string>({
      query: (key) => `/user-account/key/${key}`,
      providesTags: ["UpdateUser"],
    }),

    /**
     * @Description read user account by role
     * @URI /user-account/role/{key}
     * @Method GET
     */
    readUserAccountByRole: builder.query<
      RootResponse<{ totalUser: number; currentPage: number; list: User[] }>,
      { role: number; start: number; take: number }
    >({
      query: ({ role, start, take }) =>
        `/user-account/role/${role}?start=${start}&take=${take}`,
    }),

    /**
     * @Description read user account by role
     * @URI /user-account/role/{key}
     * @Method GET
     */
    readUserAccountByRoleNamePage: builder.query<
      TypeAllUser,
      { key?: string; start: number; take: number; search?: string }
    >({
      query: ({ search, key, start, take }) => {
        let query = "?";

        if (search) query += `name=${search}&`;
        if (key) query += `key=${key}&`;
        if (start) query += `start=${start}&`;
        if (take) query += `take=${take}&`;

        return {
          url: `/user-accounts/name/role${query}`,
        };
      },
      providesTags: ["UserList"],
    }),

    /**
     * @Description read user account by expert
     * @URI /user-account/expert
     * @Method GET
     */
    readUserAccountByExpert: builder.query<TypeUsers, void>({
      query: () => "/user-account/expert",
      providesTags: ["ExpertUser"],
    }),

    /**
     * @Description update user account
     * @URI /user-account/{key}
     * @Method PUT
     */
    updateUserAccount: builder.mutation<
      RootResponse<User>,
      { key: number; body: User }
    >({
      query: ({ key, body }) => ({
        url: `/user-account/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserList", "ProfilePicture", "UpdateUser"],
    }),

    /**
     * @Description delete user account
     * @URI /user-account/{key}
     * @Method DELETE
     */
    deleteUserAccount: builder.mutation<RootResponse<User>, number>({
      query: (key) => ({
        url: `/user-account/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserList"],
    }),

    /**
     * @Description check unique user name
     * @URI /user-account/unique/{name}
     * @Method GET
     */
    isUniqueUserName: builder.query<RootResponse<unknown>, string>({
      query: (name) => `/user-account/unique/${name}`,
    }),

    /**
     * @Description check unique cellphone
     * @URI /user-account/unique-cellphone/{cellPhone}
     * @Method GET
     */
    isUniqueCellphone: builder.query<
      RootResponse<unknown>,
      { cellPhone: number; countryCode: string }
    >({
      query: ({ cellPhone, countryCode }) =>
        `/user-account/unique-cellphone/${cellPhone}?countryCode=${countryCodeEncode(
          countryCode
        )}`,
    }),

    /**
     * @Description read user image
     * @URI /user-account/user-image
     * @Method GET
     */
    readUserImage: builder.query<string, void>({
      query: () => "/user-account/user-image",
    }),

    /**
     * @Description read users by name
     * @URI /user-account/search/{name}
     * @Method GET
     */
    readUsersByName: builder.query<RootResponse<User[]>, string>({
      query: (name) => `/user-account/search/${name}`,
    }),
  }),
});

// export api hooks
export const {
  useCreateUserAccountMutation,
  useReadUserAccountsPageQuery,
  useReadUserAccountsQuery,
  useReadUserAccountsByNameQuery,
  useReadUserAccountByKeyQuery,
  useReadUserAccountByRoleQuery,
  useReadUserAccountByExpertQuery,
  useUpdateUserAccountMutation,
  useDeleteUserAccountMutation,
  useIsUniqueUserNameQuery,
  useIsUniqueCellphoneQuery,
  useReadUserImageQuery,
  useReadUsersByNameQuery,
  useReadUserAccountQuery,
  useReadUserAccountByRoleNamePageQuery,
} = userAccountsApi;

// export api endpoints
export const { endpoints: userAccountsApiEndpoints } = userAccountsApi;

// export api
export default userAccountsApi;
