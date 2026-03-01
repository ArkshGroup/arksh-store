'use client';
import { useState } from "react";
import bg from "@assets/img/cta/13/cta-bg-1.jpg";
import { useSubscribeMutation } from "src/redux/features/newsletterApi";

const ShopCta = () => {
  const [email, setEmail] = useState("");
  const [subscribe, { isLoading, isSuccess, error }] = useSubscribeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    try {
      await subscribe({ email: trimmed }).unwrap();
      setEmail("");
    } catch (err) {
      // error shown below
    }
  };

  return (
    <section
      className="cta__area pt-50 pb-50 p-relative include-bg jarallax"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      <div className="container">
        <div className="cta__inner-13 white-bg">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6">
              <div className="cta__content-13">
                <h3 className="cta__title-13">
                  Subscribe for <br />
                  Latest Trends & Offers
                </h3>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="cta__form-13">
                {isSuccess ? (
                  <p className="text-success mb-0">Thank you for subscribing!</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="cta__input-13">
                      <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                      />
                      <button type="submit" className="tp-btn" disabled={isLoading}>
                        {isLoading ? "Subscribing…" : "Subscribe"}
                      </button>
                    </div>
                    {error && (
                      <p className="text-danger small mt-2 mb-0">
                        {error?.data?.message || "Subscription failed."}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCta;
