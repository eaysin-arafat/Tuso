import { Pagination, Team, TypeTeam } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

const teamApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create team
     * @URI /team
     * @Method POST
     */
    createTeam: builder.mutation<RootResponse<Team>, Team>({
      query: (body) => ({
        url: "/team",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Teams"],
    }),

    /**
     * @Description read teams
     * @URI /teams
     * @Method GET
     */
    readTeams: builder.query<RootResponse<Team[]>, void>({
      query: () => "/teams",
      providesTags: ["Teams"],
    }),

    /**
     * @Description read teams by page
     * @URI /teams/pagination
     * @Method GET
     */
    readTeamsByPage: builder.query<RootResponse<TypeTeam>, Pagination>({
      query: (paginationRequest) => ({
        url: "/teams/pagination",
        method: "GET",
        params: paginationRequest,
      }),
      providesTags: ["Teams"],
    }),

    /**
     * @Description read team by key
     * @URI /team/key/{key}
     * @Method GET
     */
    readTeamByKey: builder.query<Team, string>({
      query: (key) => `/team/key/${key}`,
    }),

    /**
     * @Description update team
     * @URI /team/{key}
     * @Method PUT
     */
    updateTeam: builder.mutation<
      RootResponse<Team>,
      { key: number; body: Team }
    >({
      query: ({ key, body }) => ({
        url: `/team/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Teams"],
    }),

    /**
     * @Description delete team
     * @URI /team/{key}
     * @Method DELETE
     */
    deleteTeam: builder.mutation<RootResponse<Team>, number>({
      query: (key) => ({ url: `/team/${key}`, method: "DELETE" }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

// export api hooks
export const {
  useCreateTeamMutation,
  useReadTeamsQuery,
  useReadTeamsByPageQuery,
  useReadTeamByKeyQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;

// export api endpoints
export const { endpoints: teamApiEndpoints } = teamApi;

// export api
export default teamApi;
