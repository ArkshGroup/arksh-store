"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "@/svg";
import BlogTable from "./blog-table";

const BlogArea = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[1500px] xl:w-full">
          <div className="tp-search-box flex items-center justify-between px-8 py-8">
            <div className="search-input relative">
              <input
                className="input h-[44px] w-full pl-14"
                type="text"
                placeholder="Search by title or slug"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="button" className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
                <Search />
              </button>
            </div>
            <div className="flex justify-end space-x-6">
              <Link href="/blogs/add" className="tp-btn">
                Add Blog
              </Link>
            </div>
          </div>
          <BlogTable searchValue={searchValue} />
        </div>
      </div>
    </div>
  );
};

export default BlogArea;
