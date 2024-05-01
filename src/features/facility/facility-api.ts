import { Pagination } from "@/constants/api-interface";
import { Facility, TypeFacility } from "@/constants/api-interface/Facility";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const facilityApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create facility
     * @URI /facility
     * @Method POST
     */
    createFacility: builder.mutation({
      query: (body) => ({
        url: "/facility",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Facilities"],
    }),

    /**
     * @Description read facilities
     * @URI /facilities
     * @Method GET
     */
    readFacilities: builder.query<TypeFacility, void>({
      query: () => "/facilities",
    }),

    /**
     * @Description read facility by key
     * @URI /facility/key/{key}
     * @Method GET
     */
    readFacilityByKey: builder.query<RootResponse<Facility>, string>({
      query: (key) => `/facility/key/${key}`,
    }),

    /**
     * @Description read facility by district page
     * @URI /facilities-pagination/district/{key}
     * @Method GET
     */
    readFacilitiesByDistrictPage: builder.query<TypeFacility, Pagination>({
      query: ({ key, start, take, search }) => {
        let query = "/?";

        if (start) query += `start=${start}`;
        if (take) query += `&take=${take}`;
        if (search) query += `&search=${search}`;

        return {
          url: `/facilities-pagination/district/${key}` + query,
          method: "GET",
        };
      },
      providesTags: ["Facilities"],
    }),

    /**
     * @Description read facility by district page
     * @URI /facilities-pagination/district/{key}
     * @Method GET
     */
    readFacilitiesByDistrictInfinite: builder.query<TypeFacility, Pagination>({
      query: ({ key, start }) => ({
        url: `/facilities-pagination/district/${key}?start=${start}&take=10`,
        method: "GET",
      }),
      providesTags: ["Facilities"],
    }),

    //   readUserAccountsPageExperiment: builder.query<
    //   RootResponse<{ totalUser: number; currentPage: number; list: User[] }>,
    //   Pagination
    // >({
    //   query: ({ start, take, search }) => {
    //     let query = "?";

    //     if (search) query += `name=${search}&`;
    //     if (start) query += `start=${start}&`;
    //     if (take) query += `take=${take}&`;
    //     return {
    //       url: `/user-accounts/name/role${query}`,
    //     };
    //   },
    // }),

    // readUserAccountsPageInfiniteExperiment: builder.query<
    //   RootResponse<{ totalUser: number; currentPage: number; list: User[] }>,
    //   Pagination
    // >({
    //   query: ({ start }) => ({
    //     url: `/user-accounts/name/role?start=${start}&take=10&`,
    //   }),
    // }),

    /**
     * @Description read facility by district
     * @URI /facility/district/{key}
     * @Method GET
     */
    readFacilityByDistrict: builder.query<RootResponse<Facility[]>, string>({
      query: (key) => `/facility/district/${key}`,
    }),

    /**
     * @Description read facility by name
     * @URI /facility/name/{name}
     * @Method GET
     */
    readFacilityByName: builder.query<Facility, string>({
      query: (name) => `/facility/name/${name}`,
    }),

    /**
     * @Description update facility
     * @URI /facility/{key}
     * @Method PUT
     */
    updateFacility: builder.mutation<
      RootResponse<Facility>,
      { key: number; body: Facility }
    >({
      query: ({ key, body }) => ({
        url: `/facility/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Facilities"],
    }),

    /**
     * @Description delete facility
     * @URI /facility/{key}
     * @Method DELETE
     */
    deleteFacility: builder.mutation<RootResponse<Facility>, string>({
      query: (key) => ({
        url: `/facility/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Facilities"],
    }),
  }),
});

// export api hooks
export const {
  useCreateFacilityMutation,
  useReadFacilitiesQuery,
  useReadFacilityByKeyQuery,
  useReadFacilitiesByDistrictPageQuery,
  useReadFacilitiesByDistrictInfiniteQuery,
  useReadFacilityByDistrictQuery,
  useReadFacilityByNameQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = facilityApi;

// export  api endpoints
export const { endpoints: facilityApiEndpoints } = facilityApi;

// export api
export default facilityApi;
