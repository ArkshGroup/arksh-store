"use client";

import React, { useState } from "react";
import { Delete } from "@/svg";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  useGetSubscribersQuery,
  useGetSubscriberCountQuery,
  useDeleteSubscriberMutation,
} from "@/redux/newsletter/newsletterApi";
import { ISubscriber } from "@/types/subscriber-type";

type StatusFilter = "all" | "active" | "unsubscribed";

const NewsletterTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deleteSubscriber] = useDeleteSubscriberMutation();

  const countStatus = statusFilter === "all" ? undefined : statusFilter;
  const { data: countRes } = useGetSubscriberCountQuery(countStatus);
  const { data: listRes, isError, isLoading } = useGetSubscribersQuery({
    page,
    limit: 20,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const totalCount = countRes?.count ?? 0;
  const subscribers = listRes?.data ?? [];
  const pagination = listRes?.pagination ?? { page: 1, pages: 1, total: 0 };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Remove this subscriber?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await deleteSubscriber(id);
        if ("data" in res && res.data?.success) {
          Swal.fire("Removed!", "Subscriber has been removed.", "success");
          router.refresh();
        } else {
          Swal.fire("Error", "Could not remove subscriber.", "error");
        }
      } catch {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  let content = null;
  if (isLoading) {
    content = (
      <div className="px-8 py-8 text-center text-tiny text-text2">Loading…</div>
    );
  }
  if (isError && !listRes) {
    content = (
      <div className="px-8 py-8 text-center text-danger">Failed to load subscribers.</div>
    );
  }
  if (!isError && listRes) {
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">Email</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[100px] text-end">Status</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[120px] text-end">Subscribed</th>
              <th className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-8 text-center text-text2">
                  No subscribers yet.
                </td>
              </tr>
            ) : (
              subscribers.map((s: ISubscriber) => (
                <tr key={s._id} className="bg-white border-b border-gray6 last:border-0 text-start">
                  <td className="pr-8 py-5">
                    <a href={`mailto:${s.email}`} className="text-heading hover:text-theme">
                      {s.email}
                    </a>
                  </td>
                  <td className="px-3 py-3 text-end capitalize">{s.status}</td>
                  <td className="px-3 py-3 text-end">
                    {dayjs(s.createdAt).format("MMM D, YYYY")}
                  </td>
                  <td className="px-9 py-3 text-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(s._id)}
                      className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {pagination.pages > 1 && (
          <div className="flex justify-end gap-2 px-8 py-4">
            <button
              type="button"
              className="tp-btn-border py-2"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>
            <span className="flex items-center text-tiny">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              type="button"
              className="tp-btn-border py-2"
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[1200px] xl:w-full">
          <div className="tp-search-box flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-4">
              <span className="text-tiny text-text2">Total: {totalCount} subscribers</span>
              <span className="text-tiny text-text2">Filter:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as StatusFilter);
                  setPage(1);
                }}
                className="input h-[44px] w-[140px]"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>
          <div className="relative overflow-x-auto mx-8">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterTable;
