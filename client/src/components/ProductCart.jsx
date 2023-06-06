"use client";

import AddToCart from "@/app/(user)/products/AddToCart";
import LikeProduct from "@/app/(user)/products/LikeProduct";
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
    <div className="flex flex-col mb-10 bg-white shadow-sm rounded-xl h-full p-2 transition-all duration-200 ease-in-out hover:shadow-lg">
      <Link href={`/products/${slug}`}>
        <div className="static flex justify-center">
          <div className="static -mt-20 mb-8 rounded-xl shadow-xl bg-slate-300 mx-8 w-64 h-40">
            <div className="absolute flex items-center bg-white w-11 rounded-xl">
              <LikeProduct productId={product._id} isLiked={product.isLiked} />
              <span
                className={`${
                  likesCount == 0 && "hidden"
                } text-rose-400 text-lg pb-1`}
              >
                {likesCount}
              </span>
            </div>
            <Image
              src={imageLink}
              width={256}
              height={160}
              alt={title}
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      </Link>
      <Link href={`/products/${slug}`}>
        <h2 className="font-bold text-xl mb-4">{title}</h2>
      </Link>

      <Link
        href={`/products/${slug}`}
        className="flex items-center gap-x-2 text-primary-900 font-bold"
      >
        مشاهده محصول
        <HiOutlineArrowLongLeft className="icon" />
      </Link>
      <div className="flex items-center justify-between my-3 border-t-2 pt-3 px-3 md:px-1">
        <AddToCart product={product} />
        <div>
          <div className="flex gap-x-2 whitespace-nowrap">
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
              <p className="text-lg font-bold whitespace-nowrap">
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
