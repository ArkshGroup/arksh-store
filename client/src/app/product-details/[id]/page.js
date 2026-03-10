
import { permanentRedirect } from "next/navigation";

export async function GET() {
  permanentRedirect("/");
}

const ProductDetailsPage = async ({ params }) => {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`,
      { cache: "no-store" }
    );
    const product = res.ok ? await res.json() : null;
    const slugOrId = product?.slug || id;

    permanentRedirect(`/product/${slugOrId}`);
  } catch {
    permanentRedirect(`/product/${id}`);
  }
};

export default ProductDetailsPage;
