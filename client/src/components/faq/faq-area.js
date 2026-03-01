
import { DotsTwo, General, Support } from "@svg/index";
import SingleFaq from "./single-faq";

// single nav
function NavItem({ active, id, title, icon }) {
  return (
    <button
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#${id}`}
      type="button"
      role="tab"
      aria-controls={`nav-${id}`}
      aria-selected={active ? "true" : "false"}
      tabIndex="-1"
    >
      <span>{icon}</span>
      {title}
    </button>
  );
}

// TabItem
export function TabItem({ active, id, accordion_items }) {
  return (
    <div
      className={`tab-pane fade ${active ? "show active" : ""}`}
      id={`${id}`}
      role="tabpanel"
      aria-labelledby={`nav-${id}-tab`}
    >
      {/* <!-- faq item one of community question --> */}
      {accordion_items.map((item, i) => (
        <div key={i} className="faq__item pb-95">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-4">
              <div className="faq__content">
                <h3 className="faq__title-2">{item.title}</h3>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8">
              <div className="faq__wrapper faq__style-4 tp-accordion">
                <div className="accordion" id={`${id}-${i + 1}_accordion`}>
                  {item.accordions.map((item) => (
                    <SingleFaq key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


const FaqArea = ({ element_faq = false }) => {
  // tab item
  return (
    <>
     

      {/* faq area start */}
      <section className="faq__area pt-100 pb-25">
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="faq__tab-2 tp-tab mb-50">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <NavItem
                      active={true}
                      id="general"
                      icon={<General />}
                      title="General Questions"
                    />
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavItem
                      id="community"
                      icon={<DotsTwo />}
                      title="Community"
                    />
                  </li>
                  <li className="nav-item" role="presentation">
                    <NavItem id="support" icon={<Support />} title="Support" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="faq__item-wrapper">
            <div className="tab-content" id="faqTabContent">
              {/* general */}
              <TabItem
                active={true}
                id="general"
                accordion_items={[
                  {
                    title: (
                      <>
                        Orders <br />& Shipping
                      </>
                    ),
                    accordions: [
                      {
                        id: "One",
                        title: "When will my order arrive?",
                        show: true,
                        desc: "For in-stock clothes and shoes, orders within Nepal usually arrive in 2–5 business days after dispatch. You’ll receive a tracking link by email and SMS as soon as your package is shipped.",
                        parent: "general-1_accordion",
                      },
                      {
                        id: "Two",
                        title: "Do you offer home delivery across Nepal?",
                        desc: "Yes, Arksh Store delivers to most major cities and towns in Nepal. Shipping availability and charges are shown at checkout after you enter your delivery address.",
                        parent: "general-1_accordion",
                      },
                      {
                        id: "Three",
                        title: "How do I track my order?",
                        desc: "Once your order is shipped, we’ll send you a tracking number via email and SMS. You can click the link or log in to your Arksh Store account to see real-time status updates.",
                        parent: "general-1_accordion",
                      },
                      {
                        id: "four",
                        title: "Can I change my delivery address after ordering?",
                        desc: "If your order has not been shipped yet, contact our support team as soon as possible and we’ll try to update your address. Once the order is dispatched, we may not be able to change the address.",
                        parent: "general-1_accordion",
                      },
                    ],
                  },
                  {
                    title: (
                      <>
                        Returns <br />& Exchanges
                      </>
                    ),
                    accordions: [
                      {
                        id: "five",
                        title: "What is your return policy for clothes and shoes?",
                        show: true,
                        desc: "You can request a return or size exchange within 7 days of delivery as long as the item is unused, unwashed, and has all original tags and packaging. Some clearance items may be final sale and not eligible.",
                        parent: "general-2_accordion",
                      },
                      {
                        id: "six",
                        title: "How do I request an exchange for a different size?",
                        desc: "Log in to your Arksh Store account, go to My Orders, select the item, and choose Request Exchange. Pick your new size and follow the steps. Our team will arrange pickup or guide you on how to send it back.",
                        parent: "general-2_accordion",
                      },
                      {
                        id: "seven",
                        title: "When will I receive my refund?",
                        desc: "After we receive and inspect your returned item, refunds are usually processed within 3–7 business days. The amount will be credited back to your original payment method or as store credit, depending on your choice.",
                        parent: "general-2_accordion",
                      },
                    ],
                  },
                  {
                    title: "Payments & Discounts",
                    accordions: [
                      {
                        id: "eight",
                        title: "Which payment methods do you accept?",
                        show: true,
                        desc: "We accept major cards, digital wallets, and cash on delivery in selected locations. Available options for your area are shown at checkout.",
                        parent: "general-3_accordion",
                      },
                      {
                        id: "nine",
                        title: "How do I apply a coupon or discount code?",
                        desc: "You can enter your coupon code on the checkout page before completing payment. If the code is valid, the discount will be applied automatically to your order total.",
                        parent: "general-3_accordion",
                      },
                      {
                        id: "ten",
                        title: "Why is my discount code not working?",
                        desc: "Please check the expiry date, minimum order amount, and eligible categories. Some codes are only valid for specific products or limited-time campaigns on Arksh Store.",
                        parent: "general-3_accordion",
                      },
                    ],
                  },
                ]}
              />

              {/* community */}
              <TabItem
                id="community"
                accordion_items={[
                  {
                    title: (
                      <>
                        Sizing <br />& Products
                      </>
                    ),
                    accordions: [
                      {
                        id: "eleven",
                        title: "How do I choose the right size?",
                        show: true,
                        desc: "Each product page includes a size chart with measurements in detail. We recommend comparing the chart with your own measurements or a similar item you already own before placing an order.",
                        parent: "community-1_accordion",
                      },
                      {
                        id: "twelve",
                        title: "Are the product photos exactly like the real item?",
                        desc: "We try our best to show accurate colors and details, but slight variations may occur due to lighting and screen settings. Read the product description for fabric details and fit information.",
                        parent: "community-1_accordion",
                      },
                      {
                        id: "thirteen",
                        title: "Are your clothes and shoes original?",
                        desc: "Arksh Store works only with trusted suppliers and brands. Every product goes through a quality check before shipping so you receive authentic and reliable items.",
                        parent: "community-1_accordion",
                      },
                      {
                        id: "fourteen",
                        title: "What if the item I want is out of stock?",
                        desc: "If a size or color is sold out, you can click the Notify Me button (where available) or check back later. Some popular styles are restocked based on demand.",
                        parent: "community-1_accordion",
                      },
                    ],
                  },
                ]}
              />

              {/* support */}
              <TabItem
                id="support"
                accordion_items={[
                  {
                    title: "Support & Account",
                    accordions: [
                      {
                        id: "fifteen",
                        title: "How can I contact Arksh Store support?",
                        show: true,
                        desc: "You can reach us via the contact form on our website or email us anytime at info@arkshgroup.com. Our support team will usually respond within 24 hours on business days.",
                        parent: "support-1_accordion",
                      },
                      {
                        id: "sixteen",
                        title: "Do I need an account to place an order?",
                        desc: "You can browse and add products to your cart without an account, but creating an Arksh Store account makes it easier to track orders, save addresses, and view your order history.",
                        parent: "support-1_accordion",
                      },
                      {
                        id: "seventeen",
                        title: "I forgot my password. What should I do?",
                        desc: "Click on “Forgot password” on the login page, enter your registered email, and follow the instructions sent to reset your password securely.",
                        parent: "support-1_accordion",
                      },
                      {
                        id: "eighteen",
                        title: "How do I stay updated on new arrivals and offers?",
                        desc: "Subscribe to our newsletter and follow Arksh Store on social media to get updates on new collections, seasonal sales, and exclusive discounts.",
                        parent: "support-1_accordion",
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      {/* faq area end */}
    </>
  );
};

export default FaqArea;
