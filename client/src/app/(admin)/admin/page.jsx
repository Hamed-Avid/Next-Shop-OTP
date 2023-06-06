"use client";

import { useGetAllUsers } from "@/hooks/useAuth";
import UsersTable from "./users/UsersTable";
import Loading from "@/common/loading";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import { useGetAllPayments } from "@/hooks/usePayments";
import PaymentTable from "./payments/paymentTable";

function AdminPage() {
  const { isLoading: isLoadingPayments, data: paymentData } =
    useGetAllPayments();
  const { payments } = paymentData || {};
  const { isLoading: isLoadingUsers, data: usersData } = useGetAllUsers();
  const { users } = usersData || {};

  return (
    <main>
      <section className="mt-4">
        {isLoadingPayments ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">آخرین سفارش ها</h1>
              <Link
                className="text-primary-900 flex gap-x-2"
                href="/admin/payments"
              >
                مشاهده همه سفارشات
                <HiOutlineArrowLongLeft className="icon" />
              </Link>
            </div>
            <PaymentTable
              payments={payments
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
          </>
        )}
      </section>
      <section className="mt-4">
        {isLoadingUsers ? (
          <Loading />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="font-bold text-xl">تازه ترین کاربرها</h1>
              <Link
                className="text-primary-900 flex gap-x-2"
                href="/admin/users"
              >
                مشاهده همه کاربرها
                <HiOutlineArrowLongLeft className="icon" />
              </Link>
            </div>
            <UsersTable
              users={users
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
          </>
        )}
      </section>
    </main>
  );
}

export default AdminPage;
