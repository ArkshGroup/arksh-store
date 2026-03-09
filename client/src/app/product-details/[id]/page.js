
import ShopDetailsMainArea from "@components/product-details/product-details-area-main";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
      { cache: "no-store" }
    );
    const product = res.ok ? await res.json() : null;

    const title =
      product?.metaTitle ||
      (product?.title ? `${product.title} - Arksh Store` : "Product Details - Arksh Store");

    const description =
      product?.metaDescription ||
      (product?.description
        ? String(product.description).replace(/<[^>]*>/g, "").slice(0, 160)
        : "View product details on Arksh Store.");

    return {
      title,
      description,
    };
  } catch {
    return {
      title: "Product Details - Arksh Store",
      description: "View product details on Arksh Store.",
    };
  }
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;
  return <ShopDetailsMainArea id={id} />;
};

export default ProductDetailsPage;
