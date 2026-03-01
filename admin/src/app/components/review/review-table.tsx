"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Delete, View } from "@/svg";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  useGetAllReviewsQuery,
  useGetReviewCountQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "@/redux/review/reviewApi";
import { IReview } from "@/types/review-type";
import ReviewViewModal from "@/app/components/review/review-view-modal";

type StatusFilter = "all" | "approved" | "pending" | "rejected";

const ReviewTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const countStatus = statusFilter === "all" ? undefined : statusFilter;
  const { data: countRes } = useGetReviewCountQuery(countStatus);
  const { data: listRes, isError, isLoading } = useGetAllReviewsQuery({
    page,
    limit: 20,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const totalCount = countRes?.count ?? 0;
  const reviews = listRes?.data ?? [];
  const pagination = listRes?.pagination ?? { page: 1, pages: 1, total: 0 };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await deleteReview(id);
        if ("data" in res && res.data?.success) {
          Swal.fire("Deleted!", "The review has been deleted.", "success");
          router.refresh();
          if (viewId === id) setViewId(null);
        } else {
          Swal.fire("Error", "Could not delete review.", "error");
        }
      } catch {
        Swal.fire("Error", "Something went wrong.", "error");
      }
    }
  };

  const handleStatusChange = async (id: string, status: "approved" | "rejected" | "pending") => {
    try {
      await updateReview({ id, status });
      router.refresh();
      if (viewId === id) setViewId(null);
    } catch {
      Swal.fire("Error", "Could not update status.", "error");
    }
  };

  const Star = ({ value }: { value: number }) => (
    <span className="text-warning">
      {"★".repeat(Math.min(5, Math.round(value)))}
      {"☆".repeat(5 - Math.min(5, Math.round(value)))}
    </span>
  );

  let content = null;
  if (isLoading) {
    content = (
      <div className="px-8 py-8 text-center text-tiny text-text2">Loading…</div>
    );
  }
  if (isError && !listRes) {
    content = (
      <div className="px-8 py-8 text-center text-danger">Failed to load reviews.</div>
    );
  }
  if (!isError && listRes) {
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">Product</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[120px] text-end">Customer</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[80px] text-end">Rating</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[100px] text-end">Status</th>
              <th className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[100px] text-end">Date</th>
              <th className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-8 text-center text-text2">
                  No reviews.
                </td>
              </tr>
            ) : (
              reviews.map((r: IReview) => (
                <tr key={r._id} className="bg-white border-b border-gray6 last:border-0 text-start">
                  <td className="pr-8 py-5">
                    {r.product ? (
                      <Link
                        href={`/product-grid`}
                        className="d-flex align-items-center gap-2 text-heading hover:text-theme"
                      >
                        {r.product.image && (
                          <Image
                            src={r.product.image}
                            alt=""
                            width={40}
                            height={40}
                            style={{ objectFit: "cover" }}
                          />
                        )}
                        <span className="max-w-[180px] truncate">{r.product.title}</span>
                      </Link>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-end">
                    <span className="text-heading block">{r.name}</span>
                  </td>
                  <td className="px-3 py-3 text-end">
                    <Star value={r.rating} />
                  </td>
                  <td className="px-3 py-3 text-end">
                    <select
                      className="input text-tiny py-1"
                      value={r.status}
                      onChange={(e) =>
                        handleStatusChange(r._id, e.target.value as "approved" | "rejected" | "pending")
                      }
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-3 py-3 text-end">
                    {dayjs(r.createdAt).format("MMM D, YYYY")}
                  </td>
                  <td className="px-9 py-3 text-end">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setViewId(r._id)}
                        className="w-10 h-10 leading-10 text-tiny bg-theme text-white rounded-md hover:opacity-90"
                      >
                        <View />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r._id)}
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
        {viewId && (
          <ReviewViewModal
            id={viewId}
            onClose={() => setViewId(null)}
            onDeleted={() => setViewId(null)}
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[1500px] xl:w-full">
          <div className="tp-search-box flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-4">
              <span className="text-tiny text-text2">Total: {totalCount} reviews</span>
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
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="relative overflow-x-auto mx-8">{content}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewTable;
