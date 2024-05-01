import { EmailTemplate } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const emailTemplateApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description create email template
     * @URI /email-template
     * @Method POST
     */
    createEmailTemplate: builder.mutation<EmailTemplate, EmailTemplate>({
      query: (body) => ({
        url: "/email-template",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EmailTemplates"],
    }),

    /**
     * @Description read email templates
     * @URI /email-templates
     * @Method GET
     */
    readEmailTemplates: builder.query<RootResponse<EmailTemplate[]>, void>({
      query: () => "/emailTemplates",
      providesTags: ["EmailTemplates"],
    }),

    /**
     * @Description read email template by key
     * @URI /email-template/key/{key}
     * @Method GET
     */
    readEmailTemplateByKey: builder.query<EmailTemplate, string>({
      query: (key) => `/email-template/key/${key}`,
    }),

    /**
     * @Description update email template
     * @URI /email-template/{key}
     * @Method PUT
     */
    updateEmailTemplate: builder.mutation<
      RootResponse<EmailTemplate>,
      { key: number; body: EmailTemplate }
    >({
      query: ({ key, body }) => ({
        url: `/emailTemplate/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["EmailTemplates"],
    }),

    /**
     * @Description delete email template
     * @URI /email-template/{key}
     * @Method DELETE
     */
    deleteEmailTemplate: builder.mutation<EmailTemplate, string>({
      query: (key) => ({
        url: `/email-template/${key}`,
        method: "DELETE",
      }),
    }),
  }),
});

// export api hooks
export const {
  useCreateEmailTemplateMutation,
  useReadEmailTemplatesQuery,
  useReadEmailTemplateByKeyQuery,
  useUpdateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
} = emailTemplateApi;

// export api endpoints
export const { endpoints: emailTemplateApiEndpoints } = emailTemplateApi;

// export api
export default emailTemplateApi;
