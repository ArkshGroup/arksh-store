import Link from 'next/link';
// internal
import banner from '@assets/img/banner/banner2.png';
import { RightArrow } from '@svg/index';

const ShopBanner = () => {
  return (
    <section className="banner__area">
      <div className="container">
        <div className="banner__inner include-bg" style={{backgroundImage:`url(${banner.src})`}}>
          <div className="row">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="banner__content">
                <span>Premium Clothes</span>
                <h3 className="banner__title">
                  <Link href="/shop">Fashion That Feels Good</Link>
                </h3>
                <p>Walk With Confidence</p>

                <div className="banner__btn">
                  <Link href="/shop" className="tp-btn">
                    Buy Now
                    <RightArrow/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;