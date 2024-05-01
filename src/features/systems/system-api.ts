import { Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { SystemDataType } from "@/constants/api-interface/system";
import { API } from "../API/API";

export const systemApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create system
     * @URI /system
     * @Method POST
     */
    createSystem: builder.mutation({
      query: (body) => ({
        url: "/system",
        method: "POST",
        body,
      }),
      invalidatesTags: ["System"],
    }),

    /**
     * @Description read systems
     * @URI /systems
     * @Method GET
     */
    readSystems: builder.query<RootResponse<SystemDataType[]>, void>({
      query: () => "/systems",
    }),

    /**
     * @Description read systems pagination
     * @URI /systems-pagination
     * @Method GET
     */
    readSystemsPagination: builder.query<
      RootResponse<{ systems: SystemDataType[] }>,
      Pagination
    >({
      query: ({ start = 1, take = 10 }) =>
        `/sysyems-pagination?start=${start}&take=${take}`,
      providesTags: ["System"],
    }),

    /**
     * @Description read system by key
     * @URI /system/key/{key}
     * @Method GET
     */
    readSystemByKey: builder.query<SystemDataType, string>({
      query: (key) => `/system/key/${key}`,
    }),

    /**
     * @Description update system
     * @URI /system/{key}
     * @Method PUT
     */
    updateSystem: builder.mutation<
      RootResponse<SystemDataType>,
      { key: number; body: SystemDataType }
    >({
      query: ({ key, body }) => ({
        url: `/system/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["System"],
    }),

    /**
     * @Description delete system
     * @URI /system/{key}
     * @Method DELETE
     */
    deleteSystem: builder.mutation<RootResponse<string>, string>({
      query: (key) => ({
        url: `/system/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["System"],
    }),
  }),
});

// export api hooks
export const {
  useCreateSystemMutation,
  useReadSystemsQuery,
  useReadSystemsPaginationQuery,
  useReadSystemByKeyQuery,
  useUpdateSystemMutation,
  useDeleteSystemMutation,
} = systemApi;

// export api endpoints
export const { endpoints: systemApiEndpoints } = systemApi;

// export api
export default systemApi;
