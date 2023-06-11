"use client";

import { useAddToCart, useDecrementFromCart } from "@/hooks/useCart";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ product }) {
  const queryClient = useQueryClient();
  const { mutateAsync: incrementToCartAsync } = useAddToCart();
  const { mutateAsync: decrementFromCartAsync } = useDecrementFromCart();
  const { _id: id, title, discount, price, offPrice, quantity } = product;

  const incrementHandler = async () => {
    try {
      const { message } = await incrementToCartAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const removeHandler = async () => {
    try {
      while (quantity > 0) {
        await decrementFromCartAsync(id);
      }
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(`${title} حذف شد`);
    }
  };

  const decrementHandler = async () => {
    try {
      const { message } = await decrementFromCartAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border rounded-xl text-secondary-800 bg-white p-4 flex justify-between">
      <h1 className="flex-1 font-bold">{title}</h1>
      <div className="flex items-center justify-between gap-x-8 flex-1">
        <div>
          <div>
            قیمت :
            <span
              className={`${
                discount ? "line-through text-gray-500" : "font-bold"
              }`}
            >
              {toPersianNumbersWithComma(price)}
            </span>
          </div>
          {!!discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold">{toPersianNumbersWithComma(offPrice)}</p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {discount} %
              </div>
            </div>
          )}
        </div>
        <span className="border-r-2 pr-8">
          تعداد : {toPersianNumbers(quantity)}
        </span>
        <div className="flex gap-x-3">
          <button
            onClick={incrementHandler}
            className="bg-primary-900 text-white rounded p-1"
          >
            <HiPlus className="w-4 h-4" />
          </button>
          <button onClick={removeHandler}>
            <HiOutlineTrash className="text-rose-500 w-6 h-6" />
          </button>
          <button onClick={decrementHandler} className="border rounded p-1">
            <HiMinus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
