import ShopDetailsMainArea from "@components/product-details/product-details-area-main";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const productApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/slug/${slug}`;

  try {
    const res = await fetch(productApiUrl, { cache: "no-store" });
    const product = res.ok ? await res.json() : null;

    const title =
      product?.metaTitle ||
      (product?.title ? `${product.title} - Arksh Store` : "Product Details - Arksh Store");

    const description =
      product?.metaDescription ||
      (product?.description
        ? String(product.description).replace(/<[^>]*>/g, "").slice(0, 160)
        : "View product details on Arksh Store.");

    const pageUrl = `${SITE_URL}/product/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: pageUrl,
      },
      openGraph: {
        title,
        description,
        url: pageUrl,
        type: "website",
        images: product?.image
          ? [
              {
                url: product.image,
                alt: product.title || "Product image",
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: product?.image ? [product.image] : undefined,
      },
    };
  } catch {
    const fallbackUrl = `${SITE_URL}/product/${slug}`;
    return {
      title: "Product Details - Arksh Store",
      description: "View product details on Arksh Store.",
      alternates: {
        canonical: fallbackUrl,
      },
      openGraph: {
        title: "Product Details - Arksh Store",
        description: "View product details on Arksh Store.",
        url: fallbackUrl,
        type: "website",
      },
    };
  }
}

const ProductDetailsBySlugPage = async ({ params }) => {
  const { slug } = await params;
  const productApiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/slug/${slug}`;

  try {
    const res = await fetch(productApiUrl, { cache: "no-store" });
    const product = res.ok ? await res.json() : null;

    const pageUrl = `${SITE_URL}/product/${slug}`;

    const descriptionText =
      product?.metaDescription ||
      (product?.description
        ? String(product.description).replace(/<[^>]*>/g, "").slice(0, 160)
        : undefined);

    const jsonLd = product
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          image: [
            product.image,
            ...(Array.isArray(product.relatedImages) ? product.relatedImages : []),
          ].filter(Boolean),
          description: descriptionText,
          sku: product.sku,
          brand: product.brand?.name
            ? {
                "@type": "Brand",
                name: product.brand.name,
              }
            : undefined,
          offers: {
            "@type": "Offer",
            url: pageUrl,
            priceCurrency: "NPR",
            price:
              typeof product.price === "number"
                ? product.price
                : typeof product.originalPrice === "number"
                ? product.originalPrice
                : undefined,
            availability: "https://schema.org/InStock",
          },
        }
      : null;

    if (!product?._id) {
      return (
        <>
          {jsonLd && (
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}
          <ShopDetailsMainArea id={null} />
        </>
      );
    }

    return (
      <>
        {jsonLd && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        <ShopDetailsMainArea id={product._id} />
      </>
    );
  } catch {
    return <ShopDetailsMainArea id={null} />;
  }
};

export default ProductDetailsBySlugPage;

