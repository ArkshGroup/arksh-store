import { apiSlice } from "@/redux/api/apiSlice";
import { IUser } from "@/types/user-type";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IUser[], void>({
      query: () => "/api/user/all",
      providesTags: ["AllUsers"],
      keepUnusedDataFor: 600,
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery } = userApi;

