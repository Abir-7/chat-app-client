/* eslint-disable @typescript-eslint/no-explicit-any */
// Adjust this import to fit your file structure

import { IBaseApiResponse } from "@/interface/apiResponse/api.interface";
import baseApi from "../baseApi";
import { IChatGroup } from "@/interface/groupChat/group.interface";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<
      any,
      { users: string[]; creatorId: string; name: string }
    >({
      query: (data) => ({
        url: `/chat/create-group`,
        method: "POST",
        body: data,
      }),
    }),
    getUserGroup: builder.query<IBaseApiResponse<IChatGroup[]>, null>({
      query: () => ({
        url: `/chat/get-user-group`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateGroupMutation, useGetUserGroupQuery } = chatApi;
