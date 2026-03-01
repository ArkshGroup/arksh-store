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
    content = (
      <>
        <BlogBreadcrumb title={blog.title} />
        <section className="blog__details-area pt-50 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-8 col-xl-8 col-lg-10">
                <article className="blog__details-content">
                  <header className="mb-30">
                    <h1 className="blog__details-title mb-20">{blog.title}</h1>
                    <div className="blog__meta text-muted mb-20">
                      {blog.publishedAt && (
                        <span>{formatDate(blog.publishedAt)}</span>
                      )}
                      {blog.authorName && (
                        <>
                          <span className="mx-2">·</span>
                          <span>By {blog.authorName}</span>
                        </>
                      )}
                      {blog.category && (
                        <>
                          <span className="mx-2">·</span>
                          <span>{blog.category}</span>
                        </>
                      )}
                    </div>
                    {blog.featuredImage && (
                      <div className="blog__details-thumb overflow-hidden rounded mb-30">
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          width={800}
                          height={450}
                          className="w-100"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </header>
                  {blog.excerpt && (
                    <p className="blog__excerpt text-muted lead mb-30">
                      {blog.excerpt}
                    </p>
                  )}
                  <div
                    className="blog__body prose"
                    dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                    style={{
                      maxWidth: "100%",
                      lineHeight: 1.7,
                    }}
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog__tags mt-40 pt-30 border-top">
                      <span className="me-2 text-muted">Tags:</span>
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge bg-light text-dark me-1 mb-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-40">
                    <Link href="/blog" className="tp-btn-border tp-btn-border-2">
                      ← Back to Blog
                    </Link>
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
