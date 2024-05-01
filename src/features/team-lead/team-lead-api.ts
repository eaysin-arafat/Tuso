import { Pagination, TeamLead } from "@/constants/api-interface";
import { API } from "../API/API";

export const teamLeadApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create team lead
     * @URI /team/lead
     * @Method POST
     */
    createTeamLead: builder.mutation<TeamLead, TeamLead>({
      query: (body) => ({
        url: "/team/lead",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read team leads
     * @URI /team/leads
     * @Method GET
     */
    readTeamLeads: builder.query<TeamLead[], void>({
      query: () => "/team/leads",
    }),

    /**
     * @Description read team lead by page
     * @URI /team-lead/pagination
     * @Method GET
     */
    readTeamLeadByPage: builder.query<TeamLead[], Pagination>({
      query: (paginationRequest) => ({
        url: "/team-lead/pagination",
        method: "GET",
        params: paginationRequest,
      }),
    }),

    /**
     * @Description read team lead by key
     * @URI /team-lead/key/{key}
     * @Method GET
     */
    readTeamLeadByKey: builder.query<TeamLead, string>({
      query: (key) => `/team-lead/key/${key}`,
    }),

    /**
     * @Description update team lead
     * @URI /team-lead/{key}
     * @Method PUT
     */
    updateTeamLead: builder.mutation<TeamLead, { key: number; body: TeamLead }>(
      {
        query: ({ key, body }) => ({
          url: `/team-lead/${key}`,
          method: "PUT",
          body,
        }),
      }
    ),

    /**
     * @Description delete team lead
     * @URI /team-lead/{key}
     * @Method DELETE
     */
    deleteTeamLead: builder.mutation<TeamLead, number>({
      query: (key) => ({
        url: `/team-lead/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateTeamLeadMutation,
  useReadTeamLeadsQuery,
  useReadTeamLeadByPageQuery,
  useReadTeamLeadByKeyQuery,
  useUpdateTeamLeadMutation,
  useDeleteTeamLeadMutation,
} = teamLeadApi;

// export api endpoints
export const { endpoints: teamLeadApiEndpoints } = teamLeadApi;

// export api
export default teamLeadApi;
