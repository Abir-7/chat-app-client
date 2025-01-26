/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query<
      any,
      { senderId: string; receiverId: string; chatId: string }
    >({
      query: (data) =>
        `/chat/get-message?senderId=${data.senderId}&receiverId=${data.receiverId}&chatId=${data.chatId}`,
    }),
  }),
});

export const { useGetMessageQuery } = messageApi;
