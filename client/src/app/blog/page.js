import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import ShopCta from "@components/cta";
import Footer from "@layout/footer";
import BlogArea from "@components/blog/blog-area";

export const metadata = {
  title: "Blog - Arksh Store",
  description: "Read our latest blog posts and updates.",
};

export default function BlogPage() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <BlogArea />
      <ShopCta />
      <Footer />
    </Wrapper>
  );
}
