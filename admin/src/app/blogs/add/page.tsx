"use client";

import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import BlogForm from "../../components/blog/blog-form";
import useBlogSubmit from "@/hooks/useBlogSubmit";

const AddBlogPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { form, featuredImage, setFeaturedImage, handleAdd } = useBlogSubmit(null);
  const { register, handleSubmit, formState: { errors }, control } = form;

  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Add Blog" />
        <form onSubmit={handleSubmit(handleAdd)}>
          <BlogForm
            register={register}
            errors={errors}
            control={control}
            featuredImage={featuredImage}
            setFeaturedImage={setFeaturedImage}
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            isEdit={false}
          />
          <div className="mt-8 flex gap-4">
            <button type="submit" className="tp-btn px-7 py-2">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddBlogPage;
