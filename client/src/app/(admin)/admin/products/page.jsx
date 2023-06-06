"use client";

import { useGetAllProducts, useRemoveProduct } from "@/hooks/useProducts";
import ProductsTable from "./ProductsTable";
import Link from "next/link";
import Loading from "@/common/loading";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { HiPlusCircle } from "react-icons/hi";

function Products() {
  const { isLoading, data } = useGetAllProducts();
  const { products } = data || {};
  const { mutateAsync } = useRemoveProduct();
  const quaryClient = useQueryClient();

  const removeHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      quaryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold mb-5">محصولات</h1>
        <Link
          href="/admin/products/add"
          className="flex items-center gap-x-2 text-primary-900 font-bold"
        >
          <HiPlusCircle className="w-6 h-6" />
          <span>اضافه کردن محصول</span>
        </Link>
      </div>
      <ProductsTable products={products} removeHandler={removeHandler} />
    </div>
  );
}

export default Products;
