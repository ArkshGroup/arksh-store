"use client";

import React, { useState } from "react";
import PrdDetailsDescription from "./prd-details-description";
import PrdDetailsTabNav from "./prd-details-tab-nav";
import ProductDetailsReviews from "./product-details-reviews";

const ProductDetailsTabArea = ({ product }) => {
  const [activeTab, setActiveTab] = useState("desc");

  return (
    <section className="product__details-tab-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="product__details-tab-nav">
              <PrdDetailsTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="product__details-tab-content">
              <div className="tab-content" id="nav-tabContent-info">
                <div
                  className={`tab-pane ${activeTab === "desc" ? "active" : ""}`}
                  id="nav-desc"
                >
                  <PrdDetailsDescription product={product} />
                </div>
                <div
                  className={`tab-pane ${activeTab === "reviews" ? "active" : ""}`}
                  id="nav-reviews"
                >
                  <ProductDetailsReviews productId={product?._id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsTabArea;
