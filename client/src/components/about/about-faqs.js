'use client';
import React from "react";
// internal
import { Play } from "@svg/index";
import faq_bg from "@assets/img/faq/faq-img.jpg";
import SingleFaq from "@components/faq/single-faq";
import VideoModal from "@components/common/modals/modal-video";
import useModal from "@hooks/use-modal";

const faq_items = [
  {
    id: "about-one",
    title: "What is Arksh Store?",
    show: true,
    desc: "Arksh Store is an online fashion destination where you can shop curated clothes and shoes from the comfort of your home. We focus on quality, comfort, and everyday style for customers across Nepal.",
    parent: "faqaccordion",
  },
  {
    id: "about-two",
    title: "How does ordering and delivery work?",
    desc: "Simply add your favourite items to the cart, proceed to checkout, and choose your delivery address and payment method. Once your order is confirmed, we will prepare and ship it, and you can track the status until it reaches your doorstep.",
    parent: "faqaccordion",
  },
  {
    id: "about-three",
    title: "Can I return or exchange if the size doesn’t fit?",
    desc: "Yes, we offer easy returns and size exchanges on eligible products within a limited time after delivery, as long as items are unused and in original condition. Please check our return and exchange policy page for full details.",
    parent: "faqaccordion",
  },
];

const AboutFaqs = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <React.Fragment>
      <section className="faq__area p-relative">
        <div
          className="faq__video"
          style={{ backgroundImage: `url(${faq_bg.src})` }}
        >
          <div className="faq__video-btn">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setIsVideoOpen(true)}
              className="tp-pulse-border popup-video"
            >
              <Play />
            </a>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="faq__wrapper-2 faq__gradient-border faq__style-2 tp-accordion pl-160">
                <div className="faq__title-wrapper">
                  <span className="faq__title-pre">
                    Questions about shopping with Arksh Store?
                  </span>
                  <h3 className="faq__title">
                    Learn how we make online fashion simple and reliable
                  </h3>
                </div>
                <div className="accordion" id="faqaccordion">
                  {faq_items.map((item) => (
                    <SingleFaq key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"FWrz3bT-YoE"}
      />
      {/* video modal end */}
    </React.Fragment>
  );
};

export default AboutFaqs;
