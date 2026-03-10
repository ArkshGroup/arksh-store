"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import useProductSubmit from "@/hooks/useProductSubmit";
import ErrorMsg from "../../common/error-msg";
import FormField from "../form-field";
import { useGetProductQuery } from "@/redux/product/productApi";
import ProductTypeBrand from "../add-product/product-type-brand";
import ProductVariants from "../add-product/product-variants";
import ProductImgUpload from "../add-product/product-img-upload";
import Tags from "../add-product/tags";
import Colors from "../add-product/colors";
import Sizes from "../add-product/sizes";
import ProductCategory from "../../category/product-category";

const BlogLexicalEditor = dynamic(
  () => import("@/app/components/blog/RichTextEditor"),
  { ssr: false }
);

const EditProductSubmit = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading } = useGetProductQuery(id);
  const {
    handleSubmit,
    register,
    errors,
    tags,
    setTags,
    control,
    setValue,
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
    colors,
    setSizes,
    sizes,
    handleEditProduct
  } = useProductSubmit();

  useEffect(() => {
    if (product?.description) {
      setValue("description", product.description);
    }
  }, [product?.description, setValue]);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <form onSubmit={handleSubmit((data) => handleEditProduct(data, id))}>
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
                defaultValue={product.title}
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
                      value={field.value ?? product.description ?? ""}
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
                  defaultValue={product.price}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="sku"
                  isRequired={true}
                  placeHolder="SKU"
                  bottomTitle="Enter the product SKU."
                  defaultValue={product.sku}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="quantity"
                  isRequired={true}
                  placeHolder="Quantity"
                  bottomTitle="Enter the product quantity."
                  type="number"
                  defaultValue={product.quantity}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="discount"
                  type="number"
                  isRequired={false}
                  placeHolder="Discount"
                  bottomTitle="Set the Discount Percentage."
                  defaultValue={product.discount}
                  register={register}
                  errors={errors}
                />
                <div className="mb-5">
                  <p className="mb-0 text-base text-black capitalize">Display</p>
                 
                  <select
                    {...register("itemInfo")}
                    className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                    defaultValue={product.itemInfo ?? ""}
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
                    defaultValue={product.status ?? "active"}
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
                  defaultValue={product.metaTitle ?? ""}
                />
                <div className="mb-5 sm:col-span-2 2xl:col-span-2">
                  <p className="mb-0 text-base text-black">Meta Description</p>
                  <p className="text-tiny text-gray-500 mb-2">
                    Short summary for search engines (max 160 characters).
                  </p>
                  <textarea
                    {...register("metaDescription")}
                    className="input w-full min-h-[80px] rounded-md border border-gray6 px-4 py-2 text-base"
                    maxLength={160}
                    placeholder="Write a short SEO description…"
                    defaultValue={product.metaDescription ?? ""}
                  />
                  <ErrorMsg msg={(errors?.metaDescription?.message as string) || ""} />
                </div>
                <div className="mb-5 sm:col-span-2 2xl:col-span-3">
                  <p className="mb-0 text-base text-black">Meta Keywords</p>
                  <p className="text-tiny text-gray-500 mb-2">
                    Comma separated keywords, e.g. shoes, running, men.
                  </p>
                  <input
                    {...register("metaKeywords")}
                    type="text"
                    className="input w-full h-[44px] rounded-md border border-gray6 px-4 text-base"
                    placeholder="keyword1, keyword2, keyword3"
                    defaultValue={product.metaKeywords?.join(", ") ?? ""}
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
              default_value={{
                brand: product.brand.name,
                unit: product.unit,
              }}
            />
            {/* product type and brands end */}

            {/* product variations start */}
            <ProductVariants
              isSubmitted={isSubmitted}
              setImageURLs={setRelatedImages}
              relatedImages={relatedImages}
              default_value={product.relatedImages}
            />
            {/* product variations end */}
          </div>

          {/* right side */}
          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <ProductImgUpload
              imgUrl={img}
              setImgUrl={setImg}
              default_img={product.image}
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
                  default_value={{
                    parent: product.category.name,
                    id: product.category.id,
                    children: product.children,
                  }}
                />
                <Tags
                  tags={tags}
                  setTags={setTags}
                  default_value={product.tags}
                />
              </div>
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Product Colors</p>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <Colors
                  colors={colors}
                  setColors={setColors}
                  default_value={product.colors ?? []}
                />
              </div>
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Product Sizes</p>
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <Sizes
                  sizes={sizes}
                  setSizes={setSizes}
                  default_value={product.sizes ?? []}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">
          Submit Product
        </button>
      </form>
    );
  }

  return <>{content}</>;
};

export default EditProductSubmit;
