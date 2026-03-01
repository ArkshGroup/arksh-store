import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import NewsletterTable from "@/app/components/newsletter/newsletter-table";

const NewsletterPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Newsletter" subtitle="Subscribers" />
        <NewsletterTable />
      </div>
    </Wrapper>
  );
};

export default NewsletterPage;
