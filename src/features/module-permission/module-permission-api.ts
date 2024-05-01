import { ModulePermission, Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const modulePermissionApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create module permission
     * @URI /module-permission
     * @Method POST
     */
    createModulePermission: builder.mutation({
      query: (body) => ({
        url: "/module-permission",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "ModulePermission",
        "ModulePermissionByModule",
        // "ModulePermissionByRole",
        "ReadUserByUsername",
      ],
    }),

    /**
     * @Description read module permissions
     * @URI /module-permissions
     * @Method GET
     */
    readModulePermissions: builder.query<ModulePermission[], void>({
      query: () => "/module-permissions",
    }),

    /**
     * @Description read module permission by key
     * @URI /module-permission/key/{key}
     * @Method GET
     */
    readModulePermissionByKey: builder.query<ModulePermission, string>({
      query: (key) => `/module-permission/key/${key}`,
    }),

    /**
     * @Description read module permission by role
     * @URI /module-permission/role/{roleId}
     * @Method GET
     */
    readModulePermissionByRole: builder.query<ModulePermission[], string>({
      query: (roleId) => `/module-permission/role/${roleId}`,
      providesTags: ["ModulePermissionByRole"],
    }),

    /**
     * @Description read module permission by role page
     * @URI /module-permissions-pagination/role/{roleId}
     * @Method GET
     */
    readModulePermissionByRolePage: builder.query<
      RootResponse<ModulePermission[]>,
      Pagination
    >({
      query: ({ key, start, take }) =>
        `/module-permissions-pagination/role/${key}?start=${start}&take=${take}`,
      providesTags: ["ModulePermission"],
    }),

    /**
     * @Description read module permission by module
     * @URI /module-permission/module/{moduleId}
     * @Method GET
     */
    readModulePermissionByModule: builder.query<
      RootResponse<ModulePermission[]>,
      string
    >({
      query: (moduleId) => `/module-permission/module/${moduleId}`,
      providesTags: ["ModulePermissionByModule"],
    }),

    /**
     * @Description read module permission
     * @URI /module-permission/key
     * @Method GET
     */
    readModulePermission: builder.query<ModulePermission[], void>({
      query: () => "/module-permission/key",
    }),

    /**
     * @Description update module permission
     * @URI /module-permission/{key}
     * @Method PUT
     */
    updateModulePermission: builder.mutation<
      ModulePermission,
      { key: number; body: ModulePermission }
    >({
      query: ({ key, body }) => ({
        url: `/module-permission/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ModulePermission", "ModulePermissionByRole"],
    }),

    /**
     * @Description delete module permission
     * @URI /module-permission/{key}
     * @Method DELETE
     */
    deleteModulePermission: builder.mutation<
      RootResponse<ModulePermission>,
      string
    >({
      query: (key) => ({
        url: `/module-permission/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "ModulePermission",
        "ModulePermissionByModule",
        "ReadUserByUsername",
      ],
    }),
  }),
});

// export api hooks
export const {
  useCreateModulePermissionMutation,
  useReadModulePermissionsQuery,
  useReadModulePermissionByKeyQuery,
  useReadModulePermissionByRoleQuery,
  useReadModulePermissionByRolePageQuery,
  useReadModulePermissionByModuleQuery,
  useReadModulePermissionQuery,
  useUpdateModulePermissionMutation,
  useDeleteModulePermissionMutation,
} = modulePermissionApi;

// export api endpoints
export const { endpoints: modulePermissionApiEndpoints } = modulePermissionApi;

// export api
export default modulePermissionApi;
