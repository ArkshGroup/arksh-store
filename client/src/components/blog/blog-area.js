'use client';

import { useGetShowingBlogsQuery } from "src/redux/features/blogApi";
import Link from "next/link";
import Image from "next/image";
import BlogBreadcrumb from "./blog-breadcrumb";
import ErrorMessage from "@components/error-message/error";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogArea() {
  const { data: response, isLoading, isError } = useGetShowingBlogsQuery({});

  const blogs = response?.data ?? [];
  const pagination = response?.pagination;

  let content = null;
  if (isLoading) {
    content = (
      <div className="container py-5 text-center">
        <p className="text-muted">Loading posts…</p>
      </div>
    );
  }

  if (!isLoading && isError) {
    content = <ErrorMessage message="Failed to load blog posts." />;
  }

  if (!isLoading && !isError && blogs.length === 0) {
    content = (
      <div className="container py-5 text-center">
        <p className="text-muted">No blog posts yet.</p>
      </div>
    );
  }

  if (!isLoading && !isError && blogs.length > 0) {
    content = (
      <section className="blog__area pt-50 pb-100">
        <div className="container">
          <div className="row">
            {blogs.map((post) => (
              <div key={post._id} className="col-lg-4 col-md-6 col-sm-6 mb-40">
                <article className="blog__item white-bg mb-30 transition-3">
                  <div className="blog__thumb overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      {post.featuredImage ? (
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          width={400}
                          height={240}
                          className="w-100"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="bg-light d-flex align-items-center justify-content-center"
                          style={{ height: 240 }}
                        >
                          <span className="text-muted">No image</span>
                        </div>
                      )}
                    </Link>
                  </div>
                  <div className="blog__content p-30">
                    <div className="blog__meta mb-15">
                      <span className="text-muted">
                        {formatDate(post.publishedAt)}
                      </span>
                      {post.category && (
                        <>
                          <span className="mx-2">·</span>
                          <span className="text-muted">{post.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="blog__title mb-15">
                      <Link href={`/blog/${post.slug}`} className="text-decoration-none">
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="mb-20 text-muted" style={{ fontSize: "0.95rem" }}>
                        {post.excerpt.length > 120
                          ? post.excerpt.slice(0, 120) + "…"
                          : post.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="tp-btn-border tp-btn-border-2"
                    >
                      Read more
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          {pagination && pagination.pages > 1 && (
            <div className="row">
              <div className="col-12 text-center pt-20">
                <p className="text-muted small">
                  Page {pagination.page} of {pagination.pages}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <BlogBreadcrumb title="Blog" />
      {content}
    </>
  );
}
