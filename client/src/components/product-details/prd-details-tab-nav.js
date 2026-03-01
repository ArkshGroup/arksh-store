"use client";

import React from "react";

const PrdDetailsTabNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav>
      <div className="product__details-tab-nav-inner nav tp-tab-menu d-flex flex-sm-nowrap flex-wrap">
        <button
          className={`nav-link ${activeTab === "desc" ? "active" : ""}`}
          id="nav-desc-tab"
          type="button"
          onClick={() => setActiveTab("desc")}
        >
          Description
        </button>
        <button
          className={`nav-link ${activeTab === "reviews" ? "active" : ""}`}
          id="nav-reviews-tab"
          type="button"
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
    </nav>
  );
};

export default PrdDetailsTabNav;
