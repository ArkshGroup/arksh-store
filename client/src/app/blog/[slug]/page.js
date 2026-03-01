import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import BlogDetailsArea from "@components/blog/blog-details-area";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug ? String(slug).replace(/-/g, " ") : "Post"} - Arksh Store`,
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  return (
    <Wrapper>
      <Header style_2={true} />
      <BlogDetailsArea slug={slug} />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
