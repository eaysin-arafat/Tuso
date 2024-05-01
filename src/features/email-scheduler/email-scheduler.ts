import { EmailControl } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";
import { SchedulerFormDataType } from "@/constants/form-interface/scheduler";

export const emailSchedulerApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @Description update email scheduler
     * @URI /background/scheduler/{key}
     * @Method PUT
     */
    updateEmailScheduler: builder.mutation<
      RootResponse<EmailControl>,
      SchedulerFormDataType
    >({
      query: (body) => ({
        url: `/background/scheduler`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

// export api hooks
export const { useUpdateEmailSchedulerMutation } = emailSchedulerApi;

// export api endpoints
export const { endpoints: emailSchedulerApiEndpoints } = emailSchedulerApi;

// export api
export default emailSchedulerApi;
