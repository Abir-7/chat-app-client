/* eslint-disable @typescript-eslint/no-explicit-any */
// Adjust this import to fit your file structure

import baseApi from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation<any, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useAuthLoginMutation } = authApi;
