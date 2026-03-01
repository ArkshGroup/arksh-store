import { apiSlice } from "src/redux/api/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getShowingBlogs: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set("page", params.page);
        if (params?.limit) searchParams.set("limit", params.limit);
        if (params?.category) searchParams.set("category", params.category);
        if (params?.tag) searchParams.set("tag", params.tag);
        const qs = searchParams.toString();
        return `api/blog/show${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["BlogList"],
      keepUnusedDataFor: 300,
    }),
    getBlogBySlug: builder.query({
      query: (slug) => `api/blog/slug/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
      keepUnusedDataFor: 300,
    }),
  }),
});

export const {
  useGetShowingBlogsQuery,
  useGetBlogBySlugQuery,
} = blogApi;
