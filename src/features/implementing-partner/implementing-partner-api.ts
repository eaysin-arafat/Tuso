import {
  ImplementingPartner,
  ImplementingPartnerOptions,
  Pagination,
  TypeImplementingPartner,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const implementingPartnerApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create implementing partner
     * @URI /implementing-partner
     * @Method POST
     */
    createImplementingPartner: builder.mutation({
      query: (body) => ({
        url: "/implementing-partner",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ImplementingPartners"],
    }),

    /**
     * @Description read implementing partners
     * @URI /implementing-partners
     * @Method GET
     */
    readImplementingPartners: builder.query<ImplementingPartner[], void>({
      query: () => "/implementing-partners",
    }),

    /**
     * @Description read implementing partners page
     * @URI /implementing-partners/pagination
     * @Method GET
     */
    readImplementingPartnersPage: builder.query<
      TypeImplementingPartner,
      Pagination
    >({
      query: ({ start = 1, take = 10 }) =>
        `/implementing-partners/pagination?start=${start}&take=${take}`,
      providesTags: ["ImplementingPartners"],
    }),

    /**
     * @Description read implementing partner by key
     * @URI /implementing-partner/key/{key}
     * @Method GET
     */
    readImplementingPartnerByKey: builder.query<ImplementingPartner, string>({
      query: (key) => `/implementing-partner/key/${key}`,
    }),

    /**
     * @Description read implementing partner by system
     * @URI /implementing-partner/system/{key}
     * @Method GET
     */
    readImplementingPartnerBySystem: builder.query<
      ImplementingPartnerOptions,
      string
    >({
      query: (key) => `/implementing-partner/system/${key}`,
    }),

    /**
     * @Description update implementing partner
     * @URI /implementing-partner/{key}
     * @Method PUT
     */
    updateImplementingPartner: builder.mutation<
      RootResponse<ImplementingPartner>,
      { key: number; body: ImplementingPartner }
    >({
      query: ({ key, body }) => ({
        url: `/implementing-partner/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ImplementingPartners"],
    }),

    /**
     * @Description delete implementing partner
     * @URI /implementing-partner/{key}
     * @Method DELETE
     */
    deleteImplementingPartner: builder.mutation<
      RootResponse<ImplementingPartner>,
      number
    >({
      query: (key) => ({
        url: `/implementing-partner/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImplementingPartners"],
    }),

    /**
     * @Description read implementing partners by system
     * @URI /implementing-partners/system/{key}
     * @Method GET
     */
    readImplementingPartnersBySystem: builder.query<
      ImplementingPartner[],
      string
    >({
      query: (key) => `/implementing-partners/system/${key}`,
    }),

    /**
     * @Description read incident implementing partners
     * @URI /incident-implementing-partners
     * @Method GET
     */
    readIncidentImplementingPartners: builder.query<
      ImplementingPartner[],
      void
    >({
      query: () => "/incident-implementing-partners",
    }),

    /**
     * @Description read incident implementing partner by incident
     * @URI /incident-implementing-partner/incident/{key}
     * @Method GET
     */
    readIncidentImplementingPartnerByIncident: builder.query<
      ImplementingPartner,
      string
    >({
      query: (key) => `/incident-implementing-partner/incident/${key}`,
    }),

    /**
     * @Description read incident implementing partner by key
     * @URI /incident-implementing-partner/key/{key}
     * @Method GET
     */
    readIncidentImplementingPartnerByKey: builder.query<
      ImplementingPartner,
      string
    >({
      query: (key) => `/incident-implementing-partner/key/${key}`,
    }),
  }),
});

// export api hooks
export const {
  useCreateImplementingPartnerMutation,
  useDeleteImplementingPartnerMutation,
  useReadImplementingPartnerByKeyQuery,
  useReadImplementingPartnerBySystemQuery,
  useReadImplementingPartnersPageQuery,
  useReadImplementingPartnersQuery,
  useUpdateImplementingPartnerMutation,
  useReadImplementingPartnersBySystemQuery,
  useReadIncidentImplementingPartnersQuery,
  useReadIncidentImplementingPartnerByIncidentQuery,
  useReadIncidentImplementingPartnerByKeyQuery,
} = implementingPartnerApi;

// export api endpoints
export const { endpoints: implementingPartnerApiEndpoints } =
  implementingPartnerApi;

// export api
export default implementingPartnerApi;
