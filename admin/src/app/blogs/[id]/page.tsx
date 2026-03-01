"use client";

import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import BlogForm from "../../components/blog/blog-form";
import useBlogSubmit from "@/hooks/useBlogSubmit";
import { useGetBlogQuery } from "@/redux/blog/blogApi";
import Loading from "../../components/common/loading";
import ErrorMsg from "../../components/common/error-msg";

const EditBlogPage = ({ params }: { params: { id: string } }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: blog, isLoading, isError } = useGetBlogQuery(params.id);
  const { form, featuredImage, setFeaturedImage, handleUpdate } = useBlogSubmit(blog ?? null);
  const { register, handleSubmit, formState: { errors }, control } = form;

  let content = null;
  if (isLoading) {
    content = <Loading loading={true} spinner="fade" />;
  } else if (isError || !blog) {
    content = <ErrorMsg msg="Blog not found or failed to load." />;
  } else {
    content = (
      <form onSubmit={handleSubmit((data) => handleUpdate(data, params.id))}>
        <BlogForm
          register={register}
          errors={errors}
          control={control}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          isEdit={true}
        />
        <div className="mt-8 flex gap-4">
          <button type="submit" className="tp-btn px-7 py-2">
            Update Blog
          </button>
        </div>
      </form>
    );
  }

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Edit Blog" />
        {content}
      </div>
    </Wrapper>
  );
};

export default EditBlogPage;
