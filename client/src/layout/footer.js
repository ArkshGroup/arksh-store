import Link from "next/link";
import Image from "next/image";
// internal
import logo from "@assets/img/logo/logo1.png";
import payment from "@assets/img/footer/footer-payment.png";
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";

// single widget
function SingleWidget({ col, col_2, col_3, title, contents }) {
  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-${col} col-md-${col_2} col-sm-6`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{title}</h3>
        <div className="footer__widget-content">
          <ul>
            {contents.map((l, i) => (
              <li key={i}>
                <Link href={`/${l.url}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="footer__area footer__style-4"
          data-bg-color="footer-bg-white"
        >
          <div className="footer__top">
            <div className="container">
              <div className="row g-4">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  <div className="footer__widget footer__widget-11 mb-50 footer-col-11-1">
                    <div className="footer__logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" width={145} height={60} />
                      </Link>
                    </div>

                    <div className="footer__widget-content">
                      <div className="footer__info">
                        <p>
                          Arksh Store is your trusted online destination for
                          quality clothes and shoes.
                        </p>
                        <div className="footer__social footer__social-11">
                          <SocialLinks />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SingleWidget
                  col="3"
                  col_2="6"
                  col_3="2"
                  title="Company"
                  contents={[
                    { url: "about", title: "About us" },
                    { url: "blog", title: "Blogs/News" },
                    { url: "shop", title: "Men's" },
                    { url: "shop", title: "Women's" },
                    { url: "#", title: "Careers" },

                  ]}
                />
              
                <SingleWidget
                  col="3"
                  col_2="6"
                  col_3="2"
                  title="Support"
                  contents={[
                    { url: "faq", title: "FAQs" },
                    { url: "reviews", title: "Reviews" },
                    { url: "contact", title: "Contact Us" },
                    { url: "policy", title: "Privacy Policy" },
                    { url: "terms", title: "Terms & Conditions" },
                  ]}
                />

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                  <div className="footer__widget mb-50 footer-col-11-5">
                    <h3 className="footer__widget-title">Talk To Us</h3>

                    <div className="footer__widget-content">
                      <p className="footer__text">
                        Have questions about our clothes or shoes? Reach out to
                        Arksh Store anytime.
                      </p>
                      <div className="footer__contact">
                        <div className="footer__contact-call">
                          <span>
                            <a href="tel:+97714002049">+977-1-4002049</a>
                          </span>
                          <br />
                          <span>
                            <a href="tel:+9779704591211">+977 9704591211</a>
                          </span>
                        </div>
                        <div className="footer__contact-mail">
                          <span>
                            <a href="mailto:info@arkshgroup.com">
                              info@arkshgroup.com
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__bottom-inner">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer__copyright">
                      <CopyrightText />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="footer__payment text-sm-end">
                      <Image src={payment} alt="payment" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

