// internal
import {Payment, Refund, ShippingCar, Support} from "@svg/index";

// SingleFeature
function SingleFeature({ icon, title, subtitle }) {
  return (
    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
      <div className="features__item-13 d-flex align-items-start mb-40">
        <div className="features__icon-13">
          <span>{icon}</span>
        </div>
        <div className="features__content-13">
          <h3 className="features__title-13">{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

const ShopFeature = () => {
  return (
    <>
      <section className="features__area pt-80 pb-20">
        <div className="container">
          <div className="row">
            <SingleFeature
              icon={<ShippingCar />}
              title="Free Shipping"
              subtitle={
                <>
                  Free delivery on orders <br /> over Rs. 999
                </>
              }
            />
            <SingleFeature
              icon={<Refund/>}
              title="Easy Returns"
              subtitle={
                <>
                  30-day hassle-free returns <br /> & exchanges
                </>
              }
            />
            <SingleFeature
              icon={<Support />}
              title="Style Support"
              subtitle={
                <>
                  Help with sizing & styling <br /> 24/7
                </>
              }
            />
            <SingleFeature
              icon={<Payment />}
              title="Secure Payment"
              subtitle={
                <>
                  Cards, UPI & more — <br /> safe checkout
                </>
              }
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopFeature;
