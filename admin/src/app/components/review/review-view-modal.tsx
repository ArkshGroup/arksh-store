"use client";

import React, { useEffect } from "react";
import { useGetReviewQuery, useUpdateReviewMutation } from "@/redux/review/reviewApi";
import dayjs from "dayjs";
import { Close } from "@/svg";
import Link from "next/link";
import Image from "next/image";

type ReviewViewModalProps = {
  id: string;
  onClose: () => void;
  onDeleted?: () => void;
};

const ReviewViewModal = ({ id, onClose }: ReviewViewModalProps) => {
  const { data: response, isLoading } = useGetReviewQuery(id);
  const [updateReview] = useUpdateReviewMutation();
  const review = response?.data;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleStatusChange = async (status: "approved" | "rejected" | "pending") => {
    if (!review) return;
    await updateReview({ id, status });
  };

  const Star = ({ value }: { value: number }) => (
    <span className="text-warning">
      {"★".repeat(Math.min(5, Math.round(value)))}
      {"☆".repeat(5 - Math.min(5, Math.round(value)))}
    </span>
  );

  if (!review && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray6">
          <h3 className="text-lg font-semibold text-heading">Review</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close"
          >
            <Close />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {isLoading ? (
            <p className="text-text2">Loading…</p>
          ) : review ? (
            <div className="space-y-3 text-base">
              {review.product && (
                <p>
                  <span className="font-medium text-text2">Product: </span>
                  <Link
                    href="/product-grid"
                    className="text-theme hover:underline d-flex align-items-center gap-2"
                  >
                    {review.product.image && (
                      <Image
                        src={review.product.image}
                        alt=""
                        width={32}
                        height={32}
                        style={{ objectFit: "cover" }}
                      />
                    )}
                    {review.product.title}
                  </Link>
                </p>
              )}
              <p>
                <span className="font-medium text-text2">Name:</span>{" "}
                <span className="text-heading">{review.name}</span>
              </p>
              <p>
                <span className="font-medium text-text2">Rating:</span>{" "}
                <Star value={review.rating} />
              </p>
              <p>
                <span className="font-medium text-text2">Status:</span>{" "}
                <span className="text-heading capitalize">{review.status}</span>
              </p>
              <p>
                <span className="font-medium text-text2">Date:</span>{" "}
                <span className="text-heading">
                  {dayjs(review.createdAt).format("MMM D, YYYY HH:mm")}
                </span>
              </p>
              <div className="pt-2 border-t border-gray6">
                <p className="font-medium text-text2 mb-1">Comment:</p>
                <p className="text-heading whitespace-pre-wrap">{review.comment}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray6 bg-gray-50 flex-wrap">
          {review && (
            <>
              {review.status !== "approved" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange("approved")}
                  className="tp-btn py-2"
                >
                  Approve
                </button>
              )}
              {review.status !== "rejected" && (
                <button
                  type="button"
                  onClick={() => handleStatusChange("rejected")}
                  className="tp-btn-border py-2 text-danger border-danger"
                >
                  Reject
                </button>
              )}
            </>
          )}
          <button type="button" onClick={onClose} className="tp-btn-border py-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewViewModal;
