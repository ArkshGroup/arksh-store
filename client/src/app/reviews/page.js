import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import ReviewsBreadcrumb from "@components/reviews/reviews-breadcrumb";
import ReviewsArea from "@components/reviews/reviews-area";

export const metadata = {
  title: "Reviews - Arksh Store",
};

export default function ReviewsPage() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <ReviewsBreadcrumb />
      <ReviewsArea />
      <Footer />
    </Wrapper>
  );
}
