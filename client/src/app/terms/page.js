import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import SectionTop from "@components/terms-policy/section-top-bar";
import Footer from "@layout/footer";
import TermsArea from "@components/terms-policy/terms-area";

export const metadata = {
  title: "Terms & Conditions - Arksh Store",
};

export default function Terms() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Terms and Conditions"
        subtitle="These Terms and Conditions explain the rules for using Arksh Store, placing orders for clothes and shoes, making payments, and using our services. By shopping with us, you agree to follow these terms along with our Privacy Policy."
      />
      <TermsArea />
      <Footer />
    </Wrapper>
  );
}
