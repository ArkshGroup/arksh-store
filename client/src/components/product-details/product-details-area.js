import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
// internal
import { HeartTwo, CartTwo } from "@svg/index";
import { SocialShare } from "@components/social";
import ProductDetailsPrice from "./product-details-price";
import ProductQuantity from "./product-quantity";
import ProductDetailsCategories from "./product-details-categories";
import ProductDetailsTags from "./product-details-tags";
import { add_cart_product } from "src/redux/features/cartSlice";
import { add_to_wishlist } from "src/redux/features/wishlist-slice";
import { notifyError } from "@utils/toast";

const ProductDetailsArea = ({ product }) => {
  const {
    _id,
    image,
    relatedImages,
    title,
    quantity,
    originalPrice,
    discount,
    tags,
    sku,
    colors: availableColors = [],
    sizes: availableSizes = [],
  } = product || {};

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [activeImg, setActiveImg] = useState(image);
  useEffect(() => {
    setActiveImg(image);
  }, [image]);

  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const isWishlistAdded = wishlist.some((item) => item._id === _id);

  // handle add product
  const handleAddProduct = (prd) => {
    if (availableColors.length > 0 && !selectedColor) {
      notifyError("Please choose a color before adding to cart.");
      return;
    }
    if (availableSizes.length > 0 && !selectedSize) {
      notifyError("Please choose a size before adding to cart.");
      return;
    }

    const payload = {
      ...prd,
      selectedColor: selectedColor || null,
      selectedSize: selectedSize || null,
    };

    dispatch(add_cart_product(payload));
  };

  // handle add wishlist
  const handleAddWishlist = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <section className="product__details-area pb-115">
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-6">
            <div className="product__details-thumb-tab mr-70">
              <div className="product__details-thumb-content w-img">
                <div>
                  <Image
                    src={activeImg}
                    alt="details img"
                    width={960}
                    height={1125}
                    style={{
                      width: "100%",
                      maxHeight: "575px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
              <div className="product__details-thumb-nav tp-tab">
                <nav>
                  <div className="d-flex justify-content-center flex-wrap">
                    {relatedImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(img)}
                        className={activeImg === img ? "nav-link active" : ""}
                      >
                        <Image src={img} alt="image" width={110} height={110} />
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="product__details-wrapper">
              <div className="product__details-stock">
                <span>{quantity} In Stock</span>
              </div>
              <h3 className="product__details-title">{title}</h3>

              {/* Product Details Price */}
              <ProductDetailsPrice price={originalPrice} discount={discount} />
              {/* Product Details Price */}

              {/* Color & Size selectors (top) */}
              {(availableColors.length > 0 || availableSizes.length > 0) && (
                <div className="mt-15 mb-15">
                  {availableColors.length > 0 && (
                    <div className="product__details-tags product__details-more mb-2">
                      <span>Colors:</span>
                      {availableColors.map((c, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedColor(c)}
                          className={`ms-2 mb-1 px-3 py-1 border rounded-1 text-sm ${
                            selectedColor === c
                              ? "bg-dark text-white"
                              : "bg-gray-100 text-body"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                  {availableSizes.length > 0 && (
                    <div className="product__details-tags product__details-more">
                      <span>Sizes:</span>
                      {availableSizes.map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`ms-2 mb-1 px-3 py-1 border rounded-1 text-sm ${
                            selectedSize === s
                              ? "bg-dark text-white"
                              : "bg-gray-100 text-body"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* quantity */}
              <ProductQuantity />
              {/* quantity */}

              <div className="product__details-action d-flex flex-wrap align-items-center">
                <button
                  onClick={() => handleAddProduct(product)}
                  type="button"
                  className="product-add-cart-btn product-add-cart-btn-3"
                >
                  <CartTwo />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddWishlist(product)}
                  type="button"
                  className={`product-action-btn ${
                    isWishlistAdded ? "active" : ""
                  }`}
                >
                  <HeartTwo />
                  <span className="product-action-tooltip">
                    Add To Wishlist
                  </span>
                </button>
              </div>
              <div className="product__details-sku product__details-more">
                <p>SKU:</p>
                <span>{sku}</span>
              </div>
              {/* ProductDetailsCategories */}
              <ProductDetailsCategories name={product?.category?.name} />
              {/* ProductDetailsCategories */}
              {/* Tags */}
              <ProductDetailsTags tag={tags} />

              <div className="product__details-share">
                <span>Share:</span>
                <SocialShare />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsArea;
