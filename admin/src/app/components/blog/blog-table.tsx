"use client";

import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";
import BlogAction from "./blog-action";
import { useGetAllBlogsQuery } from "@/redux/blog/blogApi";
import Pagination from "../ui/Pagination";
import usePagination from "@/hooks/use-pagination";

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

type IPropType = {
  cls?: string;
  searchValue?: string;
};

const BlogTable = ({ cls, searchValue }: IPropType) => {
  const { data: response, isError, isLoading } = useGetAllBlogsQuery({});
  const blogs = response?.data ?? [];
  const paginationData = usePagination(blogs, 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (isError && !response) {
    content = <ErrorMsg msg="There was an error loading blogs." />;
  }
  if (!isError && response) {
    let items = blogs;
    if (searchValue) {
      items = items.filter(
        (b) =>
          b.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          (b.slug && b.slug.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
    const toShow = searchValue ? items : currentItems;

    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Title
              </th>
              <TableHead title="Slug" />
              <TableHead title="Status" />
              <TableHead title="Category" />
              <TableHead title="Published" />
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase font-semibold w-[12%] text-end"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {toShow.map((blog) => (
              <tr
                key={blog._id}
                className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
              >
                <td className="pr-8 py-5 whitespace-nowrap">
                  <div className="flex items-center space-x-5">
                    {blog.featuredImage && (
                      <Image
                        className="w-[60px] h-[60px] rounded-md object-cover"
                        src={blog.featuredImage}
                        alt={blog.title}
                        width={60}
                        height={60}
                      />
                    )}
                    <span className="font-medium text-heading max-w-[200px] truncate block">
                      {blog.title}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-3 text-black font-normal text-end">
                  <span className="text-sm">{blog.slug}</span>
                </td>
                <td className="px-3 py-3 text-end">
                  <span
                    className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium ${
                      blog.status === "published"
                        ? "text-success bg-success/10"
                        : blog.status === "archived"
                        ? "text-gray-500 bg-gray-200"
                        : "text-warning bg-warning/10"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                  {blog.category || "—"}
                </td>
                <td className="px-3 py-3 text-end">
                  {blog.publishedAt
                    ? dayjs(blog.publishedAt).format("MMM D, YYYY")
                    : "—"}
                </td>
                <td className="px-9 py-3 text-end">
                  <BlogAction id={blog._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!searchValue && pageCount > 1 && (
          <div className="flex justify-between items-center flex-wrap mx-8">
            <p className="mb-0 text-tiny">
              Showing 1–{currentItems.length} of {blogs.length}
            </p>
            <div className="pagination py-3 flex justify-end items-center mx-8">
              <Pagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`${cls ?? "relative overflow-x-auto mx-8"}`}>{content}</div>
  );
};

export default BlogTable;
