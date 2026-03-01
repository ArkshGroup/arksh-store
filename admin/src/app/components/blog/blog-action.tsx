"use client";

import React, { useState } from "react";
import { Delete, Edit } from "@/svg";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import DeleteTooltip from "../tooltip/delete-tooltip";
import EditTooltip from "../tooltip/edit-tooltip";
import { useDeleteBlogMutation } from "@/redux/blog/blogApi";

type IPropType = {
  id: string;
};

const BlogAction = ({ id }: IPropType) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const router = useRouter();
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (delId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this blog?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteBlog(delId);
          if ("data" in res && res.data?.success) {
            Swal.fire("Deleted!", "The blog has been deleted.", "success");
            router.refresh();
          } else {
            Swal.fire("Error", "Could not delete blog.", "error");
          }
        } catch {
          Swal.fire("Error", "Something went wrong.", "error");
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="relative">
        <Link href={`/blogs/${id}`}>
          <button
            onMouseEnter={() => setShowEdit(true)}
            onMouseLeave={() => setShowEdit(false)}
            className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
          >
            <Edit />
          </button>
        </Link>
        <EditTooltip showEdit={showEdit} />
      </div>
      <div className="relative">
        <button
          onClick={() => handleDelete(id)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          className="w-10 h-10 leading-[33px] text-tiny bg-white border border-gray text-slate-600 rounded-md hover:bg-danger hover:border-danger hover:text-white"
        >
          <Delete />
        </button>
        <DeleteTooltip showDelete={showDelete} />
      </div>
    </div>
  );
};

export default BlogAction;
