"use client";

import Loading from "@/common/loading";
import { useGetCategories, useRemoveCategory } from "@/hooks/useCategories";
import Link from "next/link";
import CategoriesTable from "./Categoriestable";
import { HiPlusCircle } from "react-icons/hi";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function Categories() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};
  const { mutateAsync } = useRemoveCategory();
  const queryClient = useQueryClient();

  const removeHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>
        <Link
          href="/admin/categories/add"
          className="flex items-center gap-x-2 text-primary-900 font-bold"
        >
          <HiPlusCircle className="w-6 h-6" />
          <span>اضافه کردن دسته بندی</span>
        </Link>
      </div>
      <CategoriesTable categories={categories} removeHandler={removeHandler} />
    </div>
  );
}

export default Categories;
