import React from "react";

const OrderSingleCartItem = ({ item }) => {
  const {
    title,
    orderQuantity = 0,
    originalPrice,
    discount = 0,
    selectedColor,
    selectedSize,
  } = item || {};

  const unitPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

  const lineTotal = unitPrice * orderQuantity;

  return (
    <tr className="cart_item">
      <td className="product-name">
        {title}{" "}
        <strong className="product-quantity"> × {orderQuantity}</strong>
        {(selectedColor || selectedSize) && (
          <div className="text-tiny text-gray-500 mt-1">
            {selectedColor && <span>Color: {selectedColor}</span>}
            {selectedColor && selectedSize && <span> | </span>}
            {selectedSize && <span>Size: {selectedSize}</span>}
          </div>
        )}
      </td>
      <td className="product-total text-end">
        <span className="amount">Rs. {lineTotal.toFixed(2)}</span>
      </td>
    </tr>
  );
};

export default OrderSingleCartItem;
