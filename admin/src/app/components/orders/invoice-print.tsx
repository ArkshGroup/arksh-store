import { Order } from "@/types/order-amount-type";
import InvoiceLayout from "./invoice-layout";

type IPropType = {
  orderData: Order;
};

const InvoicePrint = ({ orderData }: IPropType) => {
  return <InvoiceLayout orderData={orderData} />;
};

export default InvoicePrint;
