import { apiSlice } from "src/redux/api/apiSlice";

export const contactFormApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    submitContact: builder.mutation({
      query: (body) => ({
        url: "api/contact",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSubmitContactMutation } = contactFormApi;
