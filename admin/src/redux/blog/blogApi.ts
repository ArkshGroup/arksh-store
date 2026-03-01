import { IAddBlog, IBlog, IBlogListResponse } from "@/types/blog-type";
import { apiSlice } from "../api/apiSlice";

type BlogListQuery = {
  status?: string;
  page?: number;
  limit?: number;
  sort?: string;
};

export const blogApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllBlogs: builder.query<IBlogListResponse, BlogListQuery | void>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.status) q.set("status", params.status);
        if (params?.page) q.set("page", String(params.page));
        if (params?.limit) q.set("limit", String(params.limit));
        if (params?.sort) q.set("sort", params.sort);
        const queryString = q.toString();
        return { url: `/api/blog/all${queryString ? `?${queryString}` : ""}` };
      },
      providesTags: ["AllBlogs"],
      keepUnusedDataFor: 300,
    }),
    getBlog: builder.query<IBlog, string>({
      query: (id) => `/api/blog/${id}`,
      transformResponse: (res: { success: boolean; data: IBlog }) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Blog", id }],
    }),
    addBlog: builder.mutation<
      { success: boolean; message: string; data: IBlog },
      IAddBlog
    >({
      query: (data) => ({
        url: "/api/blog/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllBlogs"],
    }),
    updateBlog: builder.mutation<
      { success: boolean; message: string; data: IBlog },
      { id: string; data: Partial<IAddBlog> }
    >({
      query: ({ id, data }) => ({
        url: `/api/blog/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllBlogs", "Blog"],
    }),
    deleteBlog: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/api/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllBlogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
