import {
  Pagination,
  SystemPermissionDataType,
  TypeSystemPermissionByUser,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const systemPermissionApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create system permission
     * @URI /system-permission
     * @Method POST
     */
    createSystemPermission: builder.mutation({
      query: (body) => ({
        url: "/system-permission",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SystemPermission"],
    }),

    /**
     * @Description read system permissions
     * @URI /system-permissions
     * @Method GET
     */
    readSystemPermissions: builder.query<
      RootResponse<SystemPermissionDataType[]>,
      void
    >({
      query: () => "/system-permissions",
    }),

    /**
     * @Description read system permission by key
     * @URI /system-permission/key/{key}
     * @Method GET
     */
    readSystemPermissionByKey: builder.query<SystemPermissionDataType, string>({
      query: (key) => `/system-permission/key/${key}`,
    }),

    /**
     * @Description read system permission by user
     * @URI /system-permission/user/{userAccountId}
     * @Method GET
     */
    readSystemPermissionByUser: builder.query<
      TypeSystemPermissionByUser,
      number
    >({
      query: (userAccountId) => `/system-permission/user/${userAccountId}`,
    }),

    /**
     * @Description read system permission by user page
     * @URI /system-permission-pagination/user/{key}
     * @Method GET
     */
    readSystemPermissionByUserPage: builder.query<
      RootResponse<{ systemPermission: SystemPermissionDataType[] }>,
      Pagination
    >({
      query: ({ key, start = 1, take = 10 }) =>
        `/system-permission-pagination/user/${key}?start=${start}&take=${take}`,
      providesTags: ["SystemPermission"],
    }),

    /**
     * @Description read system permission by project
     * @URI /system-permission/system/{systemId}
     * @Method GET
     */
    readSystemPermissionByProject: builder.query<
      RootResponse<{
        systemPermission: SystemPermissionDataType[];
        currentPage: number;
        totalRows: number;
      }>,
      Pagination
    >({
      query: ({ key, start, take }) =>
        `/system-permission/system/${key}?start=${start}&take=${take}`,
    }),

    /**
     * @Description read system permission
     * @URI /system-permission/key
     * @Method GET
     */
    readSystemPermission: builder.query<SystemPermissionDataType, void>({
      query: () => "/system-permission/key",
    }),

    /**
     * @Description update system permission
     * @URI /system-permission/{key}
     * @Method PUT
     */
    updateSystemPermission: builder.mutation<
      SystemPermissionDataType,
      { key: number; body: SystemPermissionDataType }
    >({
      query: ({ key, body }) => ({
        url: `/system-permission/${key}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @Description delete system permission
     * @URI /system-permission/{key}
     * @Method DELETE
     */
    deleteSystemPermission: builder.mutation<
      RootResponse<SystemPermissionDataType>,
      string
    >({
      query: (key) => ({
        url: `/system-permission/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SystemPermission"],
    }),
  }),
});

// export api hooks
export const {
  useCreateSystemPermissionMutation,
  useReadSystemPermissionsQuery,
  useReadSystemPermissionByKeyQuery,
  useReadSystemPermissionByUserQuery,
  useReadSystemPermissionByUserPageQuery,
  useReadSystemPermissionByProjectQuery,
  useReadSystemPermissionQuery,
  useUpdateSystemPermissionMutation,
  useDeleteSystemPermissionMutation,
} = systemPermissionApi;

// export api endpoints
export const { endpoints: systemPermissionApiEndpoints } = systemPermissionApi;

// export api
export default systemPermissionApi;
