import { Pagination, RecoveryRequest } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

// Define the type for recoveryRequestApi
export const recoveryRequestApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create recovery request
     * @URI /recovery-request
     * @Method POST
     */
    createRecoveryRequest: builder.mutation({
      query: (body) => ({
        url: "/recovery-request",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read recovery requests
     * @URI /recovery-requests
     * @Method GET
     */
    readRecoveryRequests: builder.query<RootResponse<RecoveryRequest[]>, void>({
      query: () => "/recovery-requests",
    }),

    /**
     * @Description read recovery requests by page
     * @URI /recovery-requests/pagination
     * @Method GET
     */
    readRecoveryRequestsByPage: builder.query<
      RootResponse<{ userTypes: RecoveryRequest[] }>,
      Pagination
    >({
      query: (paginationRequest) => ({
        url: "/recovery-requests/pagination",
        method: "GET",
        params: paginationRequest,
      }),
    }),

    /**
     * @Description read recovery request by key
     * @URI /recovery-request/key/{key}
     * @Method GET
     */
    readRecoveryRequestByKey: builder.query<RecoveryRequest, string>({
      query: (key) => `/recovery-request/key/${key}`,
    }),

    /**
     * @Description update recovery request
     * @URI /recovery-request/{key}
     * @Method PUT
     */
    updateRecoveryRequest: builder.mutation<
      RecoveryRequest,
      { key: number; body: RecoveryRequest }
    >({
      query: ({ key, body }) => ({
        url: `/recovery-request/${key}`,
        method: "PUT",
        body,
      }),
    }),

    /**
     * @Description delete recovery request
     * @URI /recovery-request/{key}
     * @Method DELETE
     */
    deleteRecoveryRequest: builder.mutation<RecoveryRequest, string>({
      query: (key) => ({
        url: `/recovery-request/${key}`,
        method: "DELETE",
      }),
    }),

    /**
     * @Description search recovery request by username
     * @URI /recovery-request/username
     * @Method GET
     */
    searchRecoveryByUserName: builder.query<RecoveryRequest, string>({
      query: (username) => `/recovery-request/username/${username}`,
    }),
  }),
});

// export api hooks
export const {
  useCreateRecoveryRequestMutation,
  useReadRecoveryRequestsQuery,
  useReadRecoveryRequestsByPageQuery,
  useReadRecoveryRequestByKeyQuery,
  useUpdateRecoveryRequestMutation,
  useDeleteRecoveryRequestMutation,
  useSearchRecoveryByUserNameQuery,
} = recoveryRequestApi;

// export api endpoints
export const { endpoints: recoveryRequestApiEndpoints } = recoveryRequestApi;

// export api
export default recoveryRequestApi;
