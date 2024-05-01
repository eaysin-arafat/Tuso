import { Pagination, Province } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const provinceApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create province
     * @URI /province
     * @Method POST
     */
    createProvince: builder.mutation({
      query: (body) => ({
        url: `/province`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Provinces"],
    }),

    /**
     * @Description read provinces
     * @URI /provinces
     * @Method GET
     */
    readProvinces: builder.query<RootResponse<Province[]>, void>({
      query: () => `/provinces`,
    }),

    /**
     * @Description read province by key
     * @URI /province/key/{key}
     * @Method GET
     */
    readProvinceByKey: builder.query<Province, string>({
      query: (key) => `/province/key/${key}`,
    }),

    /**
     * @Description read province by country page
     * @URI /provinces-pagination/country/{key}
     * @Method GET
     */
    readProvinceByCountryPage: builder.query<
      RootResponse<{ province: Province[] }>,
      Pagination
    >({
      query: ({ key, start = 1, take = 10 }) =>
        `/provinces-pagination/country/${key}?start=${start}&take=${take}`,
      providesTags: ["Provinces"],
    }),

    /**
     * @Description read province by country
     * @URI /province/country/{key}
     * @Method GET
     */
    readProvinceByCountry: builder.query<Province[], string>({
      query: (key) => `/province/country/${key}`,
    }),

    /**
     * @Description update province
     * @URI /province/{key}
     * @Method PUT
     */
    updateProvince: builder.mutation({
      query: ({ key, body }) => ({
        url: `/province/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Provinces"],
    }),

    /**
     * @Description delete province
     * @URI /province/{key}
     * @Method DELETE
     */
    deleteProvince: builder.mutation<RootResponse<Province[]>, string>({
      query: (key) => ({
        url: `/province/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Provinces"],
    }),
  }),
});

// export hooks
export const {
  useCreateProvinceMutation,
  useReadProvincesQuery,
  useReadProvinceByKeyQuery,
  useReadProvinceByCountryPageQuery,
  useReadProvinceByCountryQuery,
  useUpdateProvinceMutation,
  useDeleteProvinceMutation,
} = provinceApi;

// export api endpoints
export const { endpoints: provinceApiEndpoints } = provinceApi;

// export api
export default provinceApi;
