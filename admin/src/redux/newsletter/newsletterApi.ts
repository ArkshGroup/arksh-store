import {
  ISubscriberListResponse,
  ISubscriberCountResponse,
} from "@/types/subscriber-type";
import { apiSlice } from "../api/apiSlice";

type SubscriberListQuery = {
  page?: number;
  limit?: number;
  status?: string;
};

export const newsletterApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getSubscribers: builder.query<ISubscriberListResponse, SubscriberListQuery | void>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.page) q.set("page", String(params.page));
        if (params?.limit) q.set("limit", String(params.limit));
        if (params?.status) q.set("status", params.status);
        const queryString = q.toString();
        return { url: `/api/newsletter${queryString ? `?${queryString}` : ""}` };
      },
      providesTags: ["AllSubscribers"],
      keepUnusedDataFor: 300,
    }),
    getSubscriberCount: builder.query<ISubscriberCountResponse, string | void>({
      query: (status) =>
        status ? `/api/newsletter/count?status=${status}` : "/api/newsletter/count",
      providesTags: ["AllSubscribers"],
    }),
    deleteSubscriber: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/newsletter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllSubscribers"],
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useGetSubscriberCountQuery,
  useDeleteSubscriberMutation,
} = newsletterApi;
