import React from "react";
// internal

const PrdDetailsDescription = ({ product }) => {
  const description = product?.description ?? "";
  const isHtml = typeof description === "string" && /<[a-z][\s\S]*>/i.test(description);

  return (
    <div className="product__details-description pt-95">
      <div className="row">
        <div className="col-lg-12">
          <div className="product__details-description-content">
            <h3 className="product-desc-title">{product?.title}</h3>
            {isHtml ? (
              <div
                className="product-description-html prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrdDetailsDescription;
