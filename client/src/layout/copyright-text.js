import Link from "next/link";
import React from "react";

const CopyrightText = () => {
  return (
    <p>
      Copyright © {new Date().getFullYear()} by{" "}
      <Link href="/">Arksh Store</Link> All rights reserved.
    </p>
  );
};

export default CopyrightText;
