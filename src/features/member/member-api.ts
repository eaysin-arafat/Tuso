import { Member, MemberTypes, Pagination, TypeMember } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";
import { setIsTeamLead } from "../auth/auth-slice";

export const memberApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create member
     * @URI /member
     * @Method POST
     */
    createMember: builder.mutation({
      query: (body) => ({
        url: "/member",
        method: "POST",
        body,
      }),
      invalidatesTags: ["members"],
    }),

    /**
     * @Description read members
     * @URI /members
     * @Method GET
     */
    readMembers: builder.query<Member[], void>({
      query: () => "/members",
    }),

    /**
     * @Description read member by key
     * @URI /member/key/{key}
     * @Method GET
     */
    readMemberByKey: builder.query<Member, string>({
      query: (key) => `/member/key/${key}`,
    }),

    /**
     * @Description read member by user
     * @URI /member/user/{key}
     * @Method GET
     */
    readMemberByUser: builder.query<MemberTypes, number>({
      query: (key) => `/member/user/${key}`,

      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        // wait for the query to be fulfilled
        const result = await queryFulfilled;

        // check if the result is not null
        if (result?.data) {
          dispatch(setIsTeamLead(true));
        }
      },
    }),

    /**
     * @Description read team member by key
     * @URI /member/team/{key}
     * @Method GET
     */
    readTeamMemberByKey: builder.query<RootResponse<Member[]>, string>({
      query: (key) => `/member/team/${key}`,
    }),

    /**
     * @Description read member by team page
     * @URI /members-pagination/team/{key}
     * @Method GET
     */
    readMemberByTeamPage: builder.query<TypeMember, Pagination>({
      query: ({ key, start = 1, take = 10 }) =>
        `/members-pagination/team/${key}?start=${start}&take=${take}`,
      providesTags: ["members"],
    }),

    /**
     * @Description update member
     * @URI /member/{key}
     * @Method PUT
     */
    updateMember: builder.mutation<
      RootResponse<Member>,
      { key: number; body: Member }
    >({
      query: ({ key, body }) => ({
        url: `/member/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["members"],
    }),

    /**
     * @Description update member
     * @URI /member/{key}
     * @Method PUT
     */
    updateIdDeleteMember: builder.mutation<
      RootResponse<Member>,
      { key: number; body: Member }
    >({
      query: ({ key, body }) => ({
        url: `/member/delete/${key}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["members"],
    }),

    /**
     * @Description delete member
     * @URI /member/{key}
     * @Method DELETE
     */
    deleteMember: builder.mutation<Member, number>({
      query: (key) => ({
        url: `/member/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["members"],
    }),
  }),
});

// export api hooks
export const {
  useCreateMemberMutation,
  useReadMembersQuery,
  useReadMemberByKeyQuery,
  useReadMemberByUserQuery,
  useReadTeamMemberByKeyQuery,
  useReadMemberByTeamPageQuery,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useUpdateIdDeleteMemberMutation,
} = memberApi;

// export api endpoints
export const { endpoints: memberApiEndpoints } = memberApi;

// export api
export default memberApi;
