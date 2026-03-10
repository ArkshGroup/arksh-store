"use client";
import { useRef } from "react";
import ErrorMsg from "../common/error-msg";
import { useGetSingleOrderQuery } from "@/redux/order/orderApi";
import { Invoice } from "@/svg";
import { useReactToPrint } from "react-to-print";
import { notifyError } from "@/utils/toast";
import InvoiceLayout from "../orders/invoice-layout";

const OrderDetailsArea = ({ id }: { id: string }) => {
  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery(id);
  const printRef = useRef<HTMLDivElement | null>(null);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  if (!isLoading && !isError && orderData) {
    content = (
      <>
        <div className="container grid px-6 mx-auto">
          <h1 className="my-6 text-lg font-bold text-gray-700 dark:text-gray-300">
            Invoice
          </h1>
          <InvoiceLayout orderData={orderData} innerRef={printRef} />
        </div>
      </>
    );
  }

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Receipt",
  });

  const handlePrintReceipt = () => {
    if (isLoading || isError || !orderData) {
      notifyError("Invoice data is not ready to print yet.");
      return;
    }
    if (!printRef.current) {
      notifyError("Invoice is not ready to print yet.");
      return;
    }
    try {
      handlePrint();
    } catch (err) {
      console.log("order by user id error", err);
      notifyError("Failed to print");
    }
  };

  return (
    <>
      <div className="">{content}</div>
      <div className="container grid px-6 mx-auto">
        <div className="mb-4 mt-3 flex justify-between">
          <button onClick={handlePrintReceipt} className="tp-btn px-5 py-2">
            Print Invoice
            <span className="ml-2">
              <Invoice />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsArea;
