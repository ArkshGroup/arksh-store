import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import BlogArea from "../components/blog/blog-area";

const BlogsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Blogs" subtitle="Blog List" />
        <BlogArea />
      </div>
    </Wrapper>
  );
};

export default BlogsPage;
