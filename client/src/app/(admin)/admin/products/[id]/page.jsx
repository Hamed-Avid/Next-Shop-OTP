"use client";

import Loading from "@/common/loading";
import { useGetProductById } from "@/hooks/useProducts";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumber";
import { useParams } from "next/navigation";

function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white rounded-2xl p-4 max-w-md">
      <h1 className="font-bold text-lg mb-3">اطلاعات محصول</h1>
      <div className="flex justify-center">
        <div className=" mb-8 rounded-xl shadow-xl bg-slate-300 mx-8 w-96 h-48">
          <img src={product.imageLink} className="w-full h-full rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col mx-5 mb-4 gap-y-4">
        <span>عنوان: {product.title}</span>
        <span>توضیحات: {product.description}</span>
        <span>برند: {product.brand}</span>
        <span>دسته بندی: {product.category.title}</span>
        <span>قیمت: {toPersianNumbersWithComma(product.price)}</span>
        <span>
          قیمت با تخفیف: {toPersianNumbersWithComma(product.offPrice)}
        </span>
        <span>تخفیف: {toPersianNumbers(product.discount)} %</span>
        <span>موجودی: {toPersianNumbers(product.countInStock)}</span>
        <span>تاریخ انتشار: {toLocalDateStringShort(product.createdAt)}</span>
        <span>لایک ها: {toPersianNumbers(product.likes.length)}</span>
        <div className="flex gap-2">
          {product.tags.map((tag, index) => (
            <span key={index} className="badge badge--primary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
