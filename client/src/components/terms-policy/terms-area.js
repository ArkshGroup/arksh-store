import Link from "next/link";

const TermsArea = () => {
  return (
    <section className="policy__area pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="policy__wrapper policy__translate p-relative z-index-1">
              <div className="policy__item mb-35">
                <h4 className="policy__meta">
                  Last updated: February 27, 2026
                </h4>
                <p>
                  These are the Terms and Conditions governing the use of Arksh
                  Store and the agreement that operates between you and our
                  company. These Terms and Conditions set out the rights and
                  obligations of all users regarding browsing our website,
                  creating an account, and purchasing clothes and shoes online.
                  Your access to and use of Arksh Store is conditioned on your
                  acceptance of and compliance with these Terms and Conditions.
                  These Terms and Conditions apply to all visitors, customers,
                  and others who access or use our services.
                </p>
                <p>
                  By using or accessing Arksh Store in any manner, you
                  acknowledge that you accept these Terms and Conditions and our
                  Privacy Policy. If you do not agree with any part of the
                  terms, you should not use our website or place an order. Any
                  terms we use in these Terms and Conditions without defining
                  them have the meanings given to them in our Privacy Policy or
                  on other legal pages of our website.
                </p>
              </div>

              <div className="policy__item policy__item-2 mb-35">
                <h3 className="policy__title">Definitions</h3>
                <p>
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
              </div>

              <div className="policy__list mb-35">
                <h3 className="policy__title">
                  Purposes of these Terms and Conditions:
                </h3>
                <ul>
                  <li>
                    <strong>Affiliate</strong> means an entity that controls, is
                    controlled by or is under common control with a party, where
                    &quot;control&quot; means ownership of 50% or more of the
                    shares, equity interest or other securities entitled to vote
                    for election of directors or other managing authority.
                  </li>
                  <li>
                    <strong>Country</strong> refers to: Nepal.
                  </li>
                  <li>
                    <strong>Company</strong> (referred to as either &quot;the
                    Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                    &quot;Our&quot; in this Agreement) refers to Arksh Store.
                  </li>
                  <li>
                    <strong>Device</strong> means any device that can access the
                    Service such as a computer, a cellphone or a digital tablet.
                  </li>
                  <li>
                    <strong>Service</strong> refers to the Website.
                  </li>
                  <li>
                    <strong>Website</strong> refers to Arksh Store, accessible
                    from{" "}
                    <Link
                      href="/"
                      rel="external nofollow noopener"
                      target="_blank"
                    >
                      Arksh Store
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="policy__contact">
                <h3 className="policy__title policy__title-2">Contact us</h3>
                <p>You may contact us at any time via:</p>

                <ul>
                  <li>
                    Email:{" "}
                    <span>
                      <a href="mailto:info@arkshgroup.com">
                        info@arkshgroup.com
                      </a>
                    </span>
                  </li>
                </ul>

                <div className="policy__address">
                  <p>
                    Arksh Store <br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsArea;
