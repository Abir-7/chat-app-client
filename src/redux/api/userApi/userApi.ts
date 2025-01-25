/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/interface/users/user.interface";
import baseApi from "../baseApi";
import { IBaseApiResponse } from "@/interface/apiResponse/api.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query<IBaseApiResponse<IUser[]>, string>({
      query: () => `/user/get-all-user`,
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;
