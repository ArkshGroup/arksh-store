import {
  IReview,
  IReviewListResponse,
  IReviewCountResponse,
} from "@/types/review-type";
import { apiSlice } from "../api/apiSlice";

type ReviewListQuery = {
  page?: number;
  limit?: number;
  status?: string;
  productId?: string;
};

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllReviews: builder.query<IReviewListResponse, ReviewListQuery | void>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.page) q.set("page", String(params.page));
        if (params?.limit) q.set("limit", String(params.limit));
        if (params?.status) q.set("status", params.status);
        if (params?.productId) q.set("productId", params.productId);
        const queryString = q.toString();
        return { url: `/api/review/all${queryString ? `?${queryString}` : ""}` };
      },
      providesTags: ["AllReviews"],
      keepUnusedDataFor: 300,
    }),
    getReviewCount: builder.query<IReviewCountResponse, string | void>({
      query: (status) =>
        status
          ? `/api/review/count?status=${status}`
          : "/api/review/count",
      providesTags: ["AllReviews"],
    }),
    getReview: builder.query<{ success: boolean; data: IReview }, string>({
      query: (id) => `/api/review/${id}`,
      transformResponse: (res: { success: boolean; data: IReview }) => res,
      providesTags: (_result, _err, id) => [{ type: "Review", id }],
    }),
    updateReview: builder.mutation<
      { success: boolean; message: string; data: IReview },
      { id: string; status: "pending" | "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/api/review/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["AllReviews", "Review"],
    }),
    deleteReview: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllReviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetReviewCountQuery,
  useGetReviewQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
