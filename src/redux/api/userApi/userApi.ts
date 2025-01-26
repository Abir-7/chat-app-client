/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/interface/users/user.interface";
import baseApi from "../baseApi";
import { IBaseApiResponse } from "@/interface/apiResponse/api.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<IBaseApiResponse<IUser[]>, string>({
      query: () => `/user/get-all-user`,
    }),
    createUser: builder.mutation<IBaseApiResponse<string>, any>({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useCreateUserMutation } = userApi;
