"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  useGetAllReviewsQuery,
  useGetReviewCountQuery,
} from "src/redux/features/reviewApi";

const StarDisplay = ({ value }) => {
  const v = Number(value) || 0;
  const full = Math.floor(v);
  const half = v - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="d-inline-flex align-items-center">
      {[...Array(full)].map((_, i) => (
        <span key={`f-${i}`} style={{ color: "#f5a623" }}>★</span>
      ))}
      {half ? <span style={{ color: "#f5a623" }}>★</span> : null}
      {[...Array(empty)].map((_, i) => (
        <span key={`e-${i}`} style={{ color: "#ddd" }}>★</span>
      ))}
    </span>
  );
};

const ReviewsArea = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("approved");

  const { data: countRes } = useGetReviewCountQuery(
    statusFilter === "all" ? undefined : statusFilter
  );
  const { data: listRes, isLoading, isError } = useGetAllReviewsQuery({
    page,
    limit: 10,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const totalCount = countRes?.count ?? 0;
  const reviews = listRes?.data ?? [];
  const pagination = listRes?.pagination ?? { page: 1, pages: 1, total: 0 };

  return (
    <section className="reviews__area pt-50 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="mb-30 d-flex flex-wrap align-items-center justify-content-between gap-3">
              <h4 className="mb-0">All Reviews ({totalCount})</h4>
              <select
                className="form-select w-auto"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="all">All</option>
              </select>
            </div>

            {isLoading && (
              <p className="text-muted">Loading reviews…</p>
            )}
            {isError && (
              <p className="text-danger">Failed to load reviews.</p>
            )}
            {!isLoading && !isError && reviews.length === 0 && (
              <p className="text-muted">No reviews found.</p>
            )}
            {!isLoading && !isError && reviews.length > 0 && (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((r) => (
                        <tr key={r._id}>
                          <td>
                            {r.product ? (
                              <Link
                                href={`/product-details/${r.product._id}`}
                                className="d-flex align-items-center gap-2"
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
                                <span>{r.product?.title ?? "—"}</span>
                              </Link>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td>
                            <span>{r.name}</span>
                          </td>
                          <td>
                            <StarDisplay value={r.rating} />
                          </td>
                          <td style={{ maxWidth: 280 }}>
                            <span className="text-truncate d-inline-block" style={{ maxWidth: "100%" }}>
                              {r.comment}
                            </span>
                          </td>
                          <td>
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {pagination.pages > 1 && (
                  <div className="d-flex gap-2 align-items-center mt-4">
                    <button
                      type="button"
                      className="tp-btn-border py-2"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </button>
                    <span className="text-muted">
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsArea;
