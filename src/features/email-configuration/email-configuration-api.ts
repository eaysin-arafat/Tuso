import { EmailConfiguration } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const emailConfigurationApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create email configuration
     * @URI /email-configuration
     * @Method POST
     */
    createEmailConfiguration: builder.mutation<
      RootResponse<EmailConfiguration>,
      EmailConfiguration
    >({
      query: (body) => ({
        url: "/email-configuration",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmailConfig"],
    }),

    /**
     * @Description read email configurations
     * @URI /email-configurations
     * @Method GET
     */
    readEmailConfigurations: builder.query<
      {
        statusCode: number;
        message: string;
        data: EmailConfiguration[];
        isSuccess: boolean;
      },
      void
    >({
      query: () => "/email-configurations",
      providesTags: ["EmailConfig"],
    }),

    /**
     * @Description read email configuration by key
     * @URI /email-configuration/key/{key}
     * @Method GET
     */
    readEmailConfigurationByKey: builder.query<EmailConfiguration, string>({
      query: (key) => `/email-configuration/key/${key}`,
    }),

    /**
     * @Description update email configuration
     * @URI /email-configuration/{key}
     * @Method PUT
     */
    updateEmailConfiguration: builder.mutation<
      RootResponse<EmailConfiguration>,
      { key: number; body: EmailConfiguration }
    >({
      query: ({ key, body }) => ({
        url: `/email-configuration/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["EmailConfig"],
    }),

    /**
     * @Description delete email configuration
     * @URI /email-configuration/{key}
     * @Method DELETE
     */
    deleteEmailConfiguration: builder.mutation<
      RootResponse<EmailConfiguration>,
      string
    >({
      query: (key) => ({
        url: `/email-configuration/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmailConfig"],
    }),

    /**
     * @Description ticket creation email
     * @URI /email-configuration/ticket-creationemail
     * @Method GET
     */
    ticketCreationEmail: builder.query<EmailConfiguration, void>({
      query: () => "/email-configuration/ticket-creationemail",
    }),

    /**
     * @Description ticket close email
     * @URI /email-configuration/ticket-closeemail
     * @Method GET
     */
    ticketCloseEmail: builder.query<EmailConfiguration, void>({
      query: () => "/email-configuration/ticket-closeemail",
    }),
  }),
});

// export  api hooks
export const {
  useCreateEmailConfigurationMutation,
  useReadEmailConfigurationsQuery,
  useReadEmailConfigurationByKeyQuery,
  useUpdateEmailConfigurationMutation,
  useDeleteEmailConfigurationMutation,
  useTicketCreationEmailQuery,
  useTicketCloseEmailQuery,
} = emailConfigurationApi;

// export api endpoints
export const { endpoints: emailConfigurationApiEndpoints } =
  emailConfigurationApi;

// export api
export default emailConfigurationApi;
