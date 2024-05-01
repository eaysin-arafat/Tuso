import { District, Districts, Pagination } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const districtApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create district
     * @URI /district
     * @Method POST
     */
    createDistrict: builder.mutation({
      query: (body) => ({
        url: `/district`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Districts"],
    }),

    /**
     * @Description read districts
     * @URI /districts
     * @Method GET
     */
    readDistricts: builder.query<RootResponse<Districts[]>, void>({
      query: () => `/districts`,
    }),

    /**
     * @Description read district by key
     * @URI /district/key/{key}
     * @Method GET
     */
    readDistrictByKey: builder.query<RootResponse<Districts>, string>({
      query: (key) => `/district/key/${key}`,
    }),

    /**
     * @Description read district by province
     * @URI /district/province/{key}
     * @Method GET
     */
    readDistrictByProvince: builder.query<RootResponse<Districts[]>, string>({
      query: (key) => `/district/province/${key}`,
    }),

    /**
     * @Description read district by province page
     * @URI /districts-pagination/province/{key}
     * @Method GET
     */
    readDistrictByProvincePage: builder.query<
      RootResponse<District>,
      Pagination
    >({
      query: ({ key, start, take, search }) => {
        let query = "/?";

        if (start) query += `start=${start}`;
        if (take) query += `&take=${take}`;
        if (search) query += `&search=${search}`;

        return {
          url: `/districts-pagination/province/${key}` + query,
          method: "GET",
        };
      },
      providesTags: ["Districts"],
    }),

    /**
     * @Description read district by province page
     * @URI /districts-pagination/province/{key}
     * @Method GET
     */
    readDistrictByProvinceInfinite: builder.query<
      RootResponse<District>,
      Pagination
    >({
      query: ({ key, start }) =>
        `/districts-pagination/province/${key}?start=${start}&take=10`,
      providesTags: (_result, _error, { key }) => {
        return [{ type: "Districts", id: key.toString() }];
      },
    }),

    /**
     * @Description update district
     * @URI /district/{key}
     * @Method PUT
     */
    updateDistrict: builder.mutation({
      query: ({ key, body }) => ({
        url: `/district/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Districts"],
    }),

    /**
     * @Description delete district
     * @URI /district/{key}
     * @Method DELETE
     */
    deleteDistrict: builder.mutation<RootResponse<District>, number>({
      query: (key) => ({
        url: `/district/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Districts"],
    }),
  }),
});

// Export hooks for usage in  components
export const {
  useCreateDistrictMutation,
  useReadDistrictsQuery,
  useReadDistrictByKeyQuery,
  useReadDistrictByProvinceQuery,
  useReadDistrictByProvincePageQuery,
  useReadDistrictByProvinceInfiniteQuery,
  useUpdateDistrictMutation,
  useDeleteDistrictMutation,
} = districtApi;

// export api endpoints
export const { endpoints: districtApiEndPoints } = districtApi;

// export api
export default districtApi;
