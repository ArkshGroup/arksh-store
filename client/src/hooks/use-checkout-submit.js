'use client';
import * as dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
//internal import
import { notifyError, notifySuccess } from "@utils/toast";
import { useGetOfferCouponsQuery } from "src/redux/features/coupon/couponApi";
import Loader from "@components/loader/loader";
import { set_coupon } from "src/redux/features/coupon/couponSlice";
import useCartInfo from "./use-cart-info";
import { set_shipping } from "src/redux/features/order/orderSlice";
import {
  useAddOrderMutation,
  useCreatePaymentIntentMutation,
} from "src/redux/features/order/orderApi";

const useCheckoutSubmit = () => {
  const { data: offerCoupons, isError, isLoading } = useGetOfferCouponsQuery();
  const [addOrder] = useAddOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const { cart_products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shipping_info } = useSelector((state) => state.order);
  const { total, setTotal } = useCartInfo();
  const [couponInfo, setCouponInfo] = useState({});
  const [cartTotal, setCartTotal] = useState("");
  const [minimumAmount, setMinimumAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountProductType, setDiscountProductType] = useState("");
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  
  // simple per-user coupon usage tracking in localStorage (client-side only)
  const getUsedCoupons = () => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("usedCoupons");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const hasUserUsedCoupon = (userId, code) => {
    if (!userId || !code) return false;
    const used = getUsedCoupons();
    return Array.isArray(used[userId]) && used[userId].includes(code);
  };

  const markCouponUsed = (userId, code) => {
    if (typeof window === "undefined" || !userId || !code) return;
    const used = getUsedCoupons();
    const list = Array.isArray(used[userId]) ? used[userId] : [];
    if (!list.includes(code)) {
      used[userId] = [...list, code];
      localStorage.setItem("usedCoupons", JSON.stringify(used));
    }
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const couponRef = useRef("");

  // On first load, do not auto-apply any stored coupon.
  // User must explicitly enter and apply a coupon code on each checkout.

  useEffect(() => {
    if (minimumAmount - discountAmount > total || cart_products.length === 0) {
      setDiscountPercentage(0);
      localStorage.removeItem("couponInfo");
    }
  }, [minimumAmount, total, discountAmount, cart_products]);

  //calculate total and discount value
  useEffect(() => {
    // if no active coupon, no discount
    if (!discountPercentage || discountPercentage <= 0) {
      const subTotal = Number((total + shippingCost).toFixed(2));
      setDiscountAmount(0);
      setCartTotal(subTotal);
      return;
    }

    const result = cart_products?.filter((p) => {
      if (!discountProductType) return true;
      return (
        p.type === discountProductType ||
        p.parent === discountProductType ||
        p?.category?.name === discountProductType
      );
    });

    const discountProductTotal =
      result && result.length > 0
        ? result.reduce(
            (preValue, currentValue) =>
              preValue +
              Number(currentValue.originalPrice || 0) *
                Number(currentValue.orderQuantity || 0),
            0
          )
        : 0;

    const subTotal = Number((total + shippingCost).toFixed(2));
    const discountTotal = Number(
      discountProductTotal * (discountPercentage / 100)
    );
    const totalValue = Number(subTotal - discountTotal);
    setDiscountAmount(discountTotal);
    setCartTotal(totalValue);
  }, [
    total,
    shippingCost,
    discountPercentage,
    cart_products,
    discountProductType,
    discountAmount,
    cartTotal,
  ]);

  // create payment intent
  useEffect(() => {
    if (cartTotal) {
      createPaymentIntent({
        price: parseInt(cartTotal),
      })
        .then((data) => {
          setClientSecret(data.data.clientSecret);
          console.log(data);
        })
        .then((error) => {
          console.log(error);
        });
    }
  }, [createPaymentIntent, cartTotal]);

  // handleCouponCode
  const handleCouponCode = (e) => {
    e.preventDefault();

    if (!couponRef.current?.value) {
      notifyError("Please Input a Coupon Code!");
      return;
    }

    const code = couponRef.current?.value;
    const userId = user?._id;
    if (isLoading) {
      return <Loader loading={isLoading} />;
    }
    if (isError) {
      return notifyError("Something went wrong");
    }
    const result = offerCoupons?.filter(
      (coupon) => coupon.couponCode === couponRef.current?.value
    );

    if (result.length < 1) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(result[0]?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (total < result[0]?.minimumAmount) {
      notifyError(
        `Minimum ${result[0].minimumAmount} Rs. required for Apply this coupon!`
      );
      return;
    } else {
      // check if coupon actually applies to any cart items first
      const appliedProductType = result[0].productType;
      const applicableItems = cart_products?.filter((p) => {
        return (
          p.type === appliedProductType ||
          p.parent === appliedProductType ||
          p?.category?.name === appliedProductType
        );
      });

      if (!applicableItems || applicableItems.length === 0) {
        notifyError(
          `This coupon can be applied only to ${appliedProductType} products.`
        );
        setDiscountPercentage(0);
        setDiscountProductType("");
        setMinimumAmount(0);
        localStorage.removeItem("couponInfo");
        return;
      }

      // now enforce one-time use per user for applicable coupons
      if (userId && hasUserUsedCoupon(userId, code)) {
        notifyError("You have already used this coupon on a previous order.");
        return;
      }

      notifySuccess(
        `Your Coupon ${result[0].title} is Applied on ${result[0].productType}!`
      );
      setMinimumAmount(result[0]?.minimumAmount);
      setDiscountProductType(result[0].productType);
      setDiscountPercentage(result[0].discountPercentage);
      dispatch(set_coupon(result[0]));
      localStorage.setItem("couponInfo", JSON.stringify(result[0]));

      if (userId && code) {
        markCouponUsed(userId, code);
      }
    }
  };

  // handleShippingCost
  const handleShippingCost = (value) => {
    // setTotal(total + value);
    setShippingCost(value);
  };

  //set values
  useEffect(() => {
    setValue("firstName", shipping_info.firstName);
    setValue("lastName", shipping_info.lastName);
    setValue("address", shipping_info.address);
    setValue("city", shipping_info.city);
    setValue("country", shipping_info.country);
    setValue("zipCode", shipping_info.zipCode);
    setValue("email", shipping_info.email);
    setValue("contact", shipping_info.contact);
  }, [user, setValue, shipping_info,router]);

  // submitHandler
  const submitHandler = async (data) => {
    dispatch(set_shipping(data));
    setIsCheckoutSubmit(true);

    let orderInfo = {
      name: `${data.firstName} ${data.lastName}`,
      address: data.address,
      contact: data.contact,
      email: data.email,
      city: data.city,
      country: data.country,
      zipCode: data.zipCode,
      shippingOption: data.shippingOption,
      status: "pending",
      cart: cart_products,
      subTotal: total,
      shippingCost: shippingCost,
      discount: discountAmount,
      couponCode: discountPercentage > 0 ? couponRef.current?.value || null : null,
      totalAmount: cartTotal,
      user:`${user?._id}`
    };
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error?.message);
      setIsCheckoutSubmit(false);
    } else {
      setCardError("");
      const orderData = {
        ...orderInfo,
        cardInfo: paymentMethod,
      };
      handlePaymentWithStripe(orderData);
      setIsCheckoutSubmit(false);
      return;
    }
  };

  // handlePaymentWithStripe
  const handlePaymentWithStripe = async (order) => {
    try {
      const { paymentIntent, error: intentErr } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.name,
              email: user?.email,
            },
          },
        });
      if (intentErr) {
        notifyError(intentErr.message);
      } else {
        // notifySuccess("Your payment processed successfully");
      }

      const orderData = {
        ...order,
        paymentIntent,
      };

      addOrder({
        ...orderData,
      }).then((result) => {
        if (result?.error) {
          notifyError("Failed to place order. Please try again.");
        } else {
          router.push(`/order/${result.data?.order?._id}`);
          notifySuccess("Your Order Confirmed!");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleCouponCode,
    couponRef,
    handleShippingCost,
    discountAmount,
    total,
    shippingCost,
    discountPercentage,
    discountProductType,
    isCheckoutSubmit,
    setTotal,
    register,
    errors,
    cardError,
    submitHandler,
    stripe,
    handleSubmit,
    clientSecret,
    setClientSecret,
    cartTotal,
  };
};

export default useCheckoutSubmit;
