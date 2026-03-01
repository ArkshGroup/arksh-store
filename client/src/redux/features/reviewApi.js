import { apiSlice } from "src/redux/api/apiSlice";

export const reviewApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getReviewsByProduct: builder.query({
      query: ({ productId, page = 1, limit = 10 }) =>
        `api/review/product/${productId}?page=${page}&limit=${limit}`,
      providesTags: (result, error, { productId }) => [
        { type: "Reviews", id: productId },
      ],
    }),
    getReviewCountByProduct: builder.query({
      query: (productId) => `api/review/product/${productId}/count`,
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),
    getMyReviewForProduct: builder.query({
      query: (productId) => `api/review/product/${productId}/my-review`,
      providesTags: (result, error, productId) => [
        { type: "Review", id: productId },
      ],
    }),
    getAllReviews: builder.query({
      query: ({ page = 1, limit = 20, status } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (status) params.set("status", status);
        return `api/review/all?${params.toString()}`;
      },
      providesTags: ["Reviews"],
    }),
    getReviewCount: builder.query({
      query: (status) =>
        status ? `api/review/count?status=${status}` : "api/review/count",
      providesTags: ["Reviews"],
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: "api/review",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "Reviews",
        { type: "Reviews", id: arg.productId },
        { type: "Review", id: arg.productId },
      ],
    }),
  }),
});

export const {
  useGetReviewsByProductQuery,
  useGetReviewCountByProductQuery,
  useGetMyReviewForProductQuery,
  useGetAllReviewsQuery,
  useGetReviewCountQuery,
  useAddReviewMutation,
} = reviewApi;
