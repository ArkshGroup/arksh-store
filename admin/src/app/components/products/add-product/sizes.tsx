import React, { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};
const Sizes = ({ sizes, setSizes, default_value }: IPropType) => {
  useEffect(() => {
    if (default_value) {
      setSizes(default_value);
    }
  }, [default_value, setSizes]);
  return (
    <div className="mb-5 tp-product-tags">
      <TagsInput
        value={sizes}
        onChange={setSizes}
        name="sizes"
        placeHolder="e.g. XS, S, M, L, XL or 32, 34, 36"
      />
      <em>Clothes: XS, S, M, L, XL. Shoes: enter numbers like 32, 34, 36. Press enter to add.</em>
    </div>
  );
};

export default Sizes;
