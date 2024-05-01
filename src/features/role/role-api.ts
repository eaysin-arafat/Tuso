import { Pagination, Role, TypeRoles } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const roleApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create role
     * @URI /role
     * @Method POST
     */
    createUserRole: builder.mutation<Role, Role>({
      query: (body) => ({
        url: "/role",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read roles
     * @URI /roles
     * @Method GET
     */
    readUserRoles: builder.query<RootResponse<TypeRoles[]>, void>({
      query: () => "/user-roles",
    }),

    /**
     * @Description read roles page
     * @URI /roles/pagination
     * @Method GET
     */
    readUserRolesPage: builder.query<Role[], Pagination>({
      query: (pagination) => `/roles/pagination?page=${pagination.page}`,
    }),

    /**
     * @Description read role by key
     * @URI /role/key/{key}
     * @Method GET
     */
    readUserRoleByKey: builder.query<Role, string>({
      query: (key) => `/role/key/${key}`,
    }),

    /**
     * @Description update role
     * @URI /role/{key}
     * @Method PUT
     */
    updateUserRole: builder.mutation<Role, { key: number; body: Role }>({
      query: ({ key, body }) => ({
        url: `/role/${key}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @Description delete role
     * @URI /role/{key}
     * @Method DELETE
     */
    deleteUserRole: builder.mutation<Role, string>({
      query: (key) => ({
        url: `/role/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateUserRoleMutation,
  useReadUserRolesQuery,
  useReadUserRolesPageQuery,
  useReadUserRoleByKeyQuery,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
} = roleApi;

// export api endpoints
export const { endpoints: roleApiEndpoints } = roleApi;

// export api
export default roleApi;
