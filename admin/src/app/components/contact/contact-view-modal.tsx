"use client";

import React, { useEffect } from "react";
import { useGetContactQuery, useUpdateContactMutation } from "@/redux/contact/contactApi";
import dayjs from "dayjs";
import { Close } from "@/svg";

type ContactViewModalProps = {
  id: string;
  onClose: () => void;
  onDeleted?: () => void;
};

const ContactViewModal = ({ id, onClose, onDeleted }: ContactViewModalProps) => {
  const { data: contact, isLoading } = useGetContactQuery(id);
  const [updateContact] = useUpdateContactMutation();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleMarkRead = async () => {
    if (!contact?.read) {
      await updateContact({ id, data: { read: true } });
    }
  };

  if (!contact && !isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray6">
          <h3 className="text-lg font-semibold text-heading">Contact message</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close"
          >
            <Close />
          </button>
        </div>
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {isLoading ? (
            <p className="text-text2">Loading…</p>
          ) : contact ? (
            <div className="space-y-3 text-base">
              <p>
                <span className="font-medium text-text2">Name:</span>{" "}
                <span className="text-heading">{contact.name}</span>
              </p>
              <p>
                <span className="font-medium text-text2">Email:</span>{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-theme hover:underline"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <span className="font-medium text-text2">Phone:</span>{" "}
                <a
                  href={`tel:${contact.phone}`}
                  className="text-theme hover:underline"
                >
                  {contact.phone}
                </a>
              </p>
              {contact.company && (
                <p>
                  <span className="font-medium text-text2">Company:</span>{" "}
                  <span className="text-heading">{contact.company}</span>
                </p>
              )}
              <p>
                <span className="font-medium text-text2">Date:</span>{" "}
                <span className="text-heading">
                  {dayjs(contact.createdAt).format("MMM D, YYYY HH:mm")}
                </span>
              </p>
              <div className="pt-2 border-t border-gray6">
                <p className="font-medium text-text2 mb-1">Message:</p>
                <p className="text-heading whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-gray6 bg-gray-50">
          {contact && !contact.read && (
            <button
              type="button"
              onClick={handleMarkRead}
              className="tp-btn py-2"
            >
              Mark as read
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="tp-btn-border py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactViewModal;
