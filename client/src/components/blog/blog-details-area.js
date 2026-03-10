'use client';

import { useGetBlogBySlugQuery } from "src/redux/features/blogApi";
import Link from "next/link";
import Image from "next/image";
import BlogBreadcrumb from "./blog-breadcrumb";
import ErrorMessage from "@components/error-message/error";
import PrdDetailsLoader from "@components/loader/details-loader";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailsArea({ slug }) {
  const { data: response, isLoading, isError } = useGetBlogBySlugQuery(slug);
  const blog = response?.data;

  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={true} />;
  }

  if (!isLoading && (isError || !blog)) {
    content = (
      <div className="container py-5">
        <ErrorMessage message="Post not found or failed to load." />
      </div>
    );
  }

  if (!isLoading && !isError && blog) {
    const breadcrumbTitle =
      typeof slug === "string" ? slug.replace(/-/g, " ") : blog.title;
    content = (
      <>
        <BlogBreadcrumb title={breadcrumbTitle} />
        <section className="pt-50 pb-100" style={{ backgroundColor: "#f5f7fb" }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-12 col-xl-12">
                <article className="bg-white rounded-3 shadow-sm overflow-hidden">
                  {/* hero image */}
                  {blog.featuredImage && (
                    <div className="position-relative overflow-hidden">
                      <Image
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={1200}
                        height={520}
                        className="w-100"
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}

                  <div className="p-4 p-md-5">
                    <header className="mb-4">
                      <div className="d-flex flex-wrap align-items-center text-muted mb-2 gap-2">
                        {blog.category && (
                          <span className="badge bg-primary-subtle text-primary text-uppercase fw-semibold">
                            {blog.category}
                          </span>
                        )}
                        {blog.publishedAt && (
                          <span>{formatDate(blog.publishedAt)}</span>
                        )}
                        {blog.authorName && (
                          <>
                            <span className="mx-1">·</span>
                            <span>By {blog.authorName}</span>
                          </>
                        )}
                      </div>
                      <h1 className="h2 mb-2">{blog.title}</h1>
                      {blog.excerpt && (
                        <p className="text-muted mb-0">
                          {blog.excerpt}
                        </p>
                      )}
                    </header>

                    <div
                      className="prose blog__body"
                      dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                      style={{
                        maxWidth: "100%",
                        lineHeight: 1.8,
                        fontSize: "16px",
                      }}
                    />

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="d-flex flex-wrap align-items-center gap-2 mt-4 pt-3 border-top">
                        <span className="text-muted small">Tags:</span>
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="badge bg-light text-dark"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <Link href="/blog" className="tp-btn-border tp-btn-border-2">
                        ← Back to Blog
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return content;
}
