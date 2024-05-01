import { DeviceType, DeviceTypes, Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const deviceTypeApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create device type
     * @URI /device-type
     * @Method POST
     */
    createDeviceType: builder.mutation({
      query: (body) => ({
        url: "/device-type",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DeviceType"],
    }),

    /**
     * @Description read device types
     * @URI /device-types
     * @Method GET
     */
    readDeviceTypes: builder.query<RootResponse<DeviceType[]>, void>({
      query: () => "/device-types",
    }),

    /**
     * @Description read device types page
     * @URI /device-types/pagination
     * @Method GET
     */
    readDeviceTypesPage: builder.query<
      RootResponse<{ deviceTypes: DeviceTypes[] }>,
      Pagination
    >({
      query: ({ start = 1, take = 10 }) =>
        `/device-type-page?start=${start}&take=${take}`,
      providesTags: ["DeviceType"],
    }),

    /**
     * @Description read device type by page
     * @URI /device-type-page
     * @Method GET
     */
    readDeviceTypeByPage: builder.query<DeviceType[], void>({
      query: () => "/device-type-page",
    }),

    /**
     * @Description read device type by key
     * @URI /device-type/key/{key}
     * @Method GET
     */
    readDeviceTypeByKey: builder.query<DeviceType, string>({
      query: (key) => `/device-type/key/${key}`,
    }),

    /**
     * @Description update device type
     * @URI /device-type/{key}
     * @Method PUT
     */
    updateDeviceType: builder.mutation<
      RootResponse<DeviceType>,
      { key: number; body: DeviceType }
    >({
      query: ({ key, body }) => ({
        url: `/device-type/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["DeviceType"],
    }),

    /**
     * @Description delete device type
     * @URI /device-type/{key}
     * @Method DELETE
     */
    deleteDeviceType: builder.mutation({
      query: (key) => ({
        url: `/device-type/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeviceType"],
    }),
  }),
});

// export api hooks
export const {
  useCreateDeviceTypeMutation,
  useReadDeviceTypesQuery,
  useReadDeviceTypesPageQuery,
  useReadDeviceTypeByPageQuery,
  useReadDeviceTypeByKeyQuery,
  useUpdateDeviceTypeMutation,
  useDeleteDeviceTypeMutation,
} = deviceTypeApi;

// export api endpoints
export const { endpoints: deviceTypeApiEndpoints } = deviceTypeApi;

// export api
export default deviceTypeApi;
