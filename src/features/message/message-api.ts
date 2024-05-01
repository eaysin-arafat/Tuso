import { Message, MessageByKey } from "@/constants/api-interface";
import { RootResponse } from "@/constants/api-interface/root";
import { API } from "../API/API";

export const messageApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * @description Create a new message
     * @URI /message
     * @method POST
     */
    createMessage: builder.mutation({
      query: (body) => ({
        url: "message",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Messages", "Message"],
    }),

    /**
     * @description Read all messages
     * @URI /messages
     * @method GET
     */
    readMessages: builder.query<RootResponse<Message[]>, void>({
      query: () => "messages",
      providesTags: ["Message"],
    }),

    /**
     * @description Read a message by key
     * @URI /message/key/:key
     * @method GET
     */
    readMessageByKey: builder.query<Message, string>({
      query: (key) => `message/key/${key}`,
    }),

    /**
     * @description Read a message by Incident key
     * @URI /message/key/:key
     * @method GET
     */
    readMessageByIncidentKey: builder.query<RootResponse<MessageByKey[]>, string>({
      query: (key) => `message/incident/${key}`,

    
      providesTags: ["Messages"],
    }),

    /**
     * @description Update a message
     * @URI /message/:key
     * @method PUT
     */
    updateMessage: builder.mutation<Message, { key: string; body: Message }>({
      query: ({ key, body }) => ({
        url: `message/${key}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Messages", "Message"],
    }),

    /**
     * @description Delete a message
     * @URI /message/:key
     * @method DELETE
     */
    deleteMessage: builder.mutation<void, string>({
      query: (key) => ({
        url: `message/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages", "Message"],
    }),
  }),
});

// export api hooks
export const {
  useCreateMessageMutation,
  useReadMessagesQuery,
  useReadMessageByKeyQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useReadMessageByIncidentKeyQuery,
} = messageApi;

// export api endpoints
export const { endpoints: messageApiEndpoints } = messageApi;

// export api
export default messageApi;
