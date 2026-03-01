import { apiSlice } from "src/redux/api/apiSlice";

export const newsletterApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (body) => ({
        url: "api/newsletter",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Newsletter"],
    }),
  }),
});

export const { useSubscribeMutation } = newsletterApi;
