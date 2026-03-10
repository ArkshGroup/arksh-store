import dayjs from "dayjs";
import React from "react";
import { Order } from "@/types/order-amount-type";

type InvoiceLayoutProps = {
  orderData: Order;
  innerRef?: React.Ref<HTMLDivElement>;
};

const InvoiceLayout: React.FC<InvoiceLayoutProps> = ({
  orderData,
  innerRef,
}) => {
  const getUnitPrice = (item: any) => {
    const base = item?.originalPrice ?? item?.price ?? 0;
    if (item?.discount && item.discount > 0) {
      return base - (base * item.discount) / 100;
    }
    return base;
  };

  const total = orderData.cart.reduce(
    (acc, curr) => acc + getUnitPrice(curr) * (curr.orderQuantity ?? 1),
    0,
  );

  const grand_total: number =
    orderData.totalAmount ??
    total - (orderData.discount ?? 0) + (orderData.shippingCost ?? 0);

  const derivedCouponDiscount =
    typeof orderData.subTotal === "number" &&
    typeof orderData.shippingCost === "number"
      ? Number(
          (orderData.subTotal + orderData.shippingCost - grand_total).toFixed(
            2,
          ),
        )
      : Number((orderData.discount ?? 0).toFixed(2));

  return (
    <div
      ref={innerRef}
      className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
    >
      <div className=" mb-7">
        <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between  border-b border-slate-200">
          <h1 className="font-bold font-heading text-xl uppercase">
            Invoice
            <p className="text-base mt-1 text-gray-500">
              Status
              <span className="pl-2 font-medium text-base capitalize">
                <span className="font-heading">
                  <span className="inline-flex px-2 text-base font-medium leading-5 rounded-full">
                    {orderData.status}
                  </span>
                </span>
              </span>
            </p>
          </h1>
          <div className="lg:text-right text-left">
            <div className="flex items-center lg:justify-end gap-2 whitespace-nowrap">
              <h2 className="text-lg font-semibold uppercase">Arksh Store</h2>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <tbody>
              <tr className="border-b border-gray6">
                <td className="py-2 pr-4 font-semibold uppercase text-tiny text-textBody">
                  DATE
                </td>
                <td className="py-2 font-semibold text-tiny text-textBody">
                  {dayjs(orderData.createdAt).format("MMMM D, YYYY")}
                </td>
              </tr>
              <tr className="border-b border-gray6">
                <td className="py-2 pr-4 font-semibold uppercase text-tiny text-textBody">
                  INVOICE NO
                </td>
                <td className="py-2 font-semibold text-tiny text-textBody ">
                  #{orderData.invoice}
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 align-top font-semibold uppercase text-tiny text-textBody">
                  INVOICE TO
                </td>
                <td className="py-2 font-normol text-tiny text-textBody">
                  {orderData?.user?.name},&nbsp; &nbsp;{orderData.contact}
                  ,&nbsp; &nbsp;{orderData.email}
                  <br />
                  {orderData.address},&nbsp; &nbsp;{orderData.city},&nbsp;
                  &nbsp;{orderData.country},&nbsp; &nbsp;{orderData.zipCode}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-12">
        <div className="relative rounded-b-md bg-white">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-base text-left text-gray-500 whitespace-no-wrap">
              <thead className="bg-white">
                <tr className="border-b border-gray6 text-tiny">
                  <td className="pl-3 py-3 text-tiny text-textBody uppercase font-semibold">
                    SR.
                  </td>
                  <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold">
                    Product Title
                  </td>
                  <td className="pr-8 py-3 text-tiny text-textBody uppercase font-semibold text-center">
                    QUANTITY
                  </td>
                  <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-center">
                    ITEM PRICE
                  </td>
                  <td className="pr-3 py-3 text-tiny text-textBody uppercase font-semibold text-right">
                    AMOUNT
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y text-base ">
                {orderData.cart.map((item: any, i: number) => (
                  <tr key={item._id} className="">
                    <td className="bg-white border-b border-gray6 px-3 py-3 text-start">
                      {i + 1}
                    </td>
                    <td className="bg-white border-b border-gray6 px-3 pl-0 py-3 text-start">
                      {item.title}
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.selectedColor && (
                            <span>Color: {item.selectedColor}</span>
                          )}
                          {item.selectedColor && item.selectedSize && (
                            <span> | </span>
                          )}
                          {item.selectedSize && (
                            <span>Size: {item.selectedSize}</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                      {item.orderQuantity}
                    </td>
                    <td className="bg-white border-b border-gray6 px-3 py-3 font-bold text-center">
                      {item.discount && item.discount > 0 ? (
                        <div className="space-y-1">
                          <div className="text-xs line-through text-gray-400">
                            Rs. {(item.originalPrice ?? item.price).toFixed(2)}
                          </div>
                          <div>
                            Rs. {getUnitPrice(item).toFixed(2)}{" "}
                            <span className="text-xs text-green-600">
                              (-{item.discount}%)
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span>
                          Rs. {(item.originalPrice ?? item.price).toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="bg-white border-b border-gray6 px-3 py-3 text-right font-bold">
                      Rs. {(getUnitPrice(item) * item.orderQuantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 rounded-xl p-8 py-6 mt-4">
        <table className="w-full text-sm text-left text-gray-600">
          <tbody>
            <tr className="border-b border-gray6">
              <td className="py-2 pr-4 font-bold uppercase  text-tiny text-textBody">
                PAYMENT METHOD
              </td>
              <td className="py-2 text-right">{orderData.paymentMethod}</td>
            </tr>
            <tr className="border-b border-gray6">
              <td className="py-2 pr-4 font-semibold uppercase  text-tiny text-textBody">
                SHIPPING COST
              </td>
              <td className="py-2 text-right font-semibold text-tiny text-textBody">
                Rs. {orderData.shippingCost}
              </td>
            </tr>
            <tr className="border-b border-gray6">
              <td className="py-2 pr-4 font-semibold uppercase  text-tiny text-textBody">
                COUPON DISCOUNT
              </td>
              <td className="py-2 text-right font-semibold text-tiny text-textBody">
                Rs. {derivedCouponDiscount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold uppercase  text-tiny text-textBody">
                TOTAL AMOUNT
              </td>
              <td className="py-2 text-right font-semibold text-tiny text-textBody">
                Rs. {grand_total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceLayout;
