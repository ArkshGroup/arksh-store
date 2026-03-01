"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGetReviewsByProductQuery,
  useGetReviewCountByProductQuery,
  useGetMyReviewForProductQuery,
  useAddReviewMutation,
} from "src/redux/features/reviewApi";
import { useSelector } from "react-redux";

const StarRating = ({ value, size = 16 }) => {
  const v = Number(value) || 0;
  const full = Math.floor(v);
  const half = v - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <span className="d-inline-flex align-items-center" aria-label={`${value} stars`}>
      {[...Array(full)].map((_, i) => (
        <span key={`f-${i}`} style={{ color: "#f5a623", fontSize: size }}>★</span>
      ))}
      {half ? <span style={{ color: "#f5a623", fontSize: size }}>★</span> : null}
      {[...Array(empty)].map((_, i) => (
        <span key={`e-${i}`} style={{ color: "#ddd", fontSize: size }}>★</span>
      ))}
    </span>
  );
};

// Clickable stars to choose rating (1-5)
const StarRatingSelect = ({ value, onChange, size = 28 }) => {
  const v = Math.min(5, Math.max(0, Number(value) || 0));
  return (
    <span className="d-inline-flex align-items-center gap-1" role="group" aria-label="Choose rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="border-0 bg-transparent p-0 cursor-pointer"
          style={{ fontSize: size, lineHeight: 1 }}
          onClick={() => onChange(star)}
          onKeyDown={(e) => e.key === "Enter" && onChange(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-pressed={v === star}
        >
          <span style={{ color: star <= v ? "#f5a623" : "#ddd" }}>★</span>
        </button>
      ))}
    </span>
  );
};

const ProductDetailsReviews = ({ productId }) => {
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({ rating: 0, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const { user, accessToken } = useSelector((state) => state.auth) || {};
  const isLoggedIn = !!(accessToken && user);

  const { data: countData } = useGetReviewCountByProductQuery(productId, {
    skip: !productId,
  });
  const { data: reviewsData, isLoading } = useGetReviewsByProductQuery(
    { productId, page, limit: 5 },
    { skip: !productId }
  );
  const { data: myReviewData } = useGetMyReviewForProductQuery(productId, {
    skip: !productId || !isLoggedIn,
  });
  const [addReview, { isLoading: isSubmitting, isSuccess, error }] = useAddReviewMutation();

  const count = countData?.count ?? 0;
  const averageRating = countData?.averageRating ?? 0;
  const reviews = reviewsData?.data ?? [];
  const pagination = reviewsData?.pagination ?? { page: 1, pages: 1, total: 0 };
  const hasReviewed = myReviewData?.hasReviewed ?? false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.comment.trim() || form.rating < 1) return;
    try {
      await addReview({
        productId,
        rating: Number(form.rating),
        comment: form.comment.trim(),
      }).unwrap();
      setForm({ rating: 0, comment: "" });
      setSubmitted(true);
    } catch (err) {
      // error shown below
    }
  };

  return (
    <div className="product__details-reviews pt-30">
      <div className="row">
        <div className="col-lg-7">
          <h4 className="mb-20">Customer Reviews ({count})</h4>
          {count > 0 && (
            <div className="mb-30 d-flex align-items-center gap-3">
              <StarRating value={averageRating} size={20} />
              <span className="text-muted">{averageRating} out of 5</span>
            </div>
          )}
          {isLoading ? (
            <p className="text-muted">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-muted">No reviews yet. Be the first to review!</p>
          ) : (
            <ul className="list-unstyled">
              {reviews.map((r) => (
                <li key={r._id} className="border-bottom pb-20 mb-20">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <strong>{r.name}</strong>
                    <StarRating value={r.rating} />
                  </div>
                  <p className="text-muted small mb-1">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p className="mb-0">{r.comment}</p>
                </li>
              ))}
            </ul>
          )}
          {pagination.pages > 1 && (
            <div className="d-flex gap-2 align-items-center mt-20">
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
        </div>
        <div className="col-lg-5">
          <h4 className="mb-20">Write a Review</h4>
          {!isLoggedIn ? (
            <>
              <p className="text-muted mb-2">
                You must be logged in to submit a review.
              </p>
              <Link href="/login" className="tp-btn py-2 d-inline-block">
                Log in
              </Link>
            </>
          ) : hasReviewed || isSuccess || submitted ? (
            <p className="text-success">
              {hasReviewed && !submitted && !isSuccess
                ? "You have already reviewed this product."
                : "Thank you! Your review has been submitted."}
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-muted small mb-3">Reviewing as <strong>{user?.name}</strong></p>
              <div className="mb-3">
                <label className="form-label">Rating *</label>
                <StarRatingSelect
                  value={form.rating}
                  onChange={(rating) => setForm((f) => ({ ...f, rating }))}
                />
                {form.rating > 0 && (
                  <span className="ms-2 text-muted small">{form.rating} star{form.rating !== 1 ? "s" : ""}</span>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Comment *</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={form.comment}
                  onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                  required
                  minLength={10}
                />
              </div>
              {(error && (error?.data?.message || error?.data?.error)) && (
                <p className="text-danger small mb-2">
                  {error?.data?.message || error?.data?.error || "Failed to submit review."}
                </p>
              )}
              <button type="submit" className="tp-btn py-2" disabled={isSubmitting || form.rating < 1}>
                {isSubmitting ? "Submitting…" : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsReviews;
