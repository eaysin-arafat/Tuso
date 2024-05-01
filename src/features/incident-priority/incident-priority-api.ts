import {
  IncidentPriority,
  Pagination,
  TypeIncidentPriority,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const incidentPriorityApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create incident priority
     * @URI /incident-priority
     * @Method POST
     */
    createIncidentPriority: builder.mutation<
      RootResponse<IncidentPriority>,
      IncidentPriority
    >({
      query: (body) => ({
        url: "/incident-priority",
        method: "POST",
        body,
      }),
      invalidatesTags: ["IncidentPriority"],
    }),

    /**
     * @Description read incident priorities
     * @URI /incident-priorities
     * @Method GET
     */
    readIncidentPriorities: builder.query<
      RootResponse<IncidentPriority[]>,
      void
    >({
      query: () => "/incident-priorities",
    }),

    /**
     * @Description read incident priority by key
     * @URI /incident-priority/key/{key}
     * @Method GET
     */
    readIncidentPriorityByKey: builder.query<IncidentPriority, string>({
      query: (key) => `/incident-priority/key/${key}`,
    }),

    /**
     * @Description read incident priority page
     * @URI /incident-priorities/pagination
     * @Method GET
     */
    readIncidentPrioritiesPage: builder.query<TypeIncidentPriority, Pagination>(
      {
        query: ({ start = 1, take = 10 }) => ({
          url: `/incident-priorities/pagination?start=${start}&take=${take}`,
          method: "GET",
        }),
        providesTags: ["IncidentPriority"],
      }
    ),

    /**
     * @Description update incident priority
     * @URI /incident-priority/{key}
     * @Method PUT
     */
    updateIncidentPriority: builder.mutation<
      RootResponse<IncidentPriority>,
      { body: IncidentPriority; key: string }
    >({
      query: ({ key, body }) => ({
        url: `/incident-priority/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["IncidentPriority"],
    }),

    /**
     * @Description delete incident priority
     * @URI /incident-priority/{key}
     * @Method DELETE
     */
    deleteIncidentPriority: builder.mutation<
      RootResponse<IncidentPriority>,
      number
    >({
      query: (key) => ({
        url: `/incident-priority/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["IncidentPriority"],
    }),
  }),
});

export const {
  useCreateIncidentPriorityMutation,
  useReadIncidentPrioritiesQuery,
  useReadIncidentPriorityByKeyQuery,
  useReadIncidentPrioritiesPageQuery,
  useUpdateIncidentPriorityMutation,
  useDeleteIncidentPriorityMutation,
} = incidentPriorityApi;

// export api endpoints
export const { endpoints: incidentPriorityApiEndpoints } = incidentPriorityApi;

// export api
export default incidentPriorityApi;
