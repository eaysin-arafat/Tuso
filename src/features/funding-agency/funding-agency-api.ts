import {
  FundingAgency,
  FundingAgencyOptions,
  Pagination,
  TypeFundingAgency,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const fundingAgencyApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create funding agency
     * @URI /funding-agency
     * @Method POST
     */
    createFundingAgency: builder.mutation({
      query: (body) => ({
        url: "/funding-agency",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FundingAgencies"],
    }),

    /**
     * @Description read funding agencies
     * @URI /funding-agencies
     * @Method GET
     */
    readFundingAgencies: builder.query<FundingAgency[], void>({
      query: () => "/funding-agencies",
    }),

    /**
     * @Description read funding agencies page
     * @URI /funding-agencies/pagination
     * @Method GET
     */
    readFundingAgenciesPage: builder.query<TypeFundingAgency, Pagination>({
      query: ({ start = 1, take = 10 }) =>
        `/funding-agencies/pagination?start=${start}&take=${take}`,
      providesTags: ["FundingAgencies"],
    }),

    /**
     * @Description read funding agency by key
     * @URI /funding-agency/key/{key}
     * @Method GET
     */
    readFundingAgencyByKey: builder.query<FundingAgency, string>({
      query: (key) => `/funding-agency/key/${key}`,
    }),

    /**
     * @Description read funding agency by system
     * @URI /funding-agency/system/{key}
     * @Method GET
     */
    readFundingAgencyBySystem: builder.query<FundingAgencyOptions, string>({
      query: (key) => `/funding-agency/system/${key}`,
    }),

    /**
     * @Description update funding agency
     * @URI /fundingAgency/{key}
     * @Method PUT
     */
    updateFundingAgency: builder.mutation<
      RootResponse<FundingAgency>,
      { key: number; body: FundingAgency }
    >({
      query: ({ key, body }) => ({
        url: `/fundingAgency/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["FundingAgencies"],
    }),

    /**
     * @Description delete funding agency
     * @URI /fundingAgency/{key}
     * @Method DELETE
     */
    deleteFundingAgency: builder.mutation<RootResponse<FundingAgency>, number>({
      query: (key) => ({
        url: `/fundingAgency/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FundingAgencies"],
    }),

    /**
     * @Description read incident funding agencies
     * @URI /incident-funding-agencies
     * @Method GET
     */
    readIncidentFundingAgencies: builder.query<FundingAgency[], void>({
      query: () => "/incident-funding-agencies",
    }),

    /**
     * @Description read incident funding agency by incident
     * @URI /incident-funding-agencies/incident/{key}
     * @Method GET
     */
    readIncidentFundingAgencyByIncident: builder.query<FundingAgency, string>({
      query: (key) => `/incident-funding-agencies/incident/${key}`,
    }),

    /**
     * @Description read incident funding agency by key
     * @URI /incident-funding-agencies/key/{key}
     * @Method GET
     */
    readIncidentFundingAgencyByKey: builder.query<FundingAgency, string>({
      query: (key) => `/incident-funding-agencies/key/${key}`,
    }),
  }),
});

// export api hooks
export const {
  useCreateFundingAgencyMutation,
  useReadFundingAgenciesQuery,
  useReadFundingAgenciesPageQuery,
  useReadFundingAgencyByKeyQuery,
  useReadFundingAgencyBySystemQuery,
  useUpdateFundingAgencyMutation,
  useDeleteFundingAgencyMutation,
  useReadIncidentFundingAgenciesQuery,
  useReadIncidentFundingAgencyByIncidentQuery,
  useReadIncidentFundingAgencyByKeyQuery,
} = fundingAgencyApi;

// export api endpoints
export const { endpoints: fundingAgencyApiEndpoints } = fundingAgencyApi;

// export api
export default fundingAgencyApi;
