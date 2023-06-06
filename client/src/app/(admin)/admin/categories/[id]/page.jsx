"use client";

import Loading from "@/common/loading";
import { useGetCategoryById } from "@/hooks/useCategories";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { useParams } from "next/navigation";
import React from "react";

function CategoryDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};

  if (isLoading) return <Loading />;

  return (
    <section className="bg-white rounded-2xl p-4 max-w-md">
      <h1 className="font-bold text-lg mb-3">اطلاعات دسته بندی</h1>
      <div className="flex flex-col mx-5 mb-4 gap-y-4">
        <span>عنوان: {category.title}</span>
        <span>عنوان لاتین: {category.englishTitle}</span>
        <span>توضیحات: {category.description}</span>
        <span>نوع: {category.type}</span>
        <span>تاریخ انتشار: {toLocalDateStringShort(category.createdAt)}</span>
      </div>
    </section>
  );
}

export default CategoryDetailPage;
