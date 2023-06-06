"use client";

import Loading from "@/common/loading";
import { getUserById } from "@/services/adminServices";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumber";
import { useParams } from "next/navigation";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

async function ProductDetail() {
  const { id } = useParams();
  const { user, payments } = await getUserById(id);

  if (!user) return <Loading />;

  return (
    <section className="bg-white rounded-2xl p-4 max-w-md">
      <h1 className="font-bold text-lg mb-3">اطلاعات کاربر</h1>
      <div className="flex flex-col mx-5 mb-4 gap-y-4">
        <span>نام و نام خانوادگی: {user.name}</span>
        <span>ایمیل: {user.email}</span>
        <span>حوضه تخصصی: {user.biography}</span>
        <span>تاریخ پیوستن: {toLocalDateStringShort(user.createdAt)}</span>
        <span className="flex items-center whitespace-nowrap gap-x-2">
          شماره همراه: {toPersianNumbers(user.phoneNumber)}
          {user.isVerifiedPhoneNumber && (
            <IoShieldCheckmarkSharp className="w-6 h-6 text-green-600" />
          )}
        </span>
        <span className="grid grid-cols-2 gap-3">
          {payments &&
            payments.map((payment) =>
              payment.cart.productDetail.map((item, index) => (
                <span key={index} className="col-span-1 badge badge--secondary">
                  {item.title}
                </span>
              ))
            )}
        </span>
      </div>
    </section>
  );
}

export default ProductDetail;
