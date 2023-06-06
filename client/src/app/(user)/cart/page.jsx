"use client";

import Loading from "@/common/loading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import CartItem from "./CartItem";
import CartsSummery from "./CartsSummery";

function CartPage() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading) return <Loading />;

  if (!data || !user)
    return (
      <div className="container lg:max-w-lg">
        <p className=" font-bold mb-4">برای مشاهده سبد خرید ابتدا لاگین کنید</p>
        <Link className="text-lg font-bold text-primary-900" href="/auth">
          ?رفتن به صفحه لاگین
        </Link>
      </div>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-lg">
        <p className="font-bold mb-4">سبد خرید شما خالی هست!</p>
        <Link className="text-lg font-bold text-primary-900" href="/products">
          رفتن به صفحه محصولات
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 space-y-5">
        {cart &&
          cart.productDetail.sort().map((item) => (
            <CartItem key={item._id} product={item} />
          ))}
      </div>
      <div className="col-span-1">
        <CartsSummery payDetail={cart.payDetail} />
      </div>
    </div>
  );
}

export default CartPage;
