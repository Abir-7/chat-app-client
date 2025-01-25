/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "../baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMessage: builder.query<
      any,
      { senderId: string; receiverId: string }
    >({
      query: (data) =>
        `/message/get-message?senderId=${data.senderId}&receiverId=${data.receiverId}`,
    }),
  }),
});

export const { useGetUserMessageQuery } = messageApi;
