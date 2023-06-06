"use client";

import React from "react";
import PaymentTable from "./paymentTable";
import { useGetAllPayments } from "@/hooks/usePayments";
import Loading from "@/common/loading";

function PaymentsPage() {
  const { isLoading, data } = useGetAllPayments();
  const { payments } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-xl font-bold mb-5">سفارشات</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default PaymentsPage;
