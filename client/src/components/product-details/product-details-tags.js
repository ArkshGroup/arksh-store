import React from 'react';

const ProductDetailsTags = ({ tag, colors, sizes }) => {
  return (
    <>
      {colors?.length > 0 && (
        <div className="product__details-tags product__details-more">
          <span>Colors:</span>
          {colors.map((c, i) => (
            <a key={i} href="#">
              {c}
            </a>
          ))}
        </div>
      )}
      {sizes?.length > 0 && (
        <div className="product__details-tags product__details-more">
          <span>Sizes:</span>
          {sizes.map((s, i) => (
            <a key={i} href="#">
              {s}
            </a>
          ))}
        </div>
      )}
      {tag?.length > 0 && (
        <div className="product__details-tags product__details-more">
          <span>Tags:</span>
          {tag.map((t, i) => (
            <a key={i} href="#">
              {t}
            </a>
          ))}
        </div>
      )}
    
    </>
  );
};

export default ProductDetailsTags;