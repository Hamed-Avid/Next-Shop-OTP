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
      <h1 className="font-bold text-lg text-secondary-800">فهرست سفارشات</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default Payments;
