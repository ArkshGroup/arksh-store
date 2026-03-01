import React from "react";

const ProductDetailsPrice = ({ price, discount }) => {
  return (
    <div className="product__details-price">
      {discount > 0 ? (
        <>
          <span className="product__details-ammount old-ammount">Rs. {price}</span>
          <span className="product__details-ammount new-ammount">
            Rs.{" "}
            {(Number(price) - (Number(price) * Number(discount)) / 100).toFixed(
              2
            )}
          </span>
          <span className="product__details-offer">-{discount}%</span>
        </>
      ) : (
        <>
          <span className="product__details-ammount new-ammount">Rs. {price}</span>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPrice;
