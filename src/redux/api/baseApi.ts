/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentToken } from "@/service/auth.service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/api",
    prepareHeaders: async (headers) => {
      const token = await getCurrentToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default baseApi;
