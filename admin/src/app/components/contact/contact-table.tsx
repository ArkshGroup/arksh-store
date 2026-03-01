"use client";

import React, { useState } from "react";
import { Delete, View } from "@/svg";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useGetContactsQuery, useDeleteContactMutation } from "@/redux/contact/contactApi";
import ContactViewModal from "@/app/components/contact/contact-view-modal";
import { IContact } from "@/types/contact-type";

function TableHead({ title }: { title: string }) {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[120px] text-end"
    >
      {title}
    </th>
  );
}

type ContactTableProps = {
  readFilter: "all" | "read" | "unread";
};

const ContactTable = ({ readFilter }: ContactTableProps) => {
  const router = useRouter();
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteContact] = useDeleteContactMutation();

  const readParam =
    readFilter === "read" ? true : readFilter === "unread" ? false : undefined;

  const { data: response, isError, isLoading } = useGetContactsQuery(
    readParam !== undefined ? { read: readParam } : {}
  );

  const contacts = response?.data ?? [];

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this contact message?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteContact(id);
          if ("data" in res && res.data?.success) {
            Swal.fire("Deleted!", "The message has been deleted.", "success");
            router.refresh();
            if (viewId === id) setViewId(null);
          } else {
            Swal.fire("Error", "Could not delete message.", "error");
          }
        } catch {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  let content = null;
  if (isLoading) {
    content = (
      <div className="px-8 py-8 text-center text-tiny text-text2">
        Loading…
      </div>
    );
  }
  if (isError && !response) {
    content = (
      <div className="px-8 py-8 text-center text-danger">Failed to load contacts.</div>
    );
  }
  if (!isError && response) {
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Name
              </th>
              <TableHead title="Email" />
              <TableHead title="Phone" />
              <TableHead title="Company" />
              <TableHead title="Date" />
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-8 text-center text-text2">
                  No contact messages.
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr
                  key={c._id}
                  className={`bg-white border-b border-gray6 last:border-0 text-start mx-9 ${!c.read ? "font-medium" : ""}`}
                >
                  <td className="pr-8 py-5">
                    <span className="text-heading max-w-[180px] truncate block">
                      {c.name}
                      {!c.read && (
                        <span className="ml-1 text-tiny text-theme">(new)</span>
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-end">
                    <a
                      href={`mailto:${c.email}`}
                      className="text-black hover:text-theme"
                    >
                      {c.email}
                    </a>
                  </td>
                  <td className="px-3 py-3 text-end">
                    <a
                      href={`tel:${c.phone}`}
                      className="text-black hover:text-theme"
                    >
                      {c.phone}
                    </a>
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {c.company || "—"}
                  </td>
                  <td className="px-3 py-3 text-end">
                    {dayjs(c.createdAt).format("MMM D, YYYY")}
                  </td>
                  <td className="px-9 py-3 text-end">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setViewId(c._id)}
                        className="w-10 h-10 leading-10 text-tiny bg-theme text-white rounded-md hover:opacity-90"
                      >
                        <View />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(c._id)}
                        className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
                      >
                        <Delete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {viewId && (
          <ContactViewModal
            id={viewId}
            onClose={() => setViewId(null)}
            onDeleted={() => setViewId(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="relative overflow-x-auto mx-8">
      {content}
    </div>
  );
};

export default ContactTable;
