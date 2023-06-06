"use client";

import Loading from "@/common/loading";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./paymentTable";

function Payments() {
  const { data, isLoading } = useGetUser();
  const { payments } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1>فهرست سفارشات</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default Payments;
