"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import useProductSubmit from "@/hooks/useProductSubmit";
import ErrorMsg from "../../common/error-msg";
import OfferDatePicker from "./offer-date-picker";
import ProductTypeBrand from "./product-type-brand";
import ProductVariants from "./product-variants";
import ProductImgUpload from "./product-img-upload";
import ProductCategory from "../../category/product-category";
import Tags from "./tags";
import FormField from "../form-field";
import Colors from "./colors";
import Sizes from "./sizes";

const BlogLexicalEditor = dynamic(
  () => import("@/app/components/blog/RichTextEditor"),
  { ssr: false }
);

const ProductSubmit = () => {
  const {
    handleSubmit,
    handleSubmitProduct,
    register,
    errors,
    tags,
    setTags,
    control,
    setCategory,
    setParent,
    setChildren,
    setImg,
    img,
    setBrand,
    isSubmitted,
    relatedImages,
    setRelatedImages,
    setColors,
    setSizes,
    colors,
    sizes,
  } = useProductSubmit();

  console.log('related image',relatedImages)
  return (
    <form onSubmit={handleSubmit(handleSubmitProduct)}>
      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* left side */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            <h4 className="text-[22px]">General</h4>
            <FormField
              title="title"
              isRequired={true}
              placeHolder="Product Title"
              register={register}
              errors={errors}
            />
            <div className="mb-5">
              <p className="mb-0 text-base text-black">Description</p>
              <p className="text-tiny text-gray-500 mb-2">
                Use the toolbar for headings (H1, H2, H3), paragraphs, bold, italic, and lists.
              </p>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required!" }}
                render={({ field }) => (
                  <BlogLexicalEditor
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="Write product description…"
                  />
                )}
              />
              <ErrorMsg msg={(errors?.description?.message as string) || ""} />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
              <FormField
                title="price"
                isRequired={true}
                placeHolder="Product price"
                bottomTitle="Set the base price of product."
                type="number"
                register={register}
                errors={errors}
              />
              <FormField
                title="sku"
                isRequired={true}
                placeHolder="SKU"
                bottomTitle="Enter the product SKU."
                register={register}
                errors={errors}
              />
              <FormField
                title="quantity"
                isRequired={true}
                placeHolder="Quantity"
                bottomTitle="Enter the product quantity."
                type="number"
                register={register}
                errors={errors}
              />
              <FormField
                title="discount"
                type="number"
                isRequired={false}
                placeHolder=" Discount"
                bottomTitle="Set the Discount Percentage."
                register={register}
                errors={errors}
              />
              <div className="mb-5">
                <p className="mb-0 text-base text-black capitalize">Display </p>
                
                <select
                  {...register("itemInfo")}
                  className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                >
                  <option value="">None</option>
                  <option value="top-rated">Top Rated</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="latest-product">Latest Product</option>
                </select>
              </div>
              <div className="mb-5">
                <p className="mb-0 text-base text-black capitalize">Status</p>
                <select
                  {...register("status")}
                  className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                >
                  <option value="active">Active</option>
                  <option value="inActive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <h4 className="text-[18px] mb-4">SEO (Search Engine Optimization)</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-6">
              <FormField
                title="metaTitle"
                isRequired={false}
                placeHolder="Custom SEO title (optional)"
                bottomTitle="Defaults to the product title if empty."
                register={register}
                errors={errors}
              />
              <div className="mb-5 sm:col-span-2 2xl:col-span-2">
                <p className="mb-0 text-base text-black">Meta Description</p>
               
                <textarea
                  {...register("metaDescription")}
                  className="input w-full min-h-[80px] rounded-md border border-gray6 px-4 py-2 text-base"
                  maxLength={160}
                  placeholder=" Short summary  (max 160 characters)…"
                />
                <ErrorMsg msg={(errors?.metaDescription?.message as string) || ""} />
              </div>
              <div className="mb-5 sm:col-span-2 2xl:col-span-3">
                <p className="mb-0 text-base text-black">Meta Keywords</p>
                
                <input
                  {...register("metaKeywords")}
                  type="text"
                  className="input w-full h-[44px] rounded-md border border-gray6 px-4 text-base"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>

          {/* product type and brands start */}
          <ProductTypeBrand
            register={register}
            errors={errors}
            control={control}
            setSelectBrand={setBrand}
          />
          {/* product type and brands end */}

          {/* product variations start */}
          <ProductVariants
            isSubmitted={isSubmitted}
            setImageURLs={setRelatedImages}
            relatedImages={relatedImages}
          />
          {/* product variations end */}
        </div>

        {/* right side */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <ProductImgUpload
            imgUrl={img}
            setImgUrl={setImg}
            isSubmitted={isSubmitted}
          />

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Product Category</p>
            {/* category start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <ProductCategory
                setCategory={setCategory}
                setParent={setParent}
                setChildren={setChildren}
              />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Product Tags</p>
            {/* tags start */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Tags tags={tags} setTags={setTags} />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Product Colors</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Colors colors={colors} setColors={setColors} />
            </div>
          </div>

          <div className="bg-white px-8 py-8 rounded-md mb-6">
            <p className="mb-5 text-base text-black">Product Sizes</p>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
              <Sizes sizes={sizes} setSizes={setSizes} />
            </div>
          </div>
        </div>
      </div>
      <button className="tp-btn px-5 py-2 mt-5" type="submit">
        Submit Product
      </button>
    </form>
  );
};

export default ProductSubmit;
