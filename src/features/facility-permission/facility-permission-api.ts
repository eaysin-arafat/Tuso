import { FacilityPermission, Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const facilityPermissionApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create facility permission
     * @URI /facility-permission
     * @Method POST
     */
    createFacilityPermission: builder.mutation({
      query: (body) => ({
        url: "/facility-permission",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FacilityPermission"],
    }),

    /**
     * @Description read facility permission
     * @URI /facility-permission/key/{facilityId}
     * @Method GET
     */
    readFacilityPermission: builder.query<FacilityPermission, string>({
      query: (facilityId) => `/facility-permission/key/${facilityId}`,
    }),

    /**
     * @Description read facility permission page
     * @URI /facilities-permission-pagination/key/{facilityId}
     * @Method GET
     */
    readFacilitiesPermissionPage: builder.query<
      RootResponse<{ data: FacilityPermission[] }>,
      Pagination
    >({
      query: ({ key, start, take }) =>
        `/facilities-permission-pagination/key/${key}?start=${start}&take=${take}`,
      providesTags: ["FacilityPermission"],
    }),

    /**
     * @Description read facility permissions by key
     * @URI /facility-permission/key/{key}
     * @Method GET
     */
    readFacilityPermissionsByKey: builder.query<FacilityPermission, string>({
      query: (key) => `/facility-permission/key/${key}`,
    }),

    /**
     * @Description read facility permissions
     * @URI /facility-permissions
     * @Method GET
     */
    readFacilityPermissions: builder.query<FacilityPermission[], void>({
      query: () => "/facility-permissions",
    }),

    /**
     * @Description update facility permissions
     * @URI /facility-permission/{key}
     * @Method PUT
     */
    updateFacilityPermissions: builder.mutation<
      RootResponse<FacilityPermission>,
      { key: number; body: FacilityPermission }
    >({
      query: ({ key, body }) => ({
        url: `/facility-permission/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["FacilityPermission"],
    }),

    /**
     * @Description delete facility permission
     * @URI /facility-permission/{key}
     * @Method DELETE
     */
    deleteFacilityPermission: builder.mutation<
      RootResponse<FacilityPermission>,
      string
    >({
      query: (key) => ({
        url: `/facility-permission/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FacilityPermission"],
    }),
  }),
});

// export api hooks
export const {
  useCreateFacilityPermissionMutation,
  useReadFacilityPermissionQuery,
  useReadFacilitiesPermissionPageQuery,
  useReadFacilityPermissionsByKeyQuery,
  useReadFacilityPermissionsQuery,
  useUpdateFacilityPermissionsMutation,
  useDeleteFacilityPermissionMutation,
} = facilityPermissionApi;

// export api endpoints
export const { endpoints: facilityPermissionApiEndpoints } =
  facilityPermissionApi;

// export api
export default facilityPermissionApi;
