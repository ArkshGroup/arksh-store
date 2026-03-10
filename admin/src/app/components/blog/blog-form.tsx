"use client";

import React from "react";
import dynamic from "next/dynamic";
import { UseFormRegister, FieldErrors, Control, Controller } from "react-hook-form";
import GlobalImgUpload from "../category/global-img-upload";
import CouponFormField from "../brand/form-field-two";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

type BlogFormProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
  featuredImage: string;
  setFeaturedImage: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
};

const BlogForm = ({
  register,
  errors,
  control,
  featuredImage,
  setFeaturedImage,
  isSubmitted,
  setIsSubmitted,
  isEdit = false,
}: BlogFormProps) => {
  return (
    <div className="space-y-8">
      {/* Basic */}
      <div className="bg-white rounded-md shadow-xs p-8">
        <h3 className="text-lg font-semibold mb-6">Basic</h3>
        <GlobalImgUpload
          setImage={setFeaturedImage}
          image={featuredImage}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          default_img={isEdit ? featuredImage : undefined}
        />
        <CouponFormField
          register={register}
          errors={errors}
          name="title"
          isReq={true}
        />
        <CouponFormField
          register={register}
          errors={errors}
          name="slug"
          isReq={false}
        />
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Excerpt</p>
          <textarea
            {...register("excerpt")}
            placeholder="Short summary"
            className="input h-[80px] resize-none w-full py-3 text-base"
            rows={3}
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Content</p>
          <p className="text-tiny text-gray-500 mb-2">
            Use the toolbar for headings (H1, H2, H3), paragraphs, bold, italic, and lists.
          </p>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder="Write your blog content…"
              />
            )}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="mb-5">
            <p className="mb-0 text-base text-black">Status</p>
            <select
              {...register("status")}
              className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <CouponFormField
            register={register}
            errors={errors}
            name="publishedAt"
            isReq={false}
            type="date"
          />
        </div>
        <CouponFormField
          register={register}
          errors={errors}
          name="tags"
          isReq={false}
        />
        <p className="text-tiny text-gray-500 mb-2">Comma-separated tags</p>
        <CouponFormField
          register={register}
          errors={errors}
          name="category"
          isReq={false}
        />
      </div>

      {/* SEO */}
      <div className="bg-white rounded-md shadow-xs p-8">
        <h3 className="text-lg font-semibold mb-6">SEO</h3>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Meta title</p>
          <input
            {...register("metaTitle")}
            placeholder="Meta title"
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Meta description (max 160)</p>
          <textarea
            {...register("metaDescription")}
            placeholder="Meta description"
            className="input h-[60px] resize-none w-full py-3 text-base"
            maxLength={160}
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Meta keywords (comma-separated)</p>
          <input
            {...register("metaKeywords")}
            placeholder="keyword1, keyword2"
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
          />
        </div>
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Canonical URL</p>
          <input
            {...register("canonicalUrl")}
            placeholder="https://..."
            className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
