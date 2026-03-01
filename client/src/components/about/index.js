// internal
import TextArea from "./text-area";
import Services from "./services";
import AboutGallery from "./about-gallery";
import AboutFaqs from "./about-faqs";
import Brands from "@components/brands";
import Awards from "@components/awards";
import BreadcrumbTwo from "@components/common/breadcrumb/breadcrumb-2";

const About = () => {
  return (
    <>
      <BreadcrumbTwo
        subtitle="About Arksh Store"
        title={
          <>
            Welcome to our <br /> Arksh Store
          </>
        }
      />
      <TextArea />
      <Services />
      <AboutGallery />
      <Awards />
      <AboutFaqs />
    
      <Brands />
    </>
  );
};

export default About;
