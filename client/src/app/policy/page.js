import Footer from "@layout/footer";
import Header from "@layout/header";
import Wrapper from "@layout/wrapper";
import SectionTop from "@components/terms-policy/section-top-bar";
import PolicyArea from "@components/terms-policy/policy-area";

export const metadata = {
    title: "Policy - Arksh Store",
};

export default function Policy() {
  return (
    <Wrapper>
      <Header style_2={true} />
      <SectionTop
        title="Privacy Policy"
        subtitle={
          <>
            Your privacy is important to us. At Arksh Store, we are committed to
            protecting your personal information and being transparent about how
            we collect, use, and safeguard your data when you shop for clothes
            and shoes with us online.
          </>
        }
      />
      <PolicyArea />
      <Footer />
    </Wrapper>
  );
}
