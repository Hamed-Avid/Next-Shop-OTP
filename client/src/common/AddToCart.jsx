"use client";

import Loading from "@/common/loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { MdOutlineAddShoppingCart } from "react-icons/md";

function AddToCart({ productId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useGetUser();
  const { user } = data || {};
  const { isLoading, mutateAsync } = useAddToCart();

  const addToCartHandler = async (e) => {
    if (!user) {
      toast.error("ابتدا لاگین کنید");
      router.push("/auth");
      return;
    }
    try {
      const { message } = await mutateAsync(productId);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const isExistInCart = (user, productId) => {
    if (!user) return false;
    return user && user.cart?.products.some((p) => p.productId === productId);
  };

  return (
    <>
      {isExistInCart(user, productId) ? (
        <Link
          href="/cart"
          className="flex items-center text-white font-bold btn btn--primary hover:bg-success/90 bg-success whitespace-nowrap"
        >
          ادامه خرید
        </Link>
      ) : isLoading ? (
        <Loading />
      ) : (
        <button
          onClick={addToCartHandler}
          className="flex items-center text-white font-bold btn btn--primary whitespace-nowrap"
        >
          اضافه کردن
          <MdOutlineAddShoppingCart className="icon" />
        </button>
      )}
    </>
  );
}

export default AddToCart;
