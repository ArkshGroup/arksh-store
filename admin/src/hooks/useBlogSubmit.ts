"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "@/utils/toast";
import {
  useAddBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/blog/blogApi";
import { IAddBlog, IBlog } from "@/types/blog-type";

export function blogFormPayload(data: any, featuredImage: string): IAddBlog {
  const tags = data.tags
    ? (typeof data.tags === "string"
        ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : data.tags)
    : [];
  const metaKeywords = data.metaKeywords
    ? (typeof data.metaKeywords === "string"
        ? data.metaKeywords.split(",").map((k: string) => k.trim()).filter(Boolean)
        : data.metaKeywords)
    : [];
  return {
    title: data.title,
    slug: data.slug || undefined,
    excerpt: data.excerpt || "",
    content: data.content || "",
    featuredImage: featuredImage || undefined,
    status: data.status || "draft",
    publishedAt: data.status === "published" ? (data.publishedat ? dayjs(data.publishedat).toISOString() : new Date().toISOString()) : null,
    tags,
    category: data.category || "",
    metaTitle: data.metaTitle ?? "",
    metaDescription: data.metaDescription ?? "",
    metaKeywords,
    canonicalUrl: data.canonicalUrl ?? "",
  };
}

export default function useBlogSubmit(existing?: IBlog | null) {
  const [featuredImage, setFeaturedImage] = useState<string>(existing?.featuredImage ?? "");
  const router = useRouter();
  const [addBlog] = useAddBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      status: "draft",
      publishedAt: "",
      publishedat: "",
      tags: "",
      category: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      canonicalUrl: "",
    },
  });

  useEffect(() => {
    if (!existing) return;
    form.reset({
      title: existing.title,
      slug: existing.slug,
      excerpt: existing.excerpt ?? "",
      content: existing.content ?? "",
      status: existing.status,
      publishedAt: existing.publishedAt ? dayjs(existing.publishedAt).format("YYYY-MM-DD") : "",
      publishedat: existing.publishedAt ? dayjs(existing.publishedAt).format("YYYY-MM-DD") : "",
      tags: existing.tags?.join(", ") ?? "",
      category: existing.category ?? "",
      metaTitle: existing.metaTitle ?? "",
      metaDescription: existing.metaDescription ?? "",
      metaKeywords: existing.metaKeywords?.join(", ") ?? "",
      canonicalUrl: existing.canonicalUrl ?? "",
    });
    setFeaturedImage(existing.featuredImage ?? "");
  }, [existing?._id]);

  const handleAdd = async (data: any) => {
    try {
      const payload = blogFormPayload(data, featuredImage);
      const res = await addBlog(payload);
      if ("error" in res) {
        const err = res.error as { data?: { message?: string } };
        notifyError(err?.data?.message ?? "Failed to add blog");
        return;
      }
      notifySuccess("Blog created successfully");
      router.push("/blogs");
    } catch {
      notifyError("Something went wrong");
    }
  };

  const handleUpdate = async (data: any, id: string) => {
    try {
      const payload = blogFormPayload(data, featuredImage);
      const res = await updateBlog({ id, data: payload });
      if ("error" in res) {
        const err = res.error as { data?: { message?: string } };
        notifyError(err?.data?.message ?? "Failed to update blog");
        return;
      }
      notifySuccess("Blog updated successfully");
      router.push("/blogs");
    } catch {
      notifyError("Something went wrong");
    }
  };

  return {
    form,
    featuredImage,
    setFeaturedImage,
    handleAdd,
    handleUpdate,
  };
}
