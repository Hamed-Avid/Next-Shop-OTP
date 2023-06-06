"use client";

import Loading from "@/common/loading";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import PaymentTable from "./payments/paymentTable";
import Link from "next/link";
import { RiCalendarCheckLine, RiLineChartLine } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

function ProfilePage() {
  const { data, isLoading } = useGetUser();
  const { user, payments } = data || {};

  const calcTotalProducts = (payments) => {
    let count = 0;
    payments.map((payment) => (count += payment.cart.productDetail.length));
    return count;
  };

  if (isLoading) return <Loading />;
  return (
    <main>
      <div className="bg-white flex items-center justify-center py-3 px-5 rounded-2xl w-fit">
        <span className="font-bold text-xl">
          {user.name} عزیز😍؛
          <span className="font-normal text-base pr-2 pl-6">
            به وبسایت آوید خوش آمدی👋🏻
          </span>
        </span>
      </div>
      <section className="mt-8">
        <h1 className="font-black text-xl lg:text-2xl mb-6">سوابق من</h1>
        <div className="grid grid-cols-6 gap-4 pb-8 border-b-2">
          <div className="col-span-6 md:col-span-2 flex gap-x-2 items-center bg-white p-3 rounded-2xl">
            <div className="text-white bg-gray-400 p-3 rounded-2xl">
              <RiCalendarCheckLine className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span>تاریخ پیوستن</span>
              <span className="font-bold text-lg">
                {toLocalDateStringShort(user.createdAt)}
              </span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 flex gap-x-2 items-center bg-white p-3 rounded-2xl">
            <div className="text-white bg-cyan-400 p-3 rounded-2xl">
              <FaBoxOpen className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span>محصولات</span>
              <span className="font-bold text-lg">
                {calcTotalProducts(payments) || 0}
              </span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 flex gap-x-2 items-center bg-white p-3 rounded-2xl">
            <div className="text-white bg-green-400 p-3 rounded-2xl">
              <RiLineChartLine className="w-8 h-8" />
            </div>
            <div className="flex flex-col">
              <span>سفارش ها</span>
              <span className="font-bold text-lg">
                {toPersianNumbers(payments.length || 0)}
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 mt-8">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">آخرین سفارش ها</h1>
          <Link
            className="text-primary-900 flex gap-x-2"
            href="/profile/payments"
          >
            مشاهده همه سفارشات
            <HiOutlineArrowLongLeft className="icon" />
          </Link>
        </div>
        <PaymentTable payments={payments.slice(0, 3)} />
      </section>
    </main>
  );
}

export default ProfilePage;
