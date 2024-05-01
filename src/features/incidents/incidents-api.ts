import {
  AdvanceSearchPagination,
  ClientIncdent,
  Incident,
  IncidentByUserName,
  IncidentsResponse,
  Notifications,
  Pagination,
  TypeIncidentEdit,
  TypeIncidentEditData,
} from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const incidentsApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create incident
     * @URI /incident
     * @Method POST
     */
    createIncident: builder.mutation({
      query: (body) => ({
        url: "/incident",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Incidents", "IncidentsAdvance", "IncidentsKey"],
    }),

    /**
     * @Description read incidents
     * @URI /incidents
     * @Method GET
     */
    readIncidents: builder.query<RootResponse<IncidentsResponse>, Pagination>({
      query: (params) => ({
        url: "/incidents",
        method: "GET",
        params,
      }),
      providesTags: ["Incidents"],
    }),

    /**
     * @Description read incidents by status
     * @URI /incidents/status
     * @Method GET
     */
    readIncidentsByStatus: builder.query<Incident[], string>({
      query: (status) => `/incidents/status/${status}`,
    }),

    /**
     * @Description read incidents by client
     * @URI /incidents/client
     * @Method GET
     */
    readIncidentsByClient: builder.query<Incident[], string>({
      query: (client) => `/incidents/client/${client}`,
    }),

    /**
     * @Description read incidents by key
     * @URI /incidents/key
     * @Method GET
     */

    readIncidentsByKey: builder.query<
      RootResponse<TypeIncidentEditData>,
      Pagination
    >({
      query: ({ key, userAccountId, start, take, status }) =>
        `/incidents/key?key=${key}&userAccountId=${userAccountId}&start=${start}&take=${take}&status=${status}`,
      providesTags: ["IncidentsKey"],
    }),

    /**
     * @Description read incidents by key
     * @URI /incidents/key
     * @Method GET
     */

    readIncidentsByUserId: builder.query<
      RootResponse<TypeIncidentEditData>,
      Pagination
    >({
      query: ({ userAccountId, start, take, status }) =>
        `/incidents/user/userAccountId?userAccountId=${userAccountId}&start=${start}&take=${take}&status=${status}`,
      providesTags: ["IncidentsKey"],
    }),

    /**
     * @Description read incidents by key
     * @URI /incidents/key
     * @Method GET
     */
    readIncidentsByTicketKey: builder.query<
      RootResponse<{ incidents: TypeIncidentEdit }>,
      string
    >({
      query: (key) => `/incident/key/${key}`,
      providesTags: ["IncidentsKey"],
    }),

    /**
     * @Description read incidents by expert
     * @URI /incidents/expert
     * @Method GET
     */
    readIncidentsByExpert: builder.query<Incident[], string>({
      query: (expert) => `/incidents/expert/${expert}`,
    }),

    /**
     * @Description read incidents by expert leader
     * @URI /incidents/expert-leader
     * @Method GET
     */
    readIncidentsByExpertLeader: builder.query<Incident[], string>({
      query: (expertLeader) => `/incidents/expert-leader/${expertLeader}`,
    }),

    /**
     * @Description read incidents by agent
     * @URI /incidents/agent/{key}
     * @Method GET
     */
    readIncidentsByAgent: builder.query<Incident[], string>({
      query: (key) => `/incidents/agent/${key}`,
    }),

    /**
     * @Description read incidents by search
     * @URI /incidents/search
     * @Method GET
     */
    readIncidentsBySearch: builder.query<Incident[], string>({
      query: (search) => `/incidents/search/${search}`,
    }),

    /**
     * @Description read incident by key
     * @URI /incident/key/{key}
     * @Method GET
     */
    readIncidentByKey: builder.query<Incident, string>({
      query: (key) => `/incident/key/${key}`,
    }),

    /**
     * @Description read incidents by username
     * @URI /incidents/username
     * @Method GET
     */
    readIncidentsByUserName: builder.query<Incident[], void>({
      query: () => "/incidents/username",
    }),

    /**
     * @Description get incidents by assign username
     * @URI /incidents/assign-username
     * @Method GET
     */
    getIncidentsByAssignUserName: builder.query<Incident[], void>({
      query: () => "/incidents/assign-username",
    }),

    /**
     * @Description read incident count
     * @URI /incidents/incidentCount
     * @Method GET
     */
    readIncidentCount: builder.query<RootResponse<IncidentByUserName>, string>({
      query: (username) => `/incidents/incidentCount?userName=${username}`,
    }),

    /**-
     * @Description read incident client count
     * @URI /incidents/incidentCount/client
     * @Method GET
     */
    readIncidentCountByClientCount: builder.query<
      RootResponse<ClientIncdent>,
      string
    >({
      query: (username) =>
        `/incidents/incidentCount/client?userName=${username}`,
    }),

    /**
     * @Description read incident by client notification
     * @URI /incidents-notification/{clientId}
     * @Method GET
     */
    readIncidentByClientNotification: builder.query<Notifications[], number>({
      query: (clientId) => `/incidents-notification/${clientId}`,
    }),

    /**
     * @Description update incident
     * @URI /incident/{key}
     * @Method PUT
     */
    updateIncident: builder.mutation({
      query: ({ key, body }) => ({
        url: `/incident/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Incidents", "IncidentsAdvance", "IncidentsKey"],
    }),

    /**
     * @Description update incident reassign
     * @URI /incident/{key}
     * @Method PUT
     */
    updateIncidentReassign: builder.mutation({
      query: ({ key, body }) => ({
        url: `/re-assignincident/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Incidents", "IncidentsAdvance", "IncidentsKey"],
    }),

    /**
     * @Description close incident
     * @URI /incident/close
     * @Method PUT
     */
    closeIncident: builder.mutation({
      query: (body) => ({
        url: "/incident/close",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Incidents", "IncidentsAdvance", "IncidentsKey"],
    }),

    /**
     * @Description delete incident
     * @URI /incident/{key}
     * @Method DELETE
     */
    deleteIncident: builder.mutation<Incident, string>({
      query: (key) => ({
        url: `/incident/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Incidents", "IncidentsAdvance", "IncidentsKey"],
    }),

    /**
     * @Description read incidents by advanced search
     * @URI /Incidents/advanced-search
     * @Method GET
     */
    readIncidentsByAdvancedSearch: builder.query<
      RootResponse<IncidentsResponse>,
      AdvanceSearchPagination
    >({
      query: ({
        start,
        take,
        status,
        ticketNo,
        fromDate,
        toDate,
        provinceId,
        districtId,
        facilityId,
        systemId,
        isresolved,
      }) => {
        let query = `Incidents/advanced-search?`;
        if (start) query += `start=${start}`;
        if (take) query += `&take=${take}`;
        if (status) query += `&status=${status}`;
        if (ticketNo) query += `&ticketNo=${ticketNo}`;
        if (fromDate) query += `&fromDate=${fromDate}`;
        if (toDate) query += `&toDate=${toDate}`;
        if (provinceId) query += `&provinceId=${provinceId}`;
        if (districtId) query += `&districtId=${districtId}`;
        if (facilityId) query += `&facilityId=${facilityId}`;
        if (systemId) query += `&systemId=${systemId}`;
        if (isresolved) query += `&isresolved=${isresolved}`;

        return {
          url: query,
        };
      },
      providesTags: ["IncidentsAdvance"],
    }),

    /**
     * @Description read incidents by Expert Leader advanced search
     * @URI /Incidents/advanced-search
     * @Method GET
     */
    readIncidentsByExpertTeamLeadAdvancedSearch: builder.query<
      RootResponse<IncidentsResponse>,
      AdvanceSearchPagination
    >({
      query: ({
        key,
        assignedTo = 0,
        start,
        take,
        status,
        ticketNo,
        fromDate,
        toDate,
        provinceId,
        districtId,
        facilityId,
        systemId,
        isresolved,
      }) => {
        let query = `incidents/expert-leader?`;
        if (key) query += `key=${key}`;
        if (assignedTo) query += `assignedTo=${assignedTo}`;
        if (start) query += `&start=${start}`;
        if (take) query += `&take=${take}`;
        if (status) query += `&status=${status}`;
        if (ticketNo) query += `&ticketNo=${ticketNo}`;
        if (fromDate) query += `&fromDate=${fromDate}`;
        if (toDate) query += `&toDate=${toDate}`;
        if (provinceId) query += `&provinceId=${provinceId}`;
        if (districtId) query += `&districtId=${districtId}`;
        if (facilityId) query += `&facilityId=${facilityId}`;
        if (systemId) query += `&systemId=${systemId}`;
        if (isresolved) query += `&isresolved=${isresolved}`;

        return {
          url: query,
        };
      },
      providesTags: ["IncidentsAdvance"],
    }),

    /**
     * @Description read incidents by Expert Leader advanced search
     * @URI /Incidents/advanced-search
     * @Method GET
     */
    readIncidentsByExpertMemberAdvancedSearch: builder.query<
      RootResponse<IncidentsResponse>,
      AdvanceSearchPagination
    >({
      query: ({
        key,
        start,
        take,
        status,
        ticketNo,
        fromDate,
        toDate,
        provinceId,
        districtId,
        facilityId,
        systemId,
        isresolved,
      }) => {
        let query = `incidents/expert?`;
        if (key) query += `key=${key}`;
        if (start) query += `&start=${start}`;
        if (take) query += `&take=${take}`;
        if (status) query += `&status=${status}`;
        if (ticketNo) query += `&ticketNo=${ticketNo}`;
        if (fromDate) query += `&fromDate=${fromDate}`;
        if (toDate) query += `&toDate=${toDate}`;
        if (provinceId) query += `&provinceId=${provinceId}`;
        if (districtId) query += `&districtId=${districtId}`;
        if (facilityId) query += `&facilityId=${facilityId}`;
        if (systemId) query += `&systemId=${systemId}`;
        if (isresolved) query += `&isresolved=${isresolved}`;

        return {
          url: query,
        };
      },
      providesTags: ["IncidentsAdvance"],
    }),

    /**
     * @Description read weekly incidents by advanced search
     * @URI /weeklyIncident/weekly-report
     * @Method GET
     */
    readWeeklyIncidentsByAdvancedSearch: builder.query<
      RootResponse<IncidentsResponse>,
      AdvanceSearchPagination
    >({
      query: ({
        start,
        take,
        status,
        ticketNo,
        fromDate,
        toDate,
        provinceId,
        districtId,
        facilityId,
        systemId,
        isresolved,
      }) => {
        let query = `Incidents/advanced-search?`;
        if (start) query += `start=${start}`;
        if (take) query += `&take=${take}`;
        if (status) query += `&status=${status}`;
        if (ticketNo) query += `&ticketNo=${ticketNo}`;
        if (fromDate) query += `&fromDate=${fromDate}`;
        if (toDate) query += `&toDate=${toDate}`;
        if (provinceId) query += `&provinceId=${provinceId}`;
        if (districtId) query += `&districtId=${districtId}`;
        if (facilityId) query += `&facilityId=${facilityId}`;
        if (systemId) query += `&systemId=${systemId}`;
        if (isresolved) query += `&isresolved=${isresolved}`;

        return {
          url: query,
        };
      },

      providesTags: ["IncidentsAdvance"],
    }),
  }),
});
// export api hooks
export const {
  useCreateIncidentMutation,
  useReadIncidentsQuery,
  useReadIncidentsByStatusQuery,
  useReadIncidentsByClientQuery,
  useReadIncidentsByKeyQuery,
  useReadIncidentsByExpertQuery,
  useReadIncidentsByExpertLeaderQuery,
  useReadIncidentsByAgentQuery,
  useReadIncidentsBySearchQuery,
  useReadIncidentByKeyQuery,
  useReadIncidentsByUserNameQuery,
  useGetIncidentsByAssignUserNameQuery,
  useReadIncidentCountQuery,
  useReadIncidentByClientNotificationQuery,
  useUpdateIncidentMutation,
  useCloseIncidentMutation,
  useDeleteIncidentMutation,
  useReadIncidentsByAdvancedSearchQuery,
  useReadWeeklyIncidentsByAdvancedSearchQuery,
  useReadIncidentsByTicketKeyQuery,
  useReadIncidentsByExpertTeamLeadAdvancedSearchQuery,
  useReadIncidentsByExpertMemberAdvancedSearchQuery,
  useReadIncidentsByUserIdQuery,
  useReadIncidentCountByClientCountQuery,
  useUpdateIncidentReassignMutation,
} = incidentsApi;

// export api endpoints
export const { endpoints: incidentApiEndpoints } = incidentsApi;

// export api
export default incidentsApi;
