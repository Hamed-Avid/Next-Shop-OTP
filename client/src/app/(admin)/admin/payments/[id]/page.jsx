"use client";

import Loading from "@/common/loading";
import { useGetPaymentById } from "@/hooks/usePayments";
import { toLocalDateString, toLocalDateStringShort } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import { useParams } from "next/navigation";

function PaymentDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetPaymentById(id);
  const { payment } = data || {};

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white rounded-2xl p-4 max-w-md">
      <h1 className="font-bold text-lg mb-3">اطلاعات سفارش</h1>
      <div className="flex flex-col mx-5 mb-4 gap-y-4">
        <span>شماره فاکتور: {payment[0].invoiceNumber}</span>
        <span>
          وضعیت:
          {payment[0].status === "COMPLETED" ? (
            <span className="badge badge--success">موفق</span>
          ) : (
            <span className="badge badge--error">ناموفق</span>
          )}
        </span>
        <span className="grid grid-cols-2 gap-3">
          {payment[0].cart.productDetail.map((product, index) => (
            <span key={index} className="col-span-1 badge badge--secondary">
              {product.title}
            </span>
          ))}
        </span>
        <span>تاریخ سفارش: {toLocalDateStringShort(payment[0].createdAt)}</span>
        <span>نام و نام خانوادگی: {payment[0].user.name}</span>
        <span>ایمیل: {payment[0].user.email}</span>
        <span>
          شماره همراه: {toPersianNumbers(payment[0].user.phoneNumber)}
        </span>
        <span>مبلغ: {toPersianNumbersWithComma(payment[0].amount)} تومان</span>
        <span className="break-words">شماره مجوز: {payment[0].authority}</span>
      </div>
    </section>
  );
}

export default PaymentDetail;
