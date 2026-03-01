import { IContact, IContactListResponse } from "@/types/contact-type";
import { apiSlice } from "../api/apiSlice";

type ContactListQuery = {
  page?: number;
  limit?: number;
  read?: boolean;
};

export const contactApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getContacts: builder.query<IContactListResponse, ContactListQuery | void>({
      query: (params) => {
        const q = new URLSearchParams();
        if (params?.page) q.set("page", String(params.page));
        if (params?.limit) q.set("limit", String(params.limit));
        if (params?.read !== undefined) q.set("read", String(params.read));
        const queryString = q.toString();
        return { url: `/api/contact${queryString ? `?${queryString}` : ""}` };
      },
      providesTags: ["AllContacts"],
      keepUnusedDataFor: 300,
    }),
    getContact: builder.query<IContact, string>({
      query: (id) => `/api/contact/${id}`,
      transformResponse: (res: { success: boolean; data: IContact }) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Contact", id }],
    }),
    updateContact: builder.mutation<
      { success: boolean; message: string; data: IContact },
      { id: string; data: Partial<Pick<IContact, "read">> }
    >({
      query: ({ id, data }) => ({
        url: `/api/contact/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["AllContacts", "Contact"],
    }),
    deleteContact: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/api/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllContacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
