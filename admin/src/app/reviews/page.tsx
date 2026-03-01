import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import ReviewTable from "../components/review/review-table";

const ReviewsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Reviews" subtitle="Customer reviews" />
        <ReviewTable />
      </div>
    </Wrapper>
  );
};

export default ReviewsPage;
