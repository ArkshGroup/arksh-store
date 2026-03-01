"use client";

import React, { useState } from "react";
import ContactTable from "./contact-table";

const ContactArea = () => {
  const [readFilter, setReadFilter] = useState<"all" | "read" | "unread">("all");

  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="overflow-scroll 2xl:overflow-visible">
        <div className="w-[1500px] xl:w-full">
          <div className="tp-search-box flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-4">
              <span className="text-tiny text-text2">Filter:</span>
              <select
                value={readFilter}
                onChange={(e) => setReadFilter(e.target.value as "all" | "read" | "unread")}
                className="input h-[44px] w-[140px]"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
          <ContactTable readFilter={readFilter} />
        </div>
      </div>
    </div>
  );
};

export default ContactArea;
