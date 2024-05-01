import { EmailControl } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const emailControlApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create email control
     * @URI /email-control
     * @Method POST
     */
    createEmailControl: builder.mutation<EmailControl, EmailControl>({
      query: (body) => ({
        url: "/email-control",
        method: "POST",
        body,
      }),
    }),

    /**
     * @Description read email controls
     * @URI /email-controls
     * @Method GET
     */
    readEmailControls: builder.query<EmailControl[], void>({
      query: () => "/email-controls",
    }),

    /**
     * @Description read email control by key
     * @URI /email-control/key/{key}
     * @Method GET
     */
    readEmailControlByKey: builder.query<RootResponse<EmailControl>, string>({
      query: (key) => `/email-control/key/${key}`,
      providesTags: ["EmailControl"],
    }),

    /**
     * @Description update email control
     * @URI /email-control/{key}
     * @Method PUT
     */
    updateEmailControl: builder.mutation<
      RootResponse<EmailControl>,
      { key: number; body: EmailControl }
    >({
      query: ({ key, body }) => ({
        url: `/email-control/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["EmailControl"],
    }),

    /**
     * @Description delete email control
     * @URI /email-control/{key}
     * @Method DELETE
     */
    deleteEmailControl: builder.mutation<EmailControl, string>({
      query: (key) => ({
        url: `/email-control/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateEmailControlMutation,
  useReadEmailControlsQuery,
  useReadEmailControlByKeyQuery,
  useUpdateEmailControlMutation,
  useDeleteEmailControlMutation,
} = emailControlApi;

// export api endpoints
export const { endpoints: emailControlApiEndpoints } = emailControlApi;

// export api
export default emailControlApi;
