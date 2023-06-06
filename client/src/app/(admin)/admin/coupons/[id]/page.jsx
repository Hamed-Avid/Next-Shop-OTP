"use client";
import Loading from "@/common/loading";
import { useGetCouponById } from "@/hooks/useCoupons";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import { useParams } from "next/navigation";
import React from "react";

function CouponDetail() {
  const { id } = useParams();
  const { isLoading, data } = useGetCouponById(id);
  const { coupon } = data || {};

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white rounded-2xl p-4 max-w-md">
      <h1 className="font-bold text-lg mb-3">اطلاعات کد تخفیف</h1>
      <div className="flex flex-col mx-5 mb-4 gap-y-4">
        <span>کد: {coupon.code}</span>
        <span>
          نوع: <span className="badge badge--primary">{coupon.type}</span>
        </span>
        <span>مقدار: {toPersianNumbers(coupon.amount)}</span>
        <span>تعداد کاربرد: {toPersianNumbers(coupon.usageCount)}</span>
        <span>ظرفیت: {toPersianNumbers(coupon.usageLimit)}</span>
        <span>تاریخ انقضا: {toLocalDateStringShort(coupon.expireDate)}</span>
        <span className="grid grid-cols-2 gap-3">
          {coupon.productIds.map((product) => (
            <span
              key={product._id}
              className="col-span-1 badge badge--secondary"
            >
              {product.title}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}

export default CouponDetail;
