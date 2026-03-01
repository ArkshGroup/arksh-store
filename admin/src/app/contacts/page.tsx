import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import ContactArea from "../components/contact/contact-area";

const ContactsPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        <Breadcrumb title="Contacts" subtitle="Contact messages" />
        <ContactArea />
      </div>
    </Wrapper>
  );
};

export default ContactsPage;
