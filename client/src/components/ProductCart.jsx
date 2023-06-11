"use client";

import AddToCart from "@/common/AddToCart";
import LikeProduct from "@/common/LikeProduct";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";

function ProductCart({ product }) {
  const { title, price, discount, offPrice, likesCount, imageLink, slug } =
    product;
  return (
    <div className="flex flex-col bg-white shadow-sm rounded-xl h-full p-2 transition-all duration-200 ease-in-out hover:shadow-lg">
      <div className="flex justify-center">
        <div className="-mt-10 mb-8 rounded-xl shadow-xl bg-slate-300 mx-8 w-64 h-36">
          <Link href={`/products/${slug}`}>
            <Image
              src={imageLink}
              width={256}
              height={160}
              alt={title}
              className="w-full h-full rounded-xl object-cover aspect-auto"
            />
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Link href={`/products/${slug}`}>
          <h2 className="font-bold text-xl text-secondary-800 mb-4">{title}</h2>
        </Link>
        <div className="flex items-center justify-center bg-slate-100 m-2 pt-1 px-1 w-11 rounded-xl">
          <LikeProduct productId={product._id} isLiked={product.isLiked} />
          <span
            className={`${
              likesCount == 0 && "hidden"
            } text-rose-400 text-lg pb-1`}
          >
            {likesCount}
          </span>
        </div>
      </div>
      <Link
        href={`/products/${slug}`}
        className="flex items-center gap-x-2 text-primary-900 font-bold"
      >
        مشاهده محصول
        <HiOutlineArrowLongLeft className="icon" />
      </Link>
      <div className="flex items-center justify-between my-3 border-t-2 pt-3 px-3 md:px-1">
        <AddToCart productId={product._id} />
        <div>
          <div className="flex gap-x-2 text-secondary-800 whitespace-nowrap">
            <span className={`${discount ? "line-through" : "font-bold"}`}>
              {toPersianNumbersWithComma(price)} {!discount && "تومان"}
            </span>
            <span
              className={`${
                !!discount ? "flex" : "hidden"
              } items-center justify-center bg-rose-500 w-10 h-5 rounded-2xl text-white text-sm`}
            >
              {toPersianNumbers(discount)} %
            </span>
          </div>
          {!!discount && (
            <div className="flex items-center justify-between">
              <p className="text-lg text-secondary-800 font-bold whitespace-nowrap">
                {toPersianNumbersWithComma(offPrice)} تومان
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
